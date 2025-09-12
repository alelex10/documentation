---
layout: "/layout.astro"
---

# Conceptos de ORM

# Schema de la Base de Datos

En Prisma, el schema se define en un archivo llamado ``schema.prisma``. Este archivo describe:

- **Modelos**: Las entidades o tablas de la base de datos.
- **Campos**: Las columnas de cada tabla, junto con sus tipos de datos (por ejemplo, String, Int, DateTime).
- **Relaciones**: Las conexiones entre diferentes modelos (como relaciones de uno a muchos, muchos a muchos, etc.).

# Migraciones

En el contexto de los **ORMs** (Object-Relational Mappers) como **Prisma** o **Sequelize**, una **migración** (migration) es un mecanismo para gestionar y realizar cambios en la estructura de la base de datos de manera ordenada, segura y replicable. Las migraciones permiten modificar el esquema de la base de datos (tablas, columnas, relaciones, etc.) a lo largo del tiempo, manteniendo un historial de los cambios realizados.

---

### **¿Cómo funcionan las migraciones?**

1. **Creación de un historial de cambios**:
   - Cada vez que modificas el **schema** (esquema) de tu base de datos (por ejemplo, añadiendo una columna, modificando un tipo de dato o creando una nueva tabla), creas una **migración**.
   - Esta migración es un archivo que contiene instrucciones para aplicar los cambios en la base de datos.

2. **Aplicación de cambios**:
   - Las migraciones se aplican en un orden específico, generalmente basado en una fecha o un número de versión, para garantizar que los cambios se realicen secuencialmente y sin errores.

3. **Posibilidad de deshacer cambios (rollback)**:
   - Si algo sale mal durante la aplicación de una migración, puedes deshacer los cambios rápidamente, volviendo a un estado anterior de la base de datos.

4. **Trabajo en equipo**:
   - Las migraciones ayudan a sincronizar los cambios en el esquema entre diferentes desarrolladores, evitando conflictos y garantizando que todos tengan la misma estructura de base de datos.

---

### **Ejemplo en Prisma**

En Prisma, las migraciones se gestionan mediante comandos específicos. Por ejemplo:

1. **Crear una migración**:
   - Si modificas el `schema.prisma` (por ejemplo, añadiendo un campo `fechaNacimiento` a un modelo), ejecutas:
     ```
     npx prisma migrate dev --name add-birthdate-field
     ```
   - Prisma generará un archivo de migración con las instrucciones necesarias.

2. **Aplicar migraciones**:
   - Para aplicar las migraciones a la base de datos, ejecutas:
     ```
     npx prisma migrate dev
     ```
   - Prisma aplicará los cambios en el orden correcto.

3. **Deshacer una migración**:
   - Si necesitas deshacer la última migración, ejecutas:
     ```
     npx prisma migrate dev --rollback
     ```

---

### **Ejemplo en Sequelize**

En Sequelize, las migraciones se manejan a través de comandos de CLI y archivos de migración. Por ejemplo:

1. **Crear una migración**:
   - Si quieres añadir una columna `fechaNacimiento` a un modelo, ejecutas:
     ```
     npx sequelize-cli model:generate --name Usuario --attributes fechaNacimiento:DATE
     ```
   - Esto crea un archivo de migración con las instrucciones para añadir la nueva columna.

2. **Aplicar migraciones**:
   - Para aplicar las migraciones, ejecutas:
     ```
     npx sequelize-cli db:migrate
     ```

3. **Deshacer una migración**:
   - Para deshacer la última migración, ejecutas:
     ```
     npx sequelize-cli db:migrate:undo
     ```

---

### **Beneficios de las migraciones**

1. **Control de versiones**:
   - Las migraciones te permiten llevar un historial de todos los cambios realizados en el esquema de la base de datos.

2. **Colaboración en equipo**:
   - Dos desarrolladores pueden trabajar en diferentes funcionalidades y, al compartir las migraciones, sincronizar los cambios en el esquema.

3. **Seguridad**:
   - Las migraciones evitan errores humanos al aplicar cambios manuales en la base de datos.

4. **Documentación**:
   - Los archivos de migración actúan como un registro detallado de los cambios realizados en la base de datos a lo largo del tiempo.

---

### **Resumen**

Las **migraciones** son una forma de gestionar cambios en el esquema de la base de datos de manera estructurada y reproducible. Permiten:

- Crear un historial de cambios.
- Aplicar y deshacer cambios de forma segura.
- Trabajar en equipo sin conflictos.
- Mantener la base de datos sincronizada con el código.

En resumen, las migraciones son una herramienta esencial para mantener tu base de datos actualizada y en sincronización con tu aplicación.

# Prisma cliend 

- **instalacion**: `npm i @prisma/client` 


Prisma Client es una herramienta generada automáticamente por Prisma que actúa como un **ORM (Object-Relational Mapping)** entre tu aplicación y la base de datos. A continuación, te explico cómo funciona y qué hace:

---

### **1. Funcionamiento**
Prisma Client se basa en el esquema de tu base de datos definido en el archivo `prisma.schema`. Aquí hay una descripción paso a paso de cómo funciona:

1. **Definición del Esquema**:
   - En el archivo `prisma.schema`, defines las tablas de tu base de datos, sus columnas, tipos de datos, relaciones y constraints.
   - Por ejemplo:
     ```prisma
     model User {
       id       Int     @id @default(cuid())
       email    String  @unique
       password String
       posts    Post[]
     }

     model Post {
       id       Int     @id @default(cuid())
       title    String
       content String
       author   User    @relation(fields: [id])
     }
     ```

2. **Generación del Cliente**:
   - Al ejecutar el comando `npx prisma generate`, Prisma analiza tu esquema y genera automáticamente un cliente TypeScript/JavaScript (`Prisma Client`) que mapea las tablas de tu base de datos a objetos en tu código.

3. **Uso en la Aplicación**:
   - En tu aplicación, importas Prisma Client y usas sus métodos para interactuar con la base de datos de manera tipo-segura.

---

### **2. Funcionalidades Principales**
Prisma Client ofrece las siguientes funcionalidades:

- **uso**: `import { PrismaClient } from '@prisma/client'`
- **ejemplo**: `const prisma = new PrismaClient()` 

1. **CRUD (Crear, Leer, Actualizar, Eliminar)**:
   - Permite realizar operaciones básicas de CRUD de manera sencilla y tipo-segura.
   - Ejemplo:
     ```typescript
     const user = await prisma.user.create({
       data: {
         email: "john@example.com",
         password: "securepassword",
       },
     });
     ```

2. **Consultas Tipo-Seguras**:
   - La API de Prisma Client está tipada, lo que significa que solo puedes usar los campos y tipos definidos en tu esquema, reduciendo errores en tiempo de desarrollo.

3. **Constructor de Consultas (Query Builder)**:
   - Prisma Client incluye un constructor de consultas que te permite filtrar, ordenar, paginar y realizar operaciones más complejas de manera intuitiva.
   - Ejemplo:
     ```typescript
     const users = await prisma.user.findMany({
       where: {
         email: {
           contains: "john",
         },
       },
       orderBy: {
         id: "asc",
       },
     });
     ```

4. **Transacciones**:
   - Permite ejecutar múltiples operaciones de base de datos como una sola transacción, garantizando la integridad de los datos.
   - Ejemplo:
     ```typescript
     await prisma.$transaction([
       prisma.user.create({
         data: {
           email: "john@example.com",
           password: "securepassword",
         },
       }),
       prisma.post.create({
         data: {
           title: "My First Post",
           content: "Hello World!",
           authorId: 1,
         },
       }),
     ]);
     ```

5. **Caché**:
   - Prisma Client incluye una capa de caché para optimizar el rendimiento y reducir la cantidad de consultas a la base de datos.

6. **Migraciones**:
   - Prisma Client se integra con Prisma Migrate, lo que permite generar migraciones basadas en cambios en tu esquema de base de datos.

---

### **3. Ventajas**
- **Tipo-Seguro**: La API está tipada, lo que reduce errores en tiempo de desarrollo.
- **Fácil de Usar**: Sintaxis intuitiva y simplificada para interactuar con la base de datos.
- **Compatible con Múltiples Bases de Datos**: Soporta PostgreSQL, MySQL, SQLite, SQL Server, entre otras.
- **Optimizado**: Incluye funcionalidades como transacciones, caché y paginación.
- **Mejora la Productividad**: Reduce la cantidad de código boilerplate y te permite enfocarte en la lógica de tu aplicación.

---

### **Resumen**
Prisma Client es una herramienta poderosa que simplifica la interacción con la base de datos, ofreciendo una API tipo-segura y funcionalidades avanzadas como transacciones, caché y migraciones. Es ideal para proyectos full-stack, especialmente con frameworks como Next.js o NestJS.