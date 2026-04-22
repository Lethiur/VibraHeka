# Copilot Instructions - VibraHeka

Estas instrucciones aplican a cualquier agente que trabaje en este repositorio.
Objetivo: mantener cambios coherentes con la arquitectura actual, minimizar regresiones y acelerar reviews.

## 1) Contexto del proyecto

- Frontend: React 18 + TypeScript + Vite.
- Estilos: SCSS (entrada principal en `src/Assets/Styles/main.scss`) y Bootstrap.
- Estado de servidor: React Query (`@tanstack/react-query`).
- Estado local/global: Jotai y Context API.
- I18n: i18next con locale base en `src/Core/i18n/locales/es.ts`.
- HTTP: Axios envuelto en `BackendDatasource` con `Result` de `neverthrow`.

## 2) Arquitectura y limites de capas

Estructura principal:

- `src/Core`: piezas compartidas (infraestructura, utilidades, componentes comunes, i18n, storage, etc).
- `src/Modules`: funcionalidad por dominio/feature.

Dentro de cada modulo, respetar capas:

- `Domain`: modelos, contratos (interfaces), errores, composicion de dependencias.
- `Application`: casos de uso y validadores.
- `Data`: DTOs, datasources, repositorios concretos.
- `Presentation`: paginas, componentes, hooks, contextos.

Regla de dependencias (obligatoria):

- `Presentation` puede depender de `Application` y `Domain`.
- `Application` depende de `Domain` (y contratos), no de UI.
- `Data` implementa contratos de `Domain`.
- `Domain` no depende de `Presentation` ni detalles de framework.

Mantener composiciones (inyeccion de dependencias) en archivos `Composition` existentes.
No instanciar repositorios/datasources en componentes de UI.

## 3) Convenciones de imports y paths

- Preferir alias de `tsconfig.app.json` (`@core/*`, `@auth/*`, `@admin/*`, `@users/*`, `@/*`, etc.) sobre rutas relativas largas.
- No mezclar mayusculas/minusculas de paths; respetar exactamente el nombre real de carpetas/archivos.
- Evitar imports ciclicos entre modulos.

## 4) Reglas de implementacion

### Casos de uso

- Exponer un metodo `execute(...)`.
- Validar entrada en `Application/Validators`.
- Si hay errores de validacion, lanzar `InvalidEntityError` (patron actual).
- Devolver `Result<T, E>` (`neverthrow`) en flujos de dominio/aplicacion.

### Repositorios y datasources

- Traducir DTO <-> modelos de dominio en `Data/Repositories`.
- No filtrar errores silenciosamente; mapearlos a error codes de dominio.
- Mantener la logica HTTP en datasources (`BackendDatasource`/especificos), no en componentes.

### Entidades de dominio vs DTOs

- Las **entidades de dominio** (`Domain/Entities`) tienen sus campos en **PascalCase** (ej. `UserId`, `FirstName`).
- Los **DTOs** (`Data/`) representan la respuesta del backend y tienen los mismos campos en **camelCase** (ej. `userId`, `firstName`).
- El **repositorio** (`Data/Repositories`) es el unico responsable de mapear DTOs -> entidades de dominio y viceversa. Ningun otro componente debe asumir la forma del DTO.

### Presentation (React)

- Mantener hooks delgados (`useX`) para consumir contextos/casos de uso.
- Usar lazy loading para pantallas grandes cuando aplique (patron en `src/App.tsx`).
- No meter logica de negocio compleja en componentes; moverla a use cases/hook dedicado.

### Estado y cache

- Para datos remotos, preferir React Query antes que estado manual.
- Para estado de sesion simple/global, seguir patrones Jotai/Context ya existentes.
- Claves de storage: usar siempre `STORAGE_KEYS`.

## 5) Errores, mensajes e i18n

- Reutilizar error codes existentes antes de crear nuevos.
- Cuando se introduzca un nuevo error code visible en UI, agregar traduccion en `src/Core/i18n/locales/es.ts`.
- No hardcodear textos de UI si ya existe namespace i18n para esa seccion.
- Usar `ResultAsync` para encapsular errores

## 6) Estilo de codigo

- TypeScript estricto: evitar `any` salvo necesidad real y documentada.
- Mantener nombres consistentes con el modulo/capa (`XUseCaseImpl`, `IXUseCase`, `XRepositoryImpl`, etc.).
- Mantener funciones pequenas y enfocadas.
- Comentar solo donde la intencion no sea obvia.
- Evitar cambios cosmeticos masivos no relacionados con la tarea.

## 7) Calidad minima antes de cerrar cambios

Ejecutar segun impacto:

- `pnpm lint`
- `pnpm test`
- `pnpm build`

Si no se puede ejecutar algo localmente, dejarlo explicitado en la respuesta/PR con motivo.

## 8) Alcance de cambios

- Tocar solo archivos necesarios para el requerimiento.
- No romper contratos publicos de casos de uso/repositorios sin actualizar consumidores.
- Si una tarea requiere refactor grande, dividir en pasos pequenos y trazables.

## 9) Infra y despliegue

- Cambios de frontend no deben mezclarse innecesariamente con Terraform (`Terraform/`) en el mismo PR.
- Si se modifica CI/CD o Terraform, describir impacto esperado en ambientes/branches.

## 10) Checklist rapido para agentes

Antes de terminar una tarea:

1. Verifique que el cambio respeta capas y aliases.
2. Verifique que errores y textos visibles esten internacionalizados.
3. Corra lint/test/build segun corresponda.
4. Documente riesgos o validaciones pendientes.
5. Entregue resumen corto: que cambio, donde, y por que.

