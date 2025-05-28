import type { menu } from "../types/sideBarTypes";
/* mejorar los nombres de las paginas */
export const sideBarData: menu[] = [
	{
		title: "markdown",
		options: [
			{
				name: "ejemplos",
				link: "/marckdown/MarkDownSection",
			},
			{
				name: "text",
				link: "/ux-ui/text/TextSection",
			},
		],
	},
	{
		title: "rutas",
		options: [
			{
				name: "configuration",
				link: "/routing/configured/Comfiguration",
			},
			{
				name: "About",
				link: "/about",
			},
		],
	},
	{
		title: "ux-ui",
		options: [
			{
				name: "color",
				link: "/ux-ui/color/ColorSection",
			},
			{
				name: "text",
				link: "/ux-ui/text/TextSection",
			},
			{
				name: "view-transition-a",
				link: "/ux-ui/view-transition/section/ViewTransitionA",
			},
			{
				name: "view-transition-b",
				link: "/ux-ui/view-transition/section/ViewTransitionB",
			},
			{
				name: "css",
				link: "/ux-ui/css/css-page",
			},
			{
				name: "ejemplos",
				link: "/ux-ui/css/sections/examples/examples",
			}
		],
	},
	{
		title: "git",
		options: [
			{
				name: "comandos",
				link: "/git/git",
			}
		],
	},
	{
		title: "preguntas",
		options: [
			{
				name: "preguntas",
				link: "/questions/questions",
			}
		],
	},
];
