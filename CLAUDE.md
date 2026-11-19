# Ganadex

Marketplace de ganado: Next.js 16, React 19, Supabase. Interfaz y textos en español.

## Trabajo desde varios equipos (PC y MacBook)

El mismo repositorio se usa desde dos ordenadores, asi que hay que sincronizar siempre.

- **Antes de hacer cualquier cambio**: se hace `git pull` automaticamente al abrir la sesion (hook en `.claude/settings.json`). Si el resultado muestra un AVISO o dice que hay cambios nuevos, revisa `git status` y `git log` antes de editar.
- **Al terminar un trabajo**: recuerda al usuario hacer commit y push para que el otro equipo reciba los cambios. No hagas push sin que el usuario lo pida, porque cada push a `main` publica la web en Vercel.
- Nunca subas archivos `.env*` ni claves. Las claves de Supabase viven en `.env.local` en cada equipo y en Vercel.
