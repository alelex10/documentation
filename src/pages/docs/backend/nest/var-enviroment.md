---
layout: "/layout.astro"
---

# Variables de entorno en NestJS

En **NestJS** ya viene un soporte básico para variables de entorno a través del paquete oficial `@nestjs/config`, pero **no está incluido por defecto** en el core del framework. Tenés que instalarlo vos.

👉 El más usado es:

```bash
npm install @nestjs/config
```

Y si querés manejar archivos `.env` también necesitás `dotenv`, aunque normalmente ya viene como dependencia indirecta:

```bash
npm install dotenv
```

---

### Ejemplo de uso en Nest:

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // hace que esté disponible en todos los módulos sin importar
      envFilePath: '.env', // podés especificar otro archivo si querés
    }),
  ],
})
export class AppModule {}
```

Y luego lo usás con el `ConfigService`:

```ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getDbHost() {
    return this.configService.get<string>('DB_HOST');
  }
}
```

---