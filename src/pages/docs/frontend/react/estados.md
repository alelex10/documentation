---
layout: "/layout.astro"
---

# Estados en React

¡Claro que sí! Te explicaré todo lo que necesitas saber sobre los estados en React para principiantes, con ejemplos.

---

## ¿Qué es el Estado en React?

Imagina que cada componente de React es como una pequeña caja con información. El **estado** es precisamente esa información que un componente necesita "recordar" y que puede cambiar con el tiempo. Es como la memoria interna de tu componente.

## ¿Por qué es importante el Estado?

El estado es fundamental en React porque:

1.  **Provoca actualizaciones en la interfaz de usuario (UI):** Cuando el estado de un componente cambia, React sabe que debe volver a renderizar (actualizar) ese componente y sus hijos para mostrar la información más reciente.
    - Tener en cuenta que el re renderizado de un componente afecta a todos sus descendientes.

## ¿Dónde vive el Estado?

Históricamente, el estado vivía principalmente en los **componentes de clase**. Sin embargo, con la llegada de los **Hooks de React**, el estado ahora se puede gestionar de forma muy sencilla en los **componentes funcionales**, que son la forma moderna y recomendada de escribir componentes en React. - se declaran obligatoriamente **dentro de la propia función del componente.**

---

**El Hook `useState`**

`useState` es un Hook incorporado en React que te permite añadir estado a tus componentes funcionales. Es como darle a tu componente funcional la capacidad de tener "memoria".

**¿Cómo funciona `useState`?**

`useState` es una función que llamas dentro de tu componente funcional. Recibe un argumento: el **valor inicial del estado**.

`useState` te devuelve un **array** con dos elementos:

1.  **El valor actual del estado:** Esta es la información que tu componente "recuerda".
2.  **Una función para actualizar ese valor:** Esta función te permite cambiar el valor del estado. **Cuando la llamas, React vuelve a renderizar tu componente con el nuevo valor**.

---

## Reglas Importantes del Estado y `useState`

- **Solo llamar Hooks en el nivel superior:** No puedes llamar a `useState` (ni a otros Hooks) dentro de bucles, condiciones (`if`) o funciones anidadas. Deben estar siempre en el nivel superior de tu componente funcional.
- **Solo llamar Hooks desde componentes de React o Hooks personalizados:** No los llames desde funciones JavaScript normales.
- **El nombre de la función de actualización empieza por `set`:** Por convención, la función para actualizar un estado se llama `set` seguido del nombre de la variable de estado (ej. `setNombre`, `setEdad`, `setListaDeTareas`).
- **Las actualizaciones de estado son asíncronas:** React puede agrupar varias actualizaciones de estado para mejorar el rendimiento. Esto significa que el valor del estado puede no actualizarse _inmediatamente_ después de llamar a `setEstado`. Si necesitas realizar acciones basadas en el estado _anterior_, es mejor usar la forma de función para actualizar el estado (ver ejemplo más adelante).

---

**Actualizaciones de Estado Basadas en el Estado Anterior**

A veces, necesitas actualizar un estado basándote en su valor _anterior_. Por ejemplo, en nuestro contador, si queremos incrementar en más de 1, o si varios clicks se producen muy rápido.

En lugar de pasar directamente el nuevo valor a `setCuenta`, puedes pasarle una **función**. Esta función recibirá el **estado anterior** como argumento y deberá devolver el nuevo estado.

```jsx
import React, { useState } from "react";

function ContadorAvanzado() {
  const [cuenta, setCuenta] = useState(0);

  const incrementarCincoVeces = () => {
    // Aquí, usamos la forma de función para garantizar que cada incremento
    // se basa en el valor más reciente del estado.
    
    for (let i = 0; i < 5; i++) {
      setCuenta((prevCuenta) => prevCuenta + 1); // prevCuenta es el estado anterior
    }

    // También puedes usar la forma de actualización directa:
    // setCuenta(cuenta + 1);
    // Pero si se llama múltiples veces, las actualizaciones se perderán y deberás usar la forma de función.

    // NO USAR: se perderán las actualizaciones
    // setCuenta(cuenta + 1);
    // setCuenta(cuenta + 1);
    // setCuenta(cuenta + 1);

    // SI USAR: se mantienen las actualizaciones
    // setCuenta((prevCuenta) => prevCuenta + 1);
    // setCuenta((prevCuenta) => prevCuenta + 1);
    // setCuenta((prevCuenta) => prevCuenta + 1);
  };

  return (
    <div>
      <h1>Contador Avanzado</h1>
      <p>El valor actual es: {cuenta}</p>
      <button onClick={incrementarCincoVeces}>Incrementar 5 veces</button>
    </div>
  );
}

export default ContadorAvanzado;
```

En este caso, `prevCuenta => prevCuenta + 1` es la función que se pasa a `setCuenta`. React llamará a esta función varias veces (en este ejemplo, 5 veces), pasándole el valor actualizado del estado en cada llamada. Esto asegura que no pierdas ninguna actualización.

---

**Manejo de Objetos y Arrays en el Estado**

- Al declarar un state array se debe espesificar el tipo de dato que contiene el array
  - `const [state, setState] = useState<T[]>([])`
Cuando tu estado es un objeto o un array, es crucial entender que las funciones de actualización de estado en React _reemplazan_ el estado completo, no lo fusionan.

**Ejemplo con un Objeto:**

```jsx
import React, { useState } from "react";

function UsuarioInfo() {
  const [usuario, setUsuario] = useState({ nombre: "Juan", edad: 30 });

  const actualizarNombre = () => {
    // INCORRECTO: Esto eliminaría la propiedad 'edad'
    // setUsuario({ nombre: 'Pedro' });

    // CORRECTO: Usamos el spread operator (...) para copiar las propiedades
    // existentes y luego sobrescribir las que queremos cambiar.
    setUsuario({ ...usuario, nombre: "Pedro" });
  };

  const incrementarEdad = () => {
    setUsuario((prevState) => ({
      ...prevState, // Copia todo el estado anterior
      edad: prevState.edad + 1, // Actualiza solo la edad
    }));
  };

  return (
    <div>
      <h2>Información del Usuario</h2>
      <p>Nombre: {usuario.nombre}</p>
      <p>Edad: {usuario.edad}</p>
      <button onClick={actualizarNombre}>Cambiar Nombre a Pedro</button>
      <button onClick={incrementarEdad}>Incrementar Edad</button>
    </div>
  );
}

export default UsuarioInfo;
```

**Puntos Clave con Objetos/Arrays:**

- **Siempre crea un _nuevo_ objeto o array:** React compara referencias de objetos. Si modificas el objeto o array existente en lugar de crear uno nuevo, React no se dará cuenta de que ha cambiado y no volverá a renderizar el componente.
- **Usa el spread operator (`...`):** Para objetos, copia todas las propiedades del objeto anterior y luego sobrescribe las que necesites. Para arrays, copia todos los elementos del array anterior y añade/elimina los que necesites.

---

**¿Cuándo usar Estado?**

- Cuando la información **afecta a lo que se muestra** en pantalla y **cambia con el tiempo**.
- Cuando necesitas que tu componente **responda a interacciones del usuario** (clics, escritura, etc.).
- Datos que provienen de una API y que tu componente necesita almacenar y mostrar.

**¿Cuándo NO usar Estado?**

- Para datos que **no cambian** una vez que el componente se renderiza.
- Para **props** que vienen de un componente padre. Las props son información que se pasa de padre a hijo y que el hijo no debe modificar directamente. Si un hijo necesita cambiar algo que originalmente era una prop, generalmente se maneja a través de una función de callback pasada como prop desde el padre.
- Para cálculos derivados de otras partes del estado o props. En lugar de almacenar un valor calculado, puedes calcularlo directamente en el `return` de tu componente.

---
