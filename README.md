# 🧠 Smart Todo

Smart Todo es una aplicación inteligente de gestión de tareas. Te permite crear y organizar tus tareas, y usa inteligencia artificial para ayudarte a priorizarlas de forma lógica y útil. Todo se ejecuta sin backend tradicional, gracias a Cloudflare Workers y Vue 3.

## 🚀 Características

- ✏️ Crear, completar y eliminar tareas
- 🧠 Priorización inteligente con IA
- 💾 Persistencia automática en localStorage
- 📱 Diseño responsive para desktop y móvil
- ⚡ Sincronización instantánea entre componentes

## 🛠️ Arquitectura del Proyecto

```
smart-todo/
├── frontend/          # Aplicación Vue.js
├── backend/           # Cloudflare Workers API
└── README.md          # Este archivo
```

## 🎯 Frontend

### Tecnologías

- **Vue 3** – Framework reactivo con Composition API
- **TypeScript** – Tipado estático
- **Vite** – Build tool rápido y moderno
- **Axios** – Cliente HTTP
- **DOMPurify** – Sanitización segura de HTML
- **Marked** – Renderizado de Markdown
- **UUID** – Generación de IDs únicos

### Patrones y estructura

#### 🧩 Composables

```ts
useTask()         // Manejo de tareas y persistencia local
useTaskInsights() // Estado y contenido del análisis
```

#### 💾 Persistencia local

- Se utiliza `localStorage` para mantener las tareas entre sesiones
- Vue `watch` sincroniza automáticamente los cambios
- No se requiere backend para almacenar el estado del usuario

#### 🧱 Componentes

```
App.vue
├── TaskForm.vue      # Formulario para agregar tareas
├── TaskList.vue      # Lista con toggle y eliminación
└── TaskInsight.vue   # Respuesta analizada por IA
```

### 🔧 Desarrollo

```bash
cd frontend

# Instalar dependencias
pnpm install

# Desarrollo con hot-reload
pnpm dev

# Build para producción
pnpm build

# Verificación de tipos
pnpm type-check

# Linting y formato
pnpm lint
pnpm format
```

## ⚡ Backend

### Tecnologías

- **Cloudflare Workers** – Serverless edge computing
- **TypeScript** – Tipado estático
- **Cloudflare AI** – Modelos de IA integrados
- **Wrangler** – CLI para desarrollo y despliegue

### Integración con IA

```ts
// Modelo utilizado para priorización de tareas
'@cf/meta/llama-3.1-8b-instruct'
```

#### ¿Por qué este modelo?

- 🧠 **Alta comprensión del lenguaje** para analizar tareas humanas
- 🛠️ **Enfocado en instrucciones**, ideal para prompts estructurados
- ⚖️ **Equilibrio entre rendimiento y costo** (8B parámetros)
- 💸 **Gratuito y disponible** en la plataforma de Cloudflare

### Edge computing

- Despliegue global en más de 300 ubicaciones
- Latencia mínima sin configuración adicional
- Comunicación segura mediante CORS

### 🔧 Desarrollo

```bash
cd backend

# Instalar dependencias
pnpm install

# Desarrollo local
pnpm dev

# Despliegue a Cloudflare
pnpm deploy

# Generar tipos de bindings AI
pnpm cf-typegen
```

## 🌟 Flujo de Usuario

1. Agregar tarea → Se guarda automáticamente
2. Completar o desmarcar → Reactividad inmediata
3. Pedir análisis → Se envían las tareas pendientes a la IA
4. Recibir priorización → Respuesta formateada en Markdown
5. Persistencia → Todo se mantiene entre sesiones

## 🔧 Configuración

### Variables de entorno

#### Frontend

```env
# frontend/.env
VITE_API_URL=https://tu-worker.tu-subdominio.workers.dev
```

#### Backend

```jsonc
// backend/wrangler.jsonc
{
  "name": "smart-todo-backend",
  "ai": { "binding": "AI" },
  "compatibility_date": "2024-01-01"
}
```

## 🚀 Despliegue

### 1. Backend (Cloudflare Workers)

```bash
cd backend
pnpm deploy
```

> Asegúrate de haber iniciado sesión con `npx wrangler login` previamente.

### 2. Frontend

```bash
cd frontend

# Agrega la URL de tu Worker a la configuración
echo "VITE_API_URL=https://tu-worker.tu-subdominio.workers.dev" > .env

# Genera los archivos para producción
pnpm build
```

> También puedes desplegar el frontend en [Cloudflare Pages](https://pages.cloudflare.com) como sitio estático.

## 🎨 Experiencia de Usuario

- 🕹️ Feedback visual inmediato en cada acción
- ⏳ Indicadores de carga para acciones asíncronas
- 📱 Mobile-first design
- 🧭 Colores semánticos para prioridades
- 💬 Respuestas de IA con formato claro en Markdown

## 🔒 Seguridad

- ✨ HTML sanitizado con `DOMPurify`
- ✅ Tipado estricto en frontend y backend
- 🌐 CORS correctamente configurado
- 🧱 Protección nativa mediante Workers y aislamiento global

## 📈 Escalabilidad

### Frontend

- Componentes desacoplados con Composition API
- Código mantenible con TypeScript
- Estructura de carpetas basada en Screaming Architecture pero por Features

### Backend

- Serverless, sin necesidad de infraestructura
- Escala automáticamente
- Ejecutado en edge nodes para máxima rapidez

## 💭 Reflexión personal

Antes de empezar a codear, me enfoqué en entender bien el problema. Conversé con ChatGPT para explorar alternativas de enfoque y conocer más sobre Cloudflare, que nunca lo había usado para desplegar apps y menos un backend con IA.

Una vez claro el camino, comencé a desarrollar. Estas fueron mis decisiones clave:

### 🔑 Decisiones

- **Vue 3**: Me permite trabajar más rápido y cómodo. Es ideal para este tipo de apps simples pero con lógica reactiva.
- **TypeScript**: Mejora la robustez del código y evita errores tontos.
- **Cloudflare**: Seguí la sugerencia del desafío, y descubrí que Workers y AI son mucho más fáciles y potentes de lo que esperaba.
- **Marked + DOMPurify**: Me aseguran que la salida de la IA pueda mostrarse sin riesgos.
- **UUID**: Para generar identificadores únicos en las tareas, de forma simple y confiable.

