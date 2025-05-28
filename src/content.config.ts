// src/content/config.ts
import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";


/* Debo definir esta configuracion dentro de src/content/config.ts */
/* O definirlo en src/content.config.ts, no puedo tener un carpta src/content por que si no no me toma las configuraiones de content.config.ts*/

const docsCollection = defineCollection({
	loader: glob({
		/* selecciono todos los archivos .md como mi coleccion */
		pattern: "**/*.(md|mdx)",
		/* Debo tener cuidado con la ruta(no usar,/ , @. ./,etc), si usar src/... */
		base: "src/pages/docs",
	}),

/* 	schema: z.object({
		title: z.string(),
		order: z.number(), // para ordenar el sidebar
	}), */
});

export const collections = {
	docs: docsCollection,
};
