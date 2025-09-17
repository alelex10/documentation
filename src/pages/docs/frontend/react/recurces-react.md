---
layout: "/layout.astro"
---

# Strict Mode

Claro, te explico qué hace `StrictMode` en React y cuándo se activa.

**¿Qué hace `StrictMode` en React?**

`StrictMode` (Modo Estricto) es una herramienta para destacar posibles problemas en una aplicación. Es una herramienta para desarrolladores, no tiene ningún efecto visible en la interfaz de usuario renderizada de la aplicación.

Cuando `StrictMode` está activado, React realiza las siguientes acciones:

1.  **Identifica componentes que podrían usar métodos de ciclo de vida "obsoletos":** Esto ayuda a detectar el uso de APIs que ya no se recomiendan o que serán eliminadas en futuras versiones de React.
2.  **Advierte sobre el uso de APIs "deprecated":** Similar al punto anterior, busca el uso de funciones o patrones que han sido marcados como obsoletos.
3.  **Advierte sobre el uso de "legacy String Refs":** Los "string refs" son una forma antigua de referenciar elementos del DOM que ha sido reemplazada por el uso de `useRef` o callbacks. `StrictMode` te alertará si los estás utilizando.
4.  **Detecta efectos secundarios inesperados:** `StrictMode` activa intencionalmente dos veces los efectos de los componentes (en desarrollo) para ayudarte a identificar problemas como:
    - **Efectos que no se limpian correctamente:** Si un efecto `useEffect` no tiene una función de limpieza adecuada, la doble ejecución puede revelar comportamientos inesperados.
    - **Mutaciones directas del estado:** Si modificas el estado directamente en lugar de usar las funciones de actualización de estado (`setState` o el setter de `useState`), la doble ejecución puede causar inconsistencias.

**¿Cuándo se 'activa' en tu aplicación?**

`StrictMode` se activa _únicamente en el entorno de desarrollo_. No tiene ningún impacto en la aplicación cuando se despliega en producción.

Para activarlo, simplemente envuelves tu componente raíz de la aplicación con `<React.StrictMode>`. Aquí tienes un ejemplo común en una aplicación creada con `create-react-app`:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

En este ejemplo, todo el contenido dentro de `<App />` estará envuelto por `StrictMode`. Cuando React renderice tu aplicación, `StrictMode` ejecutará las comprobaciones mencionadas anteriormente. Si encuentra algún problema potencial, mostrará advertencias en la consola de tu navegador.

---

# UseEffect

¡Claro que sí! Vamos a desglosar el `useEffect` en React.

**¿Qué hace el `useEffect`?**

El hook `useEffect` en React te permite realizar **efectos secundarios** en componentes funcionales. Los efectos secundarios son operaciones que ocurren fuera del flujo normal de renderizado de React. Piensa en ellos como acciones que tu componente necesita hacer "después" de que React ha actualizado el DOM.

Algunos ejemplos comunes de efectos secundarios son:

- **Fetch de datos:** Obtener información de una API.
- **Manipulación directa del DOM:** Cambiar el título de la página, añadir o remover listeners de eventos del `window` o `document`.
- **Suscripciones:** Suscribirse a eventos de fuentes externas (como WebSockets, o eventos de `window`).
- **Timers:** Usar `setTimeout` o `setInterval`.

**¿Cómo funciona `useEffect`?**

`useEffect` toma dos argumentos:

1.  **Una función (el "efecto"):** Esta función contiene el código que quieres ejecutar como efecto secundario. React ejecutará esta función después de que el componente se haya renderizado.
2.  **Un array de dependencias (opcional):** Este array le dice a React cuándo debe volver a ejecutar el efecto.

    - **Sin array de dependencias:** Si omites el array de dependencias, el efecto se ejecutará después de _cada_ renderizado del componente.
    - **Array de dependencias vacío (`[]`):** Si proporcionas un array vacío, el efecto solo se ejecutará _una vez_, después del primer renderizado del componente. Es similar a `componentDidMount` en componentes de clase.
    - **Array de dependencias con valores:** Si incluyes valores (variables, props, estado) en el array, el efecto se ejecutará después del primer renderizado y cada vez que alguno de esos valores cambie. Es similar a `componentDidUpdate` en componentes de clase, pero solo para las dependencias especificadas.

**Ejemplo básico:**

```jsx
import React, { useState, useEffect } from "react";

function EjemploUseEffect() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    // Este es el efecto: se ejecuta después de cada renderizado
    console.log("El componente se ha renderizado o actualizado.");

    // Si quisiéramos actualizar el título del documento
    document.title = `Contador: ${contador}`;
  }); // Sin array de dependencias, se ejecuta después de cada renderizado

  // Para que solo se ejecute una vez, tendríamos:
  // useEffect(() => {
  //   console.log('Componente montado por primera vez.');
  //   document.title = 'Mi Aplicación';
  // }, []); // Array de dependencias vacío

  // Para que se ejecute cuando 'contador' cambie:
  // useEffect(() => {
  //   console.log(`El contador cambió a ${contador}`);
  // }, [contador]); // Depende de la variable 'contador'

  return (
    <div>
      <p>Has hecho clic {contador} veces</p>
      <button onClick={() => setContador(contador + 1)}>Haz clic aquí</button>
    </div>
  );
}

export default EjemploUseEffect;
```

**¿Es necesario declarar ahí los listeners?**

No es _estrictamente necesario_ declarar todos los listeners dentro de `useEffect`, pero es la **forma recomendada** y la más común, especialmente si son listeners que dependen del ciclo de vida del componente o de sus props/estado.

La razón principal es que los listeners añadidos a elementos globales (como `window` o `document`) o a elementos que pueden ser desmontados/reemplazados (como listeners a un `button` que se renderiza condicionalmente) deben ser **removidos** cuando el componente deja de existir o ya no los necesita. Si no los remueves, podrías tener:

- **Fugas de memoria (memory leaks):** Los listeners siguen activos incluso si el componente que los creó ya no existe, consumiendo recursos innecesariamente.
- **Comportamientos inesperados:** Un listener antiguo podría dispararse y afectar un componente que ya no está en pantalla o que ha sido reemplazado.

Es por esto que el `return` en `useEffect` se vuelve crucial.

**¿Qué hace el `return` en el `useEffect` y qué efecto tiene en el componente?**

El `return` dentro de la función de `useEffect` se utiliza para definir una **función de limpieza (cleanup function)**.

- **Propósito:** La función de limpieza se ejecuta antes de que el componente se desmonte (se elimine del DOM) y también antes de que el efecto se vuelva a ejecutar debido a un cambio en las dependencias.
- **Qué hace:** Su principal función es "deshacer" las acciones que el efecto realizó. Por ejemplo:
  - **Remover listeners de eventos:** Si añadiste un listener a `window.addEventListener`, la función de limpieza usaría `window.removeEventListener`.
  - **Cancelar suscripciones:** Si te suscribiste a un servicio externo, la limpieza cancelaría esa suscripción.
  - **Limpiar timers:** Usar `clearTimeout` o `clearInterval`.

**Ejemplo con función de limpieza:**

```jsx
import React, { useState, useEffect } from "react";

function ScrollTracker() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    // 1. Añadir el listener
    window.addEventListener("scroll", handleScroll);
    console.log("Listener de scroll añadido.");

    // 2. La función de limpieza
    return () => {
      window.removeEventListener("scroll", handleScroll);
      console.log("Listener de scroll removido.");
    };
  }, []); // Se ejecuta una vez al montar y se limpia al desmontar

  return (
    <div style={{ height: "2000px", background: "lightblue" }}>
      <h1>Desplázate para ver la posición</h1>
      <p>Posición del scroll: {scrollPosition}px</p>
    </div>
  );
}

export default ScrollTracker;
```

En este ejemplo:

- El `useEffect` añade un listener al evento `scroll` de `window` cuando el componente `ScrollTracker` se monta.
- La función que retorna se ejecuta **solo cuando el componente `ScrollTracker` se desmonta**. Esto asegura que el listener se elimine, previniendo fugas de memoria.

Si el array de dependencias no estuviera vacío (por ejemplo, si tuvieras una función de callback que cambiara), la función de limpieza se ejecutaría **antes de que el efecto se vuelva a ejecutar** con los nuevos valores. Esto es vital para evitar tener múltiples listeners activos al mismo tiempo.

## efectos secundarios

¡Claro! El término "efectos secundarios" en programación, y específicamente en React, se refiere a cualquier operación o acción que un componente realiza y que **interactúa con el mundo exterior** o que ocurre **fuera del flujo normal de renderizado** del propio componente.

Piensa en el renderizado de un componente como algo que toma datos (props y estado) y devuelve una descripción de la UI (el JSX). Todo lo que no sea ese simple mapeo de entradas a salidas se considera un efecto secundario.

Aquí te desglosamos a qué se refiere y por qué es importante:

**Características de un Efecto Secundario:**

1.  **Interacción Externa:** Manipulan algo fuera del control directo de React.

    - **Ejemplos:**
      - Hacer una petición a una API (`fetch`, `axios`).
      - Modificar directamente el DOM del navegador (ej: `document.title = '...'`, añadir un scroll listener al `window`).
      - Suscribirse a eventos externos (ej: sockets, `window.addEventListener`).
      - Usar `setTimeout` o `setInterval`.
      - Interactuar con el `localStorage` o `sessionStorage`.

2.  **Ocurren _después_ del renderizado:** React renderiza un componente para describir la UI. Los efectos secundarios ocurren _después_ de que React ha actualizado el DOM, basándose en esa descripción. No son parte directa de la construcción del JSX.

3.  **Potencialmente Asíncronos o Lentos:** Muchas operaciones de efectos secundarios, como las peticiones de red, son asíncronas. Si se ejecutaran _durante_ el renderizado, podrían bloquear el hilo principal del navegador, haciendo que la interfaz de usuario se congele.

**¿Por qué son importantes en React y por qué se manejan con `useEffect`?**

React busca que tus componentes sean lo más "puros" posible. Idealmente, un componente debería:

- Recibir props y estado.
- Devolver JSX basado en esas props y estado.

Si realizaras efectos secundarios directamente dentro del cuerpo de un componente funcional (fuera de `useEffect`), podrías encontrarte con varios problemas:

- **Renderizados Múltiples:** Un componente puede renderizarse muchas veces. Si tuvieras, por ejemplo, un `fetch` directamente en el cuerpo del componente, se ejecutaría en cada renderizado, lo que podría llevar a peticiones redundantes, sobrecarga del servidor y posibles errores (si no se maneja la limpieza).
- **Bloqueo del Renderizado:** Si un efecto secundario fuera síncrono y largo (aunque no es común en JavaScript moderno), podría bloquear el proceso de renderizado, haciendo que la aplicación no responda.
- **Dificultad de Limpieza:** Si un efecto secundario crea recursos (como listeners, suscripciones, timers), es crucial saber cuándo y cómo limpiarlos para evitar fugas de memoria o comportamientos inesperados. Si estuvieran directamente en el cuerpo del componente, ¿cuándo se limpiarían? ¿Al desmontarse? ¿Al volver a renderizarse?

**`useEffect` como Solución:**

El hook `useEffect` está diseñado específicamente para manejar estos efectos secundarios de manera segura y predecible:

1.  **Ejecución Controlada:** `useEffect` garantiza que el efecto se ejecute _después_ de que el renderizado haya terminado y el navegador haya pintado la UI.
2.  **Control de Ejecución (Dependencias):** El array de dependencias permite especificar _cuándo_ debe ejecutarse el efecto nuevamente (solo al montar, cada vez que cambian ciertas variables, etc.), evitando ejecuciones innecesarias.
3.  **Limpieza de Recursos:** La función de retorno de `useEffect` (la función de limpieza) proporciona un mecanismo estándar y seguro para deshacer las acciones del efecto antes de que el componente se desmonte o antes de que el efecto se reejecute.

**En resumen:**

Un **efecto secundario** es cualquier operación que interactúa con el "exterior" (red, DOM, timers, etc.) o que **no es una simple transformación de entrada a salida JSX**. `useEffect` es la herramienta de React para encapsular, controlar y gestionar estos efectos secundarios de forma segura, permitiendo que tus componentes se mantengan enfocados en la UI y manejando las interacciones externas de manera ordenada.

---

# Montaje y desmontaje de componentes

¡Excelente pregunta! Manipular el ciclo de vida de un componente para montarlo y desmontarlo de forma controlada y sin dejar "réplicas inconsistentes" es una tarea fundamental en React, especialmente cuando se manejan efectos secundarios o listas dinámicas.

La clave para esto reside en el uso de:

1.  **Estado para controlar la visibilidad:** Utilizar el estado de un componente padre para decidir si un componente hijo debe renderizarse o no.
2.  **`useEffect` con función de limpieza:** Asegurarse de que todos los listeners, suscripciones o timers creados por el componente que se desmonta sean removidos correctamente.
3.  **Claves (`key`) en listas:** Cuando se renderizan listas de componentes, usar claves únicas ayuda a React a identificar qué elementos han cambiado, se han añadido o eliminado, permitiendo un desmontaje y montaje eficiente.

Vamos a ver cómo hacerlo:

### 1. Controlando el Montaje y Desmontaje con Estado

La forma más común de controlar si un componente se monta o desmonta es mediante una variable de estado en su componente padre.

**Ejemplo:**

Supongamos que tenemos un componente `Contador` que queremos poder montar y desmontar.

```jsx
// Componente hijo que queremos montar/desmontar
function Contador() {
  const [cuenta, setCuenta] = useState(0);

  useEffect(() => {
    console.log("Contador MONTADO");
    // Ejemplo de efecto secundario: un timer
    const timerId = setInterval(() => {
      setCuenta((prevCuenta) => prevCuenta + 1);
    }, 1000);

    // ¡Función de limpieza para evitar fugas de memoria!
    return () => {
      console.log("Contador DESMONTADO. Limpiando timer...");
      clearInterval(timerId); // Detenemos el timer
    };
  }, []); // El array vacío asegura que el efecto se ejecuta solo al montar/desmontar

  return (
    <div>
      <h2>Contador: {cuenta}</h2>
    </div>
  );
}

// Componente padre que controla el montaje/desmontaje
function App() {
  const [mostrarContador, setMostrarContador] = useState(false);

  const toggleContador = () => {
    setMostrarContador(!mostrarContador);
  };

  return (
    <div>
      <h1>Control de Ciclo de Vida</h1>
      <button onClick={toggleContador}>
        {mostrarContador ? "Ocultar Contador" : "Mostrar Contador"}
      </button>

      {/* Renderizado condicional */}
      {mostrarContador && <Contador />}
    </div>
  );
}

export default App;
```

**Explicación:**

- **Componente `App` (Padre):**
  - Tiene un estado `mostrarContador` que controla la visibilidad del `Contador`.
  - La función `toggleContador` cambia este estado.
  - La línea `{mostrarContador && <Contador />}` es la clave del **renderizado condicional**. Si `mostrarContador` es `true`, se renderiza `<Contador />`. Si es `false`, `<Contador />` simplemente no se renderiza.
- **Componente `Contador` (Hijo):**
  - Cuando `mostrarContador` pasa de `false` a `true` en el padre, React renderiza `<Contador />`. Esto se considera el **montaje** del componente. El `useEffect` con el `setInterval` se ejecutará.
  - Cuando `mostrarContador` pasa de `true` a `false`, React **desmonta** el `<Contador />`. Antes de que el componente sea completamente removido del DOM, **la función de limpieza retornada por el `useEffect` se ejecuta automáticamente**. En este caso, `clearInterval(timerId)` se encarga de detener el intervalo, evitando que siga ejecutándose en segundo plano y causando problemas.

**¿Por qué esto evita "réplicas inconsistentes"?**

- **Control Total:** El padre decide explícitamente cuándo el hijo debe existir o no.
- **Limpieza Automática:** El `useEffect` con su función de limpieza garantiza que cualquier "rastro" que el componente hijo haya dejado (listeners, timers, suscripciones) sea eliminado al desmontarse. Esto previene que efectos de un componente "antiguo" interfieran con un futuro montaje del mismo componente o con otros componentes.

### 2. Uso de `key` en Listas

Cuando renderizas una lista de componentes, es crucial usar la prop `key`.

**Ejemplo:**

```jsx
function Item({ id, nombre }) {
  useEffect(() => {
    console.log(`Item ${nombre} (ID: ${id}) MONTADO`);
    return () => {
      console.log(`Item ${nombre} (ID: ${id}) DESMONTADO`);
    };
  }, [id, nombre]); // Dependiendo de los datos del item

  return <li>{nombre}</li>;
}

function ListaDeItems({ items }) {
  return (
    <ul>
      {items.map(item => (
        // La prop 'key' es esencial aquí
        <Item key={item.id} id={item.id} nombre={item.nombre} />
      ))}
    </ul>
  );
}

function App() {
  const [lista, setLista] = useState([
    { id: 1, nombre: 'Manzana' },
    { id: 2, nombre: 'Banana' },
  );

  const addItem = () => {
    const newItem = { id: Date.now(), nombre: 'Cereza' }; // Usamos timestamp como ID único
    setLista([...lista, newItem]);
  };

  const removeItem = () => {
    if (lista.length > 0) {
      setLista(lista.slice(0, -1)); // Removemos el último
    }
  };

  return (
    <div>
      <h1>Lista de Items</h1>
      <button onClick={addItem}>Añadir Ítem</button>
      <button onClick={removeItem}>Quitar Último Ítem</button>
      <ListaDeItems items={lista} />
    </div>
  );
}

export default App;
```

**¿Por qué la `key` es importante para el ciclo de vida?**

Cuando la lista `items` cambia, React usa la prop `key` para identificar qué componentes de `Item` corresponden a qué datos.

- **Si añades un nuevo ítem:** React ve que hay una nueva `key` que no existía antes. Renderiza un nuevo `Item` con esa `key`. El `useEffect` de ese nuevo `Item` se ejecutará (su efecto).
- **Si quitas un ítem:** React ve que una `key` que existía antes ya no está presente. **Desmonta** el `Item` asociado a esa `key`. La función de limpieza de su `useEffect` se ejecutará.
- **Si cambian los datos de un ítem (pero la `key` se mantiene):** React puede optar por **reutilizar** el componente existente y actualizar sus props. Si el `useEffect` del `Item` tiene `id` y `nombre` en sus dependencias, la función del efecto se ejecutará de nuevo (y su limpieza previa si ya había una ejecución).
- **Si reordenas ítems:** React usa las `key` para saber qué `Item` se movió a qué posición. Si un `Item` no cambia su `key` pero sí su posición, React sabrá que es el mismo `Item` y solo actualizará su posición en el DOM, sin desmontarlo y volver a montarlo innecesariamente.

**Sin una `key` adecuada:**

Si no usas `key` o usas un índice como `key` (lo cual puede ser problemático si la lista se puede reordenar o filtrar), React no podrá identificar de forma fiable qué componente corresponde a qué dato. Esto puede llevar a que React desmonte y monte componentes de forma incorrecta o menos eficiente, o que se queden listeners o estados colgados de componentes que ya no debería existir.

En resumen, para manipular el ciclo de vida de manera controlada y sin dejar inconsistencias:

1.  Usa **estado** para controlar la presencia de componentes en el DOM.
2.  Implementa siempre una **función de limpieza en `useEffect`** para deshacer cualquier efecto secundario activo cuando el componente se desmonte o antes de que el efecto se reejecute.
3.  Usa **claves (`key`) únicas y estables** al renderizar listas de componentes para que React pueda gestionar eficientemente su montaje, desmontaje y actualización
