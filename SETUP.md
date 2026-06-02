# Ganadex — Guía de configuración

## 1. Instalar dependencias

```bash
npm install
```

## 2. Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Copia tu URL y las claves de API
3. Edita `.env.local` con tus credenciales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU_PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

## 3. Crear las tablas en Supabase

En el SQL Editor de Supabase, ejecuta en orden:

1. `supabase/schema.sql` — Todas las tablas, políticas RLS e índices
2. `supabase/storage.sql` — Bucket de media

## 4. Correr en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 5. Desplegar en Vercel

```bash
npm i -g vercel
vercel
```

Configura las mismas variables de entorno en el panel de Vercel.

---

## Estructura del proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page
│   ├── ganado/            # Catálogo y perfiles
│   ├── ganado-leche/      # → redirect a /ganado?categoria=leche
│   ├── ganado-carne/      # → redirect a /ganado?categoria=carne
│   ├── doble-proposito/   # → redirect a /ganado?categoria=doble_proposito
│   ├── vendedores/        # Lista de vendedores
│   ├── nosotros/          # About
│   ├── contacto/          # Contact form
│   ├── auth/              # Login / Registro / Callback
│   └── dashboard/         # Panel del vendedor (protegido)
├── components/
│   ├── layout/            # Navbar + Footer
│   ├── home/              # Secciones de la landing
│   ├── catalog/           # AnimalCard, FilterSidebar, Grid
│   ├── animal/            # Gallery, SellerCard
│   ├── dashboard/         # Sidebar, PublishAnimalForm
│   └── auth/              # LoginForm, RegisterForm
├── lib/
│   ├── supabase/          # client.ts, server.ts, middleware.ts
│   └── utils.ts
└── types/
    └── index.ts

supabase/
├── schema.sql             # Tablas, RLS, triggers, seed de razas
└── storage.sql            # Bucket ganadex-media
```

## Tablas en Supabase

| Tabla | Descripción |
|-------|-------------|
| `profiles` | Extiende auth.users |
| `vendedores` | Perfil de vendedor |
| `razas` | 22 razas pre-cargadas |
| `ganado` | Publicaciones de ejemplares |
| `imagenes_ganado` | Fotos por ejemplar |
| `videos_ganado` | Videos por ejemplar |
| `mensajes` | Mensajería entre usuarios |
| `favoritos` | Lista de favoritos |

## Próximos pasos sugeridos

- [ ] Perfil detallado de vendedor (`/vendedores/[id]`)
- [ ] Edición de publicación (`/dashboard/ganado/[id]/editar`)
- [ ] Perfil del vendedor (`/dashboard/perfil`)
- [ ] Sistema de mensajería interno
- [ ] Favoritos con corazón en cada card
- [ ] Notificaciones por email (Resend / SendGrid)
- [ ] Panel de administración
- [ ] SEO dinámico con sitemap.xml
