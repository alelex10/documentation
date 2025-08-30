---
layout: "/layout.astro"
---

# ORM

- **Repositorys**: Representa la capa de acceso a datos

# Prisma

- ✨ TypeScript-first: Tipado estático, autocompletado e inferencia automática.

- ⚙️ Schema centralizado: El modelo de datos se define en un único archivo .prisma.
- 🔗 Soporte de relaciones entre tablas muy intuitivo.
- **Prisma**: ORM (Object-Relational Mapper) que proporciona una capa de abstracción sobre la base de datos
- **Prisma Client**: Módulo de código generado automágicamente que permite interactuar con la base de datos a través de operaciones tipadas
- 🔄 Migraciones: Control de versiones del esquema de la base de datos.

## 🔧 Bases de Datos Compatibles

Prisma es compatible con las siguientes bases de datos relacionales:

PostgreSQL

MySQL

SQLite

SQL Server

CockroachDB

MongoDB (soporte con funciones limitadas)

## 📦 Instalación y Setup Básico

1️⃣ **Paso 1: Inicializar un proyecto**

- **IMPORTANTE:** Se instala como dependencia de desarrollo.

```bash
pnpm init -y
pnpm add -D prisma
pnpm prisma init
```

✅ **Resultados generados:**

- Archivo: `schema.prisma`
- Directorio: `prisma/`
- Archivo: `.env` (contiene **URL de conexión**).

2️⃣ **Paso 2: Instalar Prisma Client**

```bash
pnpm add @prisma/client
```

# ✅ Características Clave

- ✨ TypeScript-first: Tipado estático, autocompletado e inferencia automática.

- ⚙️ Schema centralizado: El modelo de datos se define en un único archivo .prisma.

- 🔗 Soporte de relaciones entre tablas muy intuitivo.

- 📦 Prisma Client: Cliente auto-generado y altamente tipado.

- 🔄 Migraciones: Control de versiones del esquema de la base de datos.

- 🧪 **Compatibilidad** con pruebas y desarrollo local.

# Estructura de schema.prisma

Aquí se detalla la estructura del archivo `schema.prisma` junto con la explicación de cada componente:


```prisma 
generator client {
    provider = "prisma-client-js"
    // le indico donde quiero que se genere el codigo
    output = "generated/prisma" 
}

datasource db {
    provider = "postgresql"
    url = env("DATABASE_URL")
}

model User {
    id       Int    @id    @default(autoincrement())
    name     String
    email    String @unique
    posts    Post[]
}

model Post {
    id       Int     @id     @default(autoincrement())
    title    String
    content String?
    author   User    @relation(fields: [authorId], references: [id])
    authorId Int
}
```

## Componentes del Schema

- **`generator`**: Define cómo se genera el cliente de Prisma.
  - `provider = "prisma-client-js"`: Especifica que se está utilizando el cliente de JavaScript de Prisma.

- **`datasource`**: Define la base de datos y la URL de conexión.
  - `provider = "postgresql"`: Indica que se está utilizando PostgreSQL como base de datos.
  - `url = env("DATABASE_URL")`: Establece la URL de conexión a la base de datos mediante una variable de entorno.

- **`model`**: Define una tabla y sus campos.
  - `User`: Tabla que almacena información de los usuarios.
  - `Post`: Tabla que almacena información de las publicaciones.

- **`@id`**: Indica que el campo es la clave primaria de la tabla.
- **`@default(autoincrement())`**: Configura el campo para que se autoincrementa automáticamente.
- **`@unique`**: Establece una restricción de unicidad en el campo.
- **`@relation`**: Define relaciones entre tablas.
  - `fields: [authorId]`: Especifica los campos que se utilizan para establecer la relación.
  - `references: [id]`: Indica la clave primaria de la tabla relacionada que se utiliza en la relación

# Migraciones

-crear una migración: `npx prisma migrate dev --name name-migration`