### [Agregando las View Transitions a una página](https://docs.astro.build/es/guides/view-transitions/#agregando-las-view-transitions-a-una-p%C3%A1gina)

Opta por utilizar view transitions en páginas individuales importando y añadiendo el componente de enrutamiento <ViewTransitions /> dentro del <head> en cada página deseada.
```html
---
import { ClientRouter } from "astro:transitions";
---

<html lang="en">
	<head>
		<title>My Homepage</title>
        <!-- lo coloco en el head para que cargue todo el css nesesario -->
		<ClientRouter />
	</head>
	<body>
		<h1>Welcome to my website!</h1>
	</body>
</html>
```