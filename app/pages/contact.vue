<script setup lang="ts">
useSeoMeta({
  title: 'Contact | Fero Ferto',
  description: 'Request riders for your delivery company, apply as a rider, or ask us anything. info@feroferto.com'
})

const CONTACT_EMAIL = 'info@feroferto.com'

type Side = 'company' | 'rider' | 'other'

const route = useRoute()
const initial = (['company', 'rider', 'other'] as const).find(s => s === route.query.as) ?? 'company'
const side = ref<Side>(initial)
watch(() => route.query.as, (as) => {
  if (as === 'company' || as === 'rider' || as === 'other') side.value = as
})

const sides = [
  { v: 'company' as const, label: 'I need riders', hint: 'Delivery company', dot: 'bg-secondary', icon: 'i-lucide-building-2' },
  { v: 'rider' as const, label: 'I want to ride', hint: 'Rider', dot: 'bg-primary', icon: 'i-lucide-bike' },
  { v: 'other' as const, label: 'Something else', hint: 'Partner, press, other', dot: 'bg-accented', icon: 'i-lucide-message-circle' }
]

const state = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  zone: '',
  riders: '',
  vehicle: 'Scooter',
  availability: '',
  message: ''
})

const vehicles = ['Bicycle', 'E-bike', 'Scooter', 'Motorbike', 'Car']

const next = computed(() => ({
  company: ['We read your request and check riders in your zone.', 'We call or email you to confirm shifts and numbers.', 'You get a shortlist and a service agreement to sign.'],
  rider: ['We read your application and check the details.', 'We call or email you about documents and onboarding.', 'You start getting offers that fit your schedule.'],
  other: ['We read your message.', 'The right person at Fero Ferto gets back to you by email.']
}[side.value]))

const sent = ref(false)

function validate(s: typeof state) {
  const errors = []
  if (!s.name) errors.push({ name: 'name', message: 'Please enter your name' })
  if (!s.email || !/^\S+@\S+\.\S+$/.test(s.email)) errors.push({ name: 'email', message: 'Please enter a valid email' })
  if (side.value === 'company' && !s.company) errors.push({ name: 'company', message: 'Please enter your company name' })
  if (side.value === 'other' && !s.message) errors.push({ name: 'message', message: 'Please write a short message' })
  return errors
}

function onSubmit() {
  const label = sides.find(s => s.v === side.value)!.hint
  const lines = [
    `Name: ${state.name}`,
    `Email: ${state.email}`,
    state.phone && `Phone: ${state.phone}`,
    `I am: ${label}`
  ]
  if (side.value === 'company') {
    lines.push(`Company: ${state.company}`, state.zone && `Zone: ${state.zone}`, state.riders && `Riders needed: ${state.riders}`)
  } else if (side.value === 'rider') {
    lines.push(`Vehicle: ${state.vehicle}`, state.zone && `Areas: ${state.zone}`, state.availability && `Availability: ${state.availability}`)
  }
  const subject = encodeURIComponent(side.value === 'company'
    ? `Rider request from ${state.company || state.name}`
    : side.value === 'rider' ? `Rider application from ${state.name}` : `Message from ${state.name}`)
  const body = encodeURIComponent(`${lines.filter(Boolean).join('\n')}\n\n${state.message}`)
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  sent.value = true
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 pt-14 pb-24 sm:px-6 lg:pt-20">
    <!-- Phones: intro, form, details. Desktop: intro and details on the left, form on the right. -->
    <div class="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-x-20 lg:gap-y-0">
      <div class="lg:col-start-1 lg:row-start-1">
        <p
          class="rise eyebrow"
          style="--d:.05s"
        >
          Contact
        </p>
        <h1
          class="rise mt-4 text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.035em] text-highlighted sm:text-6xl"
          style="--d:.15s"
        >
          Let's find your match.
        </h1>
        <p
          class="rise mt-5 max-w-md text-lg text-muted"
          style="--d:.3s"
        >
          Whether you need riders for this weekend or you are looking for steady shifts, start here.
        </p>
      </div>

      <div class="order-last lg:order-none lg:col-start-1 lg:row-start-2">
        <div
          class="rise lg:mt-12"
          style="--d:.45s"
        >
          <p class="eyebrow">
            What happens next
          </p>
          <Transition
            name="swap"
            mode="out-in"
          >
            <ol
              :key="side"
              class="relative mt-5 space-y-5 pl-10"
            >
              <span class="absolute top-3 bottom-3 left-[13px] w-px bg-[var(--ui-border-accented)]" />
              <li
                v-for="(n, i) in next"
                :key="n"
                class="pop relative text-sm text-muted"
                :style="{ '--d': i * 0.12 + 's' }"
              >
                <span
                  class="absolute -left-10 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full font-mono text-[11px] ring-4 ring-[var(--ui-bg)]"
                  :class="side === 'company' ? 'bg-secondary text-white' : side === 'rider' ? 'bg-primary text-white' : 'bg-inverted text-inverted'"
                >{{ i + 1 }}</span>
                {{ n }}
              </li>
            </ol>
          </Transition>
        </div>

        <div
          class="rise mt-12 space-y-3 border-t border-default pt-8"
          style="--d:.55s"
        >
          <a
            :href="`mailto:${CONTACT_EMAIL}`"
            class="group flex items-center gap-3 text-sm"
          >
            <span class="grid size-9 place-items-center rounded-full border border-default">
              <UIcon
                name="i-lucide-mail"
                class="size-4 text-primary"
              />
            </span>
            <span class="font-medium text-highlighted underline-offset-4 group-hover:underline">{{ CONTACT_EMAIL }}</span>
          </a>
          <p class="flex items-center gap-3 text-sm text-muted">
            <span class="grid size-9 place-items-center rounded-full border border-default">
              <UIcon
                name="i-lucide-map-pin"
                class="size-4"
              />
            </span>
            Greece · serving Europe and the GCC
          </p>
          <NuxtLink
            to="/demo"
            class="group flex items-center gap-3 text-sm text-muted"
          >
            <span class="grid size-9 place-items-center rounded-full border border-default">
              <UIcon
                name="i-lucide-monitor-play"
                class="size-4"
              />
            </span>
            <span class="group-hover:text-highlighted">Prefer to look first? Open the live demo</span>
            <UIcon
              name="i-lucide-arrow-right"
              class="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </NuxtLink>
        </div>
      </div>

      <!-- Form -->
      <div
        class="rise lg:col-start-2 lg:row-span-2 lg:row-start-1"
        style="--d:.3s"
      >
        <div class="panel p-6 sm:p-8">
          <p class="text-sm font-medium text-highlighted">
            I am writing as
          </p>
          <div
            class="mt-3 grid grid-cols-3 gap-2"
            role="radiogroup"
            aria-label="I am writing as"
          >
            <button
              v-for="s in sides"
              :key="s.v"
              type="button"
              role="radio"
              :aria-checked="side === s.v"
              class="flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-all sm:p-4"
              :class="side === s.v ? 'border-[var(--ui-text-highlighted)] bg-elevated shadow-sm' : 'border-default hover:border-accented'"
              @click="side = s.v; sent = false"
            >
              <span class="flex w-full items-center justify-between">
                <UIcon
                  :name="s.icon"
                  class="size-5"
                  :class="side === s.v ? 'text-highlighted' : 'text-muted'"
                />
                <span
                  class="size-2 rounded-full transition-opacity"
                  :class="[s.dot, side === s.v ? 'opacity-100' : 'opacity-0']"
                />
              </span>
              <span class="text-sm leading-tight font-medium text-highlighted">{{ s.label }}</span>
              <span class="hidden text-[11px] text-muted sm:block">{{ s.hint }}</span>
            </button>
          </div>

          <UForm
            :state="state"
            :validate="validate"
            class="mt-8 space-y-5"
            @submit="onSubmit"
          >
            <div class="grid gap-5 sm:grid-cols-2">
              <UFormField
                label="Your name"
                name="name"
                required
              >
                <UInput
                  v-model="state.name"
                  class="w-full"
                  size="lg"
                  placeholder="Full name"
                />
              </UFormField>
              <UFormField
                label="Email"
                name="email"
                required
              >
                <UInput
                  v-model="state.email"
                  type="email"
                  class="w-full"
                  size="lg"
                  placeholder="you@example.com"
                />
              </UFormField>
            </div>

            <Transition
              name="swap"
              mode="out-in"
            >
              <div
                v-if="side === 'company'"
                key="company"
                class="grid gap-5 sm:grid-cols-2"
              >
                <UFormField
                  label="Company"
                  name="company"
                  required
                  class="sm:col-span-2"
                >
                  <UInput
                    v-model="state.company"
                    class="w-full"
                    size="lg"
                    placeholder="Company name"
                  />
                </UFormField>
                <UFormField
                  label="Delivery zone"
                  name="zone"
                >
                  <UInput
                    v-model="state.zone"
                    class="w-full"
                    size="lg"
                    placeholder="e.g. Kallithea"
                  />
                </UFormField>
                <UFormField
                  label="Riders needed"
                  name="riders"
                >
                  <UInput
                    v-model="state.riders"
                    class="w-full"
                    size="lg"
                    placeholder="e.g. 6, Fri – Sun evenings"
                  />
                </UFormField>
              </div>
              <div
                v-else-if="side === 'rider'"
                key="rider"
                class="grid gap-5 sm:grid-cols-2"
              >
                <UFormField
                  label="Vehicle"
                  name="vehicle"
                >
                  <USelect
                    v-model="state.vehicle"
                    :items="vehicles"
                    class="w-full"
                    size="lg"
                  />
                </UFormField>
                <UFormField
                  label="Phone"
                  name="phone"
                >
                  <UInput
                    v-model="state.phone"
                    type="tel"
                    class="w-full"
                    size="lg"
                    placeholder="+30 …"
                  />
                </UFormField>
                <UFormField
                  label="Areas you can work"
                  name="zone"
                >
                  <UInput
                    v-model="state.zone"
                    class="w-full"
                    size="lg"
                    placeholder="e.g. Piraeus, Kallithea"
                  />
                </UFormField>
                <UFormField
                  label="When you can work"
                  name="availability"
                >
                  <UInput
                    v-model="state.availability"
                    class="w-full"
                    size="lg"
                    placeholder="e.g. Weekday evenings"
                  />
                </UFormField>
              </div>
              <div
                v-else
                key="other"
              />
            </Transition>

            <UFormField
              :label="side === 'other' ? 'Message' : 'Anything else? (optional)'"
              name="message"
              :required="side === 'other'"
            >
              <UTextarea
                v-model="state.message"
                :rows="4"
                class="w-full"
                size="lg"
                :placeholder="side === 'company' ? 'Tell us about your orders, hours or start date.' : side === 'rider' ? 'Experience, languages, anything we should know.' : 'How can we help?'"
              />
            </UFormField>

            <div class="flex flex-wrap items-center gap-4 pt-1">
              <UButton
                type="submit"
                size="xl"
                :label="side === 'company' ? 'Send rider request' : side === 'rider' ? 'Send application' : 'Send message'"
                trailing-icon="i-lucide-arrow-right"
              />
              <p class="text-xs text-dimmed">
                Opens your email app with everything filled in.
              </p>
            </div>

            <Transition name="swap">
              <div
                v-if="sent"
                class="flex items-start gap-3 rounded-xl bg-emerald-500/10 p-4 text-sm"
              >
                <UIcon
                  name="i-lucide-circle-check"
                  class="pop mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400"
                />
                <div>
                  <p class="font-medium text-highlighted">
                    Your email app should open now
                  </p>
                  <p class="mt-0.5 text-muted">
                    Press send there to finish. If nothing opened, write to {{ CONTACT_EMAIL }}.
                  </p>
                </div>
              </div>
            </Transition>
          </UForm>
        </div>
      </div>
    </div>
  </div>
</template>
