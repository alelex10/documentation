---
layout: "/layout.astro"
---

# Formas de renderizado

## SSR (Server Side Rendering)

El SSR (Server-Side Rendering) o Renderizado del Lado del Servidor es una técnica en programación web donde las páginas HTML son generadas en el servidor antes de ser enviadas al navegador del cliente.

Aquí te explico los puntos clave:

- **Cómo funciona:** En lugar de que el navegador reciba un archivo HTML mínimo con JavaScript que luego construye la página (esto sería CSR - Client-Side Rendering), el servidor procesa la lógica necesaria, accede a los datos y crea el HTML completo de la página. Este HTML completo es el que se envía al navegador.

- **Ventajas:**

  - **Mejor SEO:** Los motores de búsqueda pueden indexar el contenido de la página de manera más efectiva porque el HTML ya está presente cuando rastrean el sitio.
  - **Mejor rendimiento inicial (percepción):** El usuario ve el contenido de la página más rápido, ya que no tiene que esperar a que el JavaScript se descargue, se ejecute y genere el HTML. Esto es especialmente notable en conexiones lentas o dispositivos menos potentes.
  - **Mejor accesibilidad:** Los usuarios que tienen JavaScript deshabilitado o que utilizan lectores de pantalla pueden acceder al contenido de la página desde el principio.

- **Desventajas:**

  - **Mayor carga en el servidor:** El servidor tiene que hacer más trabajo para generar cada página, lo que puede requerir más recursos del servidor.
  - **Menor interactividad inicial:** Aunque el contenido se muestra rápido, la página puede tardar un poco más en volverse completamente interactiva, ya que el JavaScript del lado del cliente todavía necesita descargarse y ejecutarse para "hidratar" la página.
  - **Complejidad de desarrollo:** Puede ser más complejo de configurar y desarrollar en comparación con el CSR puro.

- **Casos de uso comunes:**
  - Sitios web con mucho contenido estático o semi-estático que necesitan ser indexados por buscadores (blogs, sitios de noticias, tiendas online).
  - Aplicaciones que priorizan la velocidad de carga inicial y la experiencia del usuario en dispositivos con recursos limitados.

**En resumen:** El SSR es una estrategia para generar páginas web en el servidor, lo que beneficia principalmente al SEO y a la velocidad de carga inicial percibida por el usuario.

## CSR (Client Side Rendering)

CSR significa **Client-Side Rendering** o Renderizado del Lado del Cliente.

Es la técnica opuesta al SSR (Server-Side Rendering) que acabamos de comentar. Con CSR, la mayor parte de la lógica para generar el contenido HTML de una página recae en el **navegador del usuario (el cliente)**.

Así es como funciona típicamente el CSR:

1.  **Solicitud inicial:** El navegador solicita una página web al servidor.
2.  **Respuesta mínima:** El servidor responde enviando un archivo HTML muy ligero. Este archivo HTML generalmente contiene un contenedor vacío o una estructura mínima, y lo más importante, enlaces a uno o varios archivos JavaScript.
3.  **Descarga y ejecución de JavaScript:** El navegador descarga los archivos JavaScript.
4.  **Generación del contenido:** El JavaScript se ejecuta en el navegador. Este código JavaScript es el que se encarga de:
    *   Obtener los datos necesarios (a menudo haciendo solicitudes adicionales al servidor a través de APIs).
    *   Generar dinámicamente el HTML con esos datos.
    *   Insertar el HTML generado en el DOM (Document Object Model) de la página.
5.  **Página visible y interactiva:** Una vez que el JavaScript ha terminado de ejecutarse y ha construido el HTML, la página se vuelve visible y funcional para el usuario.

**Ventajas del CSR:**

*   **Experiencia de usuario más fluida (una vez cargada):** Una vez que la aplicación ha cargado, la navegación entre páginas puede sentirse muy rápida y fluida, ya que solo se descargan los datos y no se necesita recargar toda la página desde el servidor. Las transiciones y animaciones son más fáciles de implementar.
*   **Menor carga en el servidor:** El servidor solo tiene que servir archivos estáticos (HTML, CSS, JS) y responder a las peticiones de datos (APIs). No tiene que procesar la lógica para generar cada página individualmente.
*   **Desarrollo de aplicaciones complejas (SPAs):** Es la base de las Single Page Applications (SPAs), donde la aplicación se carga una vez y el contenido se actualiza dinámicamente sin recargas de página.

**Desventajas del CSR:**

*   **SEO:** Los motores de búsqueda pueden tener dificultades para indexar el contenido de las páginas, ya que el HTML inicial está vacío o es mínimo. Necesitan ejecutar el JavaScript para ver el contenido real, lo cual no todos los rastreadores hacen de manera eficiente.
*   **Rendimiento inicial (First Contentful Paint):** La página puede tardar más en mostrar contenido útil al usuario. El usuario ve una página en blanco o un spinner mientras el JavaScript se descarga y se ejecuta. Esto puede generar una mala primera impresión, especialmente en conexiones lentas o dispositivos de baja potencia.
*   **Accesibilidad:** Los usuarios con JavaScript deshabilitado o que utilizan lectores de pantalla pueden no ver el contenido si no se implementan medidas adicionales para garantizar la accesibilidad.

**Frameworks populares que utilizan CSR (o lo soportan fuertemente):**

*   React (con Create React App, Next.js en modo CSR)
*   Vue.js (con Vue CLI)
*   Angular

En resumen, el CSR traslada la responsabilidad de generar el contenido de la página web del servidor al navegador del cliente, lo que puede ofrecer una experiencia de usuario fluida una vez cargada, pero a menudo a costa del rendimiento inicial y el SEO.