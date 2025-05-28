# Configuración de TypeScript para un proyecto Astro

Este archivo define la configuración de TypeScript con enfoque en rutas y aliases.

## Estructura principal:
``` json
{
  "extends": "astro/tsconfigs/strict",        // 1. Extiende presets de TypeScript estricto de Astro
  "include": ["src/**/*", ".astro/types.d.ts"], // 2. Incluye archivos específicos
  "exclude": ["node_modules", "dist"],        // 3. Excluye directorios de compilación
  "compilerOptions": {                        // 4. Opciones de compilación
    "baseUrl": ".",                           // Directorio base para aliases
    "paths": {                                // Mapeos de aliases:
      "@components/*": ["src/components/*"],  // - @components/ → componentes
      "@/*": ["src/*"],                       // - @/ → directorio src raíz
      "/*": ["src/pages/*"]                   // - Rutas relativas → src/pages
    }
  }
}
```

## Explicación técnica:
1. **Extensión de configuración estricta**  
   Hereda configuración TypeScript óptima para proyectos Astro con módulos fuertemente tipados.

2. **Gestión de directorios**  
   - Incluye tipos de Astro y toda la carpeta `src`
   - Excluye builds y dependencias automáticas

3. **Aliases clave**  
   - `@components/`: Para acceder componentes desde rutas relativas  
   - `@/`: Acceso a la raíz de `/src`  
   - `/*`: Redirige rutas absolutas al directorio `src/pages` (❗ **uso cauteloso recomendado** ❗)

💡 **Nota de seguridad:**  
El último alias `"/"*` → `src/pages/*` podría causar conflictos al crear rutas relativas absolutas. Usa preferentemente `@/pages/` o verificar conflictos antes del deploy.

Para usar los aliases, importa con:
```typescript
import MyComponent from '@/components/MyComponent' // Desde raíz de src
import MyRoute from '/my-page'                     // Mapea a src/pages/my-page
```