<script setup lang="ts">
// AI Business Assistant demo — transparent rules-based responder.
// No LLM is connected; answers are generated from the fictional demo dataset
// by simple keyword rules in utils/demo-analytics.ts.
import { workforceStats } from '../../utils/demo-analytics'
import { assistantAnswer, type AssistantReply } from '../../utils/demo-analytics'

interface ChatMsg {
  role: 'user' | 'assistant'
  text: string
  points?: string[]
  riderNames?: string[]
  time: string
}

const stats = workforceStats()

const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

const ARTURO_GREETING: AssistantReply = {
  text: `Hi! I'm the Fero Ferto assistant. I answer workforce questions from your demo dataset: ${stats.total} riders, ${stats.available} available, ${stats.assigned} on shift, utilization ${stats.utilization}%.`,
  points: ['Ask me about availability, overloaded riders, staffing gaps or demand forecasts.']
}

const messages = ref<ChatMsg[]>([
  { role: 'assistant', text: ARTURO_GREETING.text, points: ARTURO_GREETING.points, time: now() }
])
const input = ref('')
const thinking = ref(false)

const suggestions = [
  'How many riders are available today?',
  'Which riders are overloaded?',
  'Which area needs more riders?',
  'How can I improve workforce utilization?'
]
const suggestionPool = ref([...suggestions])
function reshuffle() {
  // rotate so the chips offer fresh prompts
  const first = suggestionPool.value[0] ?? suggestions[0]!
  suggestionPool.value = [...suggestions.filter(s => s !== first), first].slice(0, 4)
}

const scroller = ref<HTMLElement | null>(null)
function scrollDown() {
  nextTick(() => scroller.value?.scrollTo({ top: scroller.value.scrollHeight, behavior: 'smooth' }))
}

function pushUser(text: string) {
  messages.value.push({ role: 'user', text, time: now() })
  scrollDown()
}

function replyTo(question: string) {
  thinking.value = true
  scrollDown()
  // small artificial delay to feel conversational, and to show the typing state
  setTimeout(() => {
    const reply = assistantAnswer(question)
    messages.value.push({
      role: 'assistant',
      text: reply.text,
      points: reply.points,
      riderNames: reply.riderNames,
      time: now()
    })
    thinking.value = false
    input.value = ''
    reshuffle()
    scrollDown()
  }, 650)
}

function send(text?: string) {
  const q = (text ?? input.value).trim()
  if (!q) return
  pushUser(q)
  replyTo(q)
}

function ask(text: string) {
  send(text)
}
</script>

<template>
  <section class="space-y-5">
    <header class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold tracking-tight flex items-center gap-2">
          <UIcon
            name="i-lucide-message-circle-question"
            class="text-primary"
          />AI business assistant
        </h2>
        <p class="text-muted text-sm mt-1">
          Ask about your workforce in plain language. The demo answers from the fictional dataset.
        </p>
      </div>
      <UBadge
        variant="subtle"
        color="neutral"
        icon="i-lucide-bot"
      >
        Rules-based demo · no live AI model
      </UBadge>
    </header>

    <div class="panel flex flex-col h-[560px]">
      <div
        ref="scroller"
        class="flex-1 overflow-y-auto p-5 space-y-4"
      >
        <div
          v-for="(m, i) in messages"
          :key="i"
          class="flex gap-3"
          :class="m.role === 'user' ? 'justify-end' : ''"
        >
          <DemoRiderAvatar
            v-if="m.role === 'assistant'"
            name="Fero"
            size="sm"
          />
          <div
            class="max-w-[85%]"
            :class="m.role === 'user' ? 'text-right' : ''"
          >
            <div
              class="rounded-xl px-4 py-3 text-sm"
              :class="m.role === 'user'
                ? 'bg-primary/15 border border-primary/30 inline-block text-left'
                : 'bg-elevated/60 border border-default text-left'"
            >
              <p>{{ m.text }}</p>
              <ul
                v-if="m.points"
                class="mt-2 space-y-1.5"
              >
                <li
                  v-for="(p, j) in m.points"
                  :key="j"
                  class="flex gap-2 text-xs text-muted"
                >
                  <UIcon
                    name="i-lucide-chevron-right"
                    class="size-3.5 shrink-0 mt-0.5 text-primary/70"
                  />
                  <span>{{ p }}</span>
                </li>
              </ul>
              <ul
                v-if="m.riderNames"
                class="mt-2 flex flex-wrap gap-1.5"
              >
                <li
                  v-for="rn in m.riderNames"
                  :key="rn"
                  class="text-[10px] font-mono px-1.5 py-0.5 rounded border border-primary/30 text-primary"
                >
                  {{ rn }}
                </li>
              </ul>
            </div>
            <p class="text-[10px] text-muted mt-1 px-1">
              {{ m.role === 'user' ? 'You' : 'Fero assistant' }} · {{ m.time }}
            </p>
          </div>
        </div>
        <div
          v-if="thinking"
          class="flex gap-3"
        >
          <DemoRiderAvatar
            name="Fero"
            size="sm"
          />
          <div class="rounded-xl bg-elevated/60 border border-default px-4 py-3 flex gap-1.5 items-center">
            <span
              class="size-2 rounded-full bg-primary animate-bounce"
              style="animation-delay: 0s"
            />
            <span
              class="size-2 rounded-full bg-primary animate-bounce"
              style="animation-delay: .15s"
            />
            <span
              class="size-2 rounded-full bg-primary animate-bounce"
              style="animation-delay: .3s"
            />
          </div>
        </div>
      </div>

      <div class="border-t border-default p-4 space-y-3">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="s in suggestionPool"
            :key="s"
            class="text-xs px-3 py-1.5 rounded-full border border-default text-muted hover:text-primary hover:border-primary/50 transition cursor-pointer"
            @click="ask(s)"
          >
            {{ s }}
          </button>
        </div>
        <form
          class="flex gap-2"
          @submit.prevent="send()"
        >
          <UInput
            v-model="input"
            placeholder="Ask about riders, staffing or forecasts…"
            class="flex-1"
          />
          <UButton
            type="submit"
            icon="i-lucide-send"
            :disabled="!input.trim()"
            label="Ask"
          />
        </form>
        <p class="text-[10px] text-muted">
          This assistant runs on keyword rules over the demo dataset — it does not use a large language model and never shares your question with third parties.
        </p>
      </div>
    </div>
  </section>
</template>
