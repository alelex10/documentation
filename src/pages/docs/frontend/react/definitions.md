---
layout: "/layout.astro"
---

# Definiciones de React

## Para que se usan keys en react

En React, las keys son un atributo especial que debes proporcionar cuando creas listas de elementos o componentes. La razón principal por la que React utiliza keys es para ayudarlo a identificar qué elementos de una lista han cambiado, cuáles han sido agregados o cuáles han sido eliminados. Esto es fundamental para la eficiencia del proceso de reconciliación del Virtual DOM.

Las keys son una herramienta esencial para optimizar el rendimiento de React cuando se trabaja con listas. Permiten a React identificar de manera eficiente los cambios en una lista, reutilizar los elementos existentes del DOM y evitar renderizados innecesarios o incorrectos, lo que lleva a una interfaz de usuario más rápida y estable.

## Props

Las `props` (abreviatura de "properties") son un mecanismo fundamental en React para pasar datos y configuraciones de un componente padre a un componente hijo. Son la forma principal de hacer que los componentes sean reutilizables y dinámicos.

Aquí te presento las características importantes de las `props` en React:

1.  **Unidireccionalidad (Flujo de Datos Unidireccional):**

    - Las `props` fluyen **siempre** desde el componente padre hacia el componente hijo. Un componente hijo **no puede modificar directamente las `props` que recibe** de su padre.
    - Si un componente hijo necesita "cambiar" algo que recibió a través de `props`, debe comunicarse de vuelta con su padre (generalmente a través de callbacks pasados como `props`) para que el padre actualice su propio estado, y así la nueva información fluya hacia el hijo nuevamente.

2.  **Solo Lectura (Read-Only):**

    - Las `props` son de solo lectura dentro del componente hijo. Intentar modificar una `prop` directamente dentro de un componente hijo resultará en un error de React (si estás en modo estricto) o, peor aún, en un comportamiento impredecible.
    - Esta inmutabilidad es una piedra angular de la programación declarativa de React y ayuda a razonar sobre el flujo de datos.

3.  **Pasan Cualquier Tipo de Dato:**

    - Puedes pasar prácticamente cualquier tipo de dato a través de `props`:
      - Strings (cadenas de texto)
      - Números
      - Booleanos (verdadero/falso)
      - Arrays (listas)
      - Objetos
      - Funciones (muy comunes para callbacks y manejo de eventos)
      - Incluso otros componentes React.

4.  **Permiten la Reutilización de Componentes:**

    - Al poder pasar diferentes `props` a un mismo componente, puedes reutilizar ese componente en múltiples lugares de tu aplicación con diferentes datos y comportamientos. Por ejemplo, un componente `Boton` puede ser reutilizado con diferentes textos, colores, y manejadores de eventos pasados como `props`.

5.  **`children` Prop Especial:**

    - React tiene una `prop` especial llamada `children` que se usa para pasar contenido entre las etiquetas de apertura y cierre de un componente. Esto permite crear componentes "contenedores" o "envoltorios".

      ```jsx
      function Tarjeta(props) {
        return (
          <div className="tarjeta">
            {props.children}{" "}
            {/* Aquí se renderizará lo que se pase entre <Tarjeta>...</Tarjeta> */}
          </div>
        );
      }

      // Uso:
      <Tarjeta>
        <h2>Título de la tarjeta</h2>
        <p>Contenido de la tarjeta.</p>
      </Tarjeta>;
      ```

6.  **Prop Drilling (Potencial Problema):**

    - Cuando necesitas pasar `props` a través de varios niveles de componentes anidados (padre -> hijo -> nieto -> bisnieto), se conoce como "prop drilling". Esto puede hacer que el código sea más difícil de mantener, ya que los componentes intermedios deben pasar las `props` sin usarlas. Para mitigar esto, React ofrece soluciones como Context API y librerías de gestión de estado (Redux, Zustand, Jotai).

7.  **Prop Types (Validación y Documentación):**

    - Aunque no es obligatorio, es una buena práctica usar `PropTypes` (una librería que viene con React) para definir el tipo de datos esperado para cada `prop` y si son requeridas. Esto ayuda a detectar errores tempranamente durante el desarrollo y sirve como documentación para otros desarrolladores (o para ti mismo en el futuro).

      ```jsx
      import PropTypes from "prop-types";

      function Saludo({ nombre, edad }) {
        return (
          <p>
            Hola {nombre}, tienes {edad} años.
          </p>
        );
      }

      Saludo.propTypes = {
        nombre: PropTypes.string.isRequired, // 'nombre' es un string y es requerido
        edad: PropTypes.number.isRequired, // 'edad' es un número y es requerido
      };
      ```

## ``<Fracment></Fracment>`` de React

- Es para retornar múltiples elementos en un componente React
- ``<Fracment></Fracment>`` Es lo mismo que ``<>`` 