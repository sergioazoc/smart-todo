/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// export default {
// 	async fetch(request, env, ctx): Promise<Response> {
// 		return new Response('Hello World!');
// 	},
// } satisfies ExportedHandler<Env>;
export interface Env {
  // If you set another name in the Wrangler config file as the value for 'binding',
  // replace "AI" with the variable name you defined.
  AI: Ai
}

interface Task {
  id: string
  text: string
  completed: boolean
}

export default {
	 async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)

    // Preflight para CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders()
      })
    }

    if (request.method === 'POST' && url.pathname === '/api/tasks/insights') {
      try {
        const tasks = await request.json<Task[]>()

        if (!Array.isArray(tasks)) {
          return json({ error: 'Formato inválido: se esperaba un array de tareas' }, 400)
        }

        const pendingTexts = tasks
          .filter(task => !task.completed)
          .map(task => task.text)

        if (pendingTexts.length === 0) {
          return json({ result: 'No hay tareas pendientes para priorizar.' })
        }

        const prompt = generatePrompt(pendingTexts)

        const aiResponse = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
					messages: [
						{
							role: 'user',
							content: prompt
						}
					],
					max_tokens: 1024,       // Límite de tokens
					temperature: 0.3,       // Menor aleatoriedad, más consistencia
					top_p: 0.9,             // Control de coherencia
					frequency_penalty: 0.1 	// Evitar repeticiones
				})

        return json({ result: aiResponse.response })
      } catch (e) {
				console.error('Error AI:', e)
        const errorMessage = (e && typeof e === 'object' && 'message' in e) ? (e as { message: string }).message : 'Error inesperado'
        return json({ error: errorMessage }, 500)
      }
    }

    return json({ error: 'Not Found' }, 404)
  }
} satisfies ExportedHandler<Env>

function generatePrompt(tasks: string[]): string {
  const list = tasks.map((t, index) => `${index + 1}. ${t}`).join('\n')

	const now = new Date()
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Santiago'
  }).format(now)

  return `
		Eres un asistente personal empático, claro y realista. Tu objetivo es ayudar a una persona común a organizar sus tareas pendientes de forma práctica y sin abrumarla. Imagina que estás hablando con un amigo o familiar que quiere tomar decisiones claras sobre qué hacer primero.

		---

		📌 Objetivo: Crear un plan de acción útil y realista, priorizando según urgencia y beneficio práctico.

		📌 Tono: Conversacional, cálido y humano. Evita sonar como una IA o dar explicaciones robóticas.

		📌 Consideraciones:
		- Usa **exactamente** el texto original de cada tarea (no lo reformules ni lo resumas).
		- Evalúa cada tarea en base a:
			1. **Urgencia temporal** (¿es para hoy, mañana, esta semana, más adelante?).
			2. **Impacto práctico** (¿qué tan importante es para su salud, tranquilidad o responsabilidades?).
		- Si no hay pistas sobre urgencia, asume que es flexible.
		- Sé claro, útil y directo. Evita introducir categorías nuevas.

		---

		📅 Fecha actual: **${formattedDate}**

		📝 Lista de tareas:
		${list}

		---

		📦 Formato de respuesta (Markdown, sin introducción ni cierre):

		## ✅ Sugerencia de Organización

		Te dejo una propuesta para ordenar tus tareas, priorizando lo más urgente o valioso para ti.

		---

		### 🥇 Empieza por aquí (alta prioridad)
		- **[Texto exacto de la tarea]:** [Motivo breve: urgencia + impacto]

		---

		### 🧩 Luego puedes seguir con...
		- **[Texto exacto de la tarea]:** [Motivo lógico, útil o relajado]

		---

		### 💤 Si te queda tiempo o energía
		- **[Texto exacto de la tarea]:** [Actividad flexible, recreativa o postergable]

		---

		## 💡 Consejo práctico

		[Una sola línea con un consejo realista y cercano, relacionado con las tareas]
	`.trim()
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  }
}

// 🔧 Helper para respuestas con CORS + JSON
function json(body: any, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders()
  })
}
