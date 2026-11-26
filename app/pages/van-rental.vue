<script setup lang="ts">
useSeoMeta({
  title: 'Van Rental & Driver Opportunities | Fero Ferto',
  description: 'Ask Fero Ferto about renting our delivery van for your company or apply to drive with our delivery team.'
})

const VAN_EMAIL = 'van@feroferto.gr'

const rentalForm = reactive({
  company: '',
  contactName: '',
  email: '',
  phone: '',
  platform: '',
  location: '',
  startDate: '',
  notes: ''
})

const driverForm = reactive({
  fullName: '',
  email: '',
  phone: '',
  location: '',
  licence: '',
  experience: '',
  availability: '',
  notes: ''
})

type Feedback = { type: 'success' | 'error', text: string } | null

const rentalFeedback = ref<Feedback>(null)
const driverFeedback = ref<Feedback>(null)
const submittingRental = ref(false)
const submittingDriver = ref(false)

const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

function validateRental(s: typeof rentalForm) {
  const errors = []
  if (!s.company) errors.push({ name: 'company', message: 'Please enter your company name' })
  if (!s.contactName) errors.push({ name: 'contactName', message: 'Please enter your name' })
  if (!emailOk(s.email)) errors.push({ name: 'email', message: 'Please enter a valid email' })
  if (!s.phone) errors.push({ name: 'phone', message: 'Please enter a phone number' })
  if (!s.location) errors.push({ name: 'location', message: 'Please enter your operating location' })
  return errors
}

function validateDriver(s: typeof driverForm) {
  const errors = []
  if (!s.fullName) errors.push({ name: 'fullName', message: 'Please enter your name' })
  if (!emailOk(s.email)) errors.push({ name: 'email', message: 'Please enter a valid email' })
  if (!s.phone) errors.push({ name: 'phone', message: 'Please enter a phone number' })
  if (!s.location) errors.push({ name: 'location', message: 'Please enter your location' })
  return errors
}

async function submitRental() {
  submittingRental.value = true
  rentalFeedback.value = null
  try {
    await $fetch('/api/van-application', { method: 'POST', body: { type: 'rental', ...rentalForm } })
    rentalFeedback.value = { type: 'success', text: 'Your rental enquiry has been sent. We\'ve also emailed a confirmation to you.' }
  } catch {
    rentalFeedback.value = { type: 'error', text: `We couldn't send your enquiry. Please try again or email ${VAN_EMAIL}.` }
  } finally {
    submittingRental.value = false
  }
}

async function submitDriver() {
  submittingDriver.value = true
  driverFeedback.value = null
  try {
    await $fetch('/api/van-application', { method: 'POST', body: { type: 'driver', ...driverForm } })
    driverFeedback.value = { type: 'success', text: 'Your driver application has been sent. We\'ve also emailed a confirmation to you.' }
  } catch {
    driverFeedback.value = { type: 'error', text: `We couldn't send your application. Please try again or email ${VAN_EMAIL}.` }
  } finally {
    submittingDriver.value = false
  }
}

const paths = [
  {
    href: '#rent-the-van',
    dot: 'bg-secondary',
    icon: 'i-lucide-truck',
    eyebrow: 'For delivery companies',
    title: 'Rent the van for your company',
    text: 'Share your delivery operation, location and preferred start date so we can discuss availability and rental details.',
    cta: 'Company rental enquiry'
  },
  {
    href: '#driver-application',
    dot: 'bg-primary',
    icon: 'i-lucide-id-card',
    eyebrow: 'For drivers',
    title: 'Apply for a driver role',
    text: 'Tell us where you are based, your driving background and when you are available.',
    cta: 'Driver application'
  }
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="mx-auto grid max-w-7xl items-center gap-14 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-24 lg:pb-24">
      <div>
        <p
          class="rise eyebrow"
          style="--d:.05s"
        >
          Fero Ferto fleet opportunities
        </p>
        <h1
          class="rise mt-5 text-[2.6rem] leading-[1.04] font-semibold tracking-[-0.035em] text-highlighted sm:text-6xl"
          style="--d:.15s"
        >
          A van for your<br>
          <span class="text-muted">next delivery run.</span>
        </h1>
        <p
          class="rise mt-6 max-w-xl text-lg leading-relaxed text-muted"
          style="--d:.3s"
        >
          We have a van available for delivery work. Delivery companies can enquire about renting it, and drivers can apply to get behind the wheel.
        </p>
        <div
          class="rise mt-9 flex flex-wrap items-center gap-3"
          style="--d:.45s"
        >
          <UButton
            to="#rent-the-van"
            size="xl"
            label="Enquire about renting"
            trailing-icon="i-lucide-arrow-right"
          />
          <UButton
            to="#driver-application"
            size="xl"
            label="Apply as a driver"
            color="neutral"
            variant="outline"
          />
        </div>
      </div>

      <div
        class="rise"
        style="--d:.35s"
      >
        <div
          class="panel relative overflow-hidden p-8 sm:p-10"
          role="img"
          aria-label="Illustration of a delivery van"
        >
          <div class="grid-bg absolute inset-0 opacity-70" />
          <div class="relative">
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 font-mono text-[11px] tracking-wider text-primary uppercase">
                <span class="size-1.5 rounded-full bg-primary" /> Delivery ready
              </span>
              <span class="text-sm text-muted">Fero Ferto</span>
            </div>
            <svg
              class="mt-6 w-full"
              viewBox="0 0 480 240"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M35 63C35 48.64 46.64 37 61 37H293C307.36 37 319 48.64 319 63V169H35V63Z"
                class="fill-[var(--ui-bg-elevated)] stroke-[var(--ui-border-accented)]"
                stroke-width="2"
              />
              <path
                d="M319 87H379.4C389.06 87 397.9 92.34 402.38 100.9L435 163.24V169H319V87Z"
                class="fill-[var(--ui-bg-elevated)] stroke-[var(--ui-border-accented)]"
                stroke-width="2"
              />
              <path
                d="M339 105H372.8C377.2 105 381.25 107.38 383.39 111.22L403 146H339V105Z"
                class="fill-[var(--ui-bg-accented)]"
              />
              <path
                d="M63 57H289V149H63V57Z"
                class="fill-[var(--ui-bg-muted)]"
              />
              <path
                d="M35 157H435V184H35V157Z"
                fill="var(--color-brand-500)"
              />
              <path
                d="M85 105H267M85 122H220"
                class="stroke-[var(--ui-border-accented)]"
                stroke-width="5"
                stroke-linecap="round"
              />
              <circle
                cx="119"
                cy="190"
                r="29"
                class="fill-[var(--ui-text-highlighted)]"
              />
              <circle
                cx="119"
                cy="190"
                r="12"
                class="fill-[var(--ui-bg-accented)]"
              />
              <circle
                cx="366"
                cy="190"
                r="29"
                class="fill-[var(--ui-text-highlighted)]"
              />
              <circle
                cx="366"
                cy="190"
                r="12"
                class="fill-[var(--ui-bg-accented)]"
              />
              <path
                d="M419 151H435V166H419V151Z"
                fill="#FBBF24"
              />
            </svg>
            <p class="mt-4 text-center text-sm text-muted">
              Interested? Tell us how you'd put it to work.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Two ways -->
    <section class="border-y border-default bg-muted/60">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <div
          v-reveal
          class="max-w-2xl"
        >
          <p class="eyebrow">
            Two ways to get started
          </p>
          <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
            Make the van work for you.
          </h2>
          <p class="mt-4 text-muted">
            Whether you represent a delivery company or you're looking for a driving opportunity, send us a few details and our team will be in touch.
          </p>
        </div>
        <div class="mt-10 grid gap-4 md:grid-cols-2">
          <a
            v-for="(p, i) in paths"
            :key="p.href"
            v-reveal="i * 120"
            :href="p.href"
            class="panel group flex flex-col p-7 transition-transform hover:-translate-y-0.5 sm:p-9"
          >
            <span class="flex items-center justify-between">
              <span class="grid size-11 place-items-center rounded-xl border border-default">
                <UIcon
                  :name="p.icon"
                  class="size-5 text-highlighted"
                />
              </span>
              <span
                class="size-2 rounded-full"
                :class="p.dot"
              />
            </span>
            <p class="mt-6 text-sm text-muted">{{ p.eyebrow }}</p>
            <h3 class="mt-1 text-xl font-semibold tracking-tight text-highlighted">
              {{ p.title }}
            </h3>
            <p class="mt-2 flex-1 text-muted">
              {{ p.text }}
            </p>
            <span class="mt-6 inline-flex items-center gap-2 text-sm font-medium text-highlighted">
              {{ p.cta }}
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </a>
        </div>
      </div>
    </section>

    <!-- Forms -->
    <section
      class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24"
      aria-label="Applications"
    >
      <div class="grid gap-6 lg:grid-cols-2">
        <!-- Rental -->
        <div
          id="rent-the-van"
          v-reveal
          class="panel scroll-mt-24 p-6 sm:p-8"
        >
          <p class="flex items-center gap-2 text-sm font-medium">
            <span class="size-2 rounded-full bg-secondary" /> For delivery companies
          </p>
          <h2 class="mt-3 text-2xl font-semibold tracking-tight text-highlighted">
            Enquire about renting
          </h2>
          <p class="mt-2 text-sm text-muted">
            Share your details and what you need. We'll follow up to discuss the van, availability and rental terms.
          </p>

          <UForm
            :state="rentalForm"
            :validate="validateRental"
            class="mt-7 space-y-5"
            @submit="submitRental"
          >
            <div class="grid gap-5 sm:grid-cols-2">
              <UFormField
                label="Company name"
                name="company"
                required
              >
                <UInput
                  v-model="rentalForm.company"
                  class="w-full"
                  size="lg"
                  autocomplete="organization"
                  placeholder="Your company"
                />
              </UFormField>
              <UFormField
                label="Contact name"
                name="contactName"
                required
              >
                <UInput
                  v-model="rentalForm.contactName"
                  class="w-full"
                  size="lg"
                  autocomplete="name"
                  placeholder="Your name"
                />
              </UFormField>
              <UFormField
                label="Work email"
                name="email"
                required
              >
                <UInput
                  v-model="rentalForm.email"
                  type="email"
                  class="w-full"
                  size="lg"
                  autocomplete="email"
                  placeholder="you@company.com"
                />
              </UFormField>
              <UFormField
                label="Phone number"
                name="phone"
                required
              >
                <UInput
                  v-model="rentalForm.phone"
                  type="tel"
                  class="w-full"
                  size="lg"
                  autocomplete="tel"
                  placeholder="+30"
                />
              </UFormField>
              <UFormField
                label="Delivery platform"
                name="platform"
              >
                <UInput
                  v-model="rentalForm.platform"
                  class="w-full"
                  size="lg"
                  placeholder="Platform or delivery service"
                />
              </UFormField>
              <UFormField
                label="Operating location"
                name="location"
                required
              >
                <UInput
                  v-model="rentalForm.location"
                  class="w-full"
                  size="lg"
                  placeholder="City or area"
                />
              </UFormField>
            </div>
            <UFormField
              label="Preferred start date"
              name="startDate"
            >
              <UInput
                v-model="rentalForm.startDate"
                type="date"
                class="w-full"
                size="lg"
              />
            </UFormField>
            <UFormField
              label="What would you like us to know?"
              name="notes"
            >
              <UTextarea
                v-model="rentalForm.notes"
                :rows="3"
                class="w-full"
                size="lg"
                placeholder="Tell us about your delivery operation or rental needs"
              />
            </UFormField>
            <UButton
              type="submit"
              size="xl"
              block
              :loading="submittingRental"
              :label="submittingRental ? 'Sending…' : 'Send rental enquiry'"
              trailing-icon="i-lucide-arrow-right"
            />
            <div
              v-if="rentalFeedback"
              class="flex items-start gap-3 rounded-xl p-4 text-sm"
              :class="rentalFeedback.type === 'success' ? 'bg-emerald-500/10' : 'bg-red-500/10'"
              :role="rentalFeedback.type === 'error' ? 'alert' : 'status'"
              aria-live="polite"
            >
              <UIcon
                :name="rentalFeedback.type === 'success' ? 'i-lucide-circle-check' : 'i-lucide-circle-alert'"
                class="mt-0.5 size-5 shrink-0"
                :class="rentalFeedback.type === 'success' ? 'text-emerald-600' : 'text-red-600'"
              />
              <p class="text-highlighted">
                {{ rentalFeedback.text }}
              </p>
            </div>
          </UForm>
        </div>

        <!-- Driver -->
        <div
          id="driver-application"
          v-reveal="120"
          class="panel scroll-mt-24 p-6 sm:p-8"
        >
          <p class="flex items-center gap-2 text-sm font-medium">
            <span class="size-2 rounded-full bg-primary" /> For drivers
          </p>
          <h2 class="mt-3 text-2xl font-semibold tracking-tight text-highlighted">
            Apply to drive
          </h2>
          <p class="mt-2 text-sm text-muted">
            Interested in driving a delivery van? Introduce yourself and tell us about your experience and availability.
          </p>

          <UForm
            :state="driverForm"
            :validate="validateDriver"
            class="mt-7 space-y-5"
            @submit="submitDriver"
          >
            <div class="grid gap-5 sm:grid-cols-2">
              <UFormField
                label="Full name"
                name="fullName"
                required
              >
                <UInput
                  v-model="driverForm.fullName"
                  class="w-full"
                  size="lg"
                  autocomplete="name"
                  placeholder="Your name"
                />
              </UFormField>
              <UFormField
                label="Email"
                name="email"
                required
              >
                <UInput
                  v-model="driverForm.email"
                  type="email"
                  class="w-full"
                  size="lg"
                  autocomplete="email"
                  placeholder="you@email.com"
                />
              </UFormField>
              <UFormField
                label="Phone number"
                name="phone"
                required
              >
                <UInput
                  v-model="driverForm.phone"
                  type="tel"
                  class="w-full"
                  size="lg"
                  autocomplete="tel"
                  placeholder="+30"
                />
              </UFormField>
              <UFormField
                label="Location"
                name="location"
                required
              >
                <UInput
                  v-model="driverForm.location"
                  class="w-full"
                  size="lg"
                  placeholder="City or area"
                />
              </UFormField>
              <UFormField
                label="Driving licence details"
                name="licence"
              >
                <UInput
                  v-model="driverForm.licence"
                  class="w-full"
                  size="lg"
                  placeholder="Licence category"
                />
              </UFormField>
              <UFormField
                label="Driving experience"
                name="experience"
              >
                <UInput
                  v-model="driverForm.experience"
                  class="w-full"
                  size="lg"
                  placeholder="Years or relevant experience"
                />
              </UFormField>
            </div>
            <UFormField
              label="Availability"
              name="availability"
            >
              <UInput
                v-model="driverForm.availability"
                class="w-full"
                size="lg"
                placeholder="When can you start?"
              />
            </UFormField>
            <UFormField
              label="A little about yourself"
              name="notes"
            >
              <UTextarea
                v-model="driverForm.notes"
                :rows="3"
                class="w-full"
                size="lg"
                placeholder="Share any other details relevant to your application"
              />
            </UFormField>
            <UButton
              type="submit"
              size="xl"
              block
              color="neutral"
              :loading="submittingDriver"
              :label="submittingDriver ? 'Sending…' : 'Send driver application'"
              trailing-icon="i-lucide-arrow-right"
            />
            <div
              v-if="driverFeedback"
              class="flex items-start gap-3 rounded-xl p-4 text-sm"
              :class="driverFeedback.type === 'success' ? 'bg-emerald-500/10' : 'bg-red-500/10'"
              :role="driverFeedback.type === 'error' ? 'alert' : 'status'"
              aria-live="polite"
            >
              <UIcon
                :name="driverFeedback.type === 'success' ? 'i-lucide-circle-check' : 'i-lucide-circle-alert'"
                class="mt-0.5 size-5 shrink-0"
                :class="driverFeedback.type === 'success' ? 'text-emerald-600' : 'text-red-600'"
              />
              <p class="text-highlighted">
                {{ driverFeedback.text }}
              </p>
            </div>
          </UForm>
        </div>
      </div>

      <p class="mt-8 text-center text-sm text-muted">
        Your application is sent to
        <a
          :href="`mailto:${VAN_EMAIL}`"
          class="font-medium text-highlighted underline underline-offset-4"
        >{{ VAN_EMAIL }}</a>. We'll also email a confirmation to the address you provide.
      </p>
    </section>

    <!-- Questions -->
    <section class="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <div
        v-reveal
        class="overflow-hidden rounded-3xl bg-inverted px-7 py-14 text-inverted sm:px-14 sm:py-16"
      >
        <div class="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <h2 class="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Questions before you apply?
            </h2>
            <p class="mt-4 max-w-lg opacity-70">
              We're happy to talk through the rental details or the driving role before you send an application.
            </p>
          </div>
          <div class="flex flex-wrap gap-3 lg:justify-end">
            <UButton
              to="/contact"
              size="xl"
              label="Get in touch"
              trailing-icon="i-lucide-arrow-right"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
