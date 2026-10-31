<script setup lang="ts">
useSeoMeta({ title: 'Contact | Fero Ferto' })

// Change this to your real email address.
const CONTACT_EMAIL = 'hello@feroferto.gr'

const roles = ['Business', 'Rider', 'Investor / partner', 'Other']

const state = reactive({
  name: '',
  email: '',
  role: 'Business',
  message: ''
})

const sent = ref(false)

function validate(s: typeof state) {
  const errors = []
  if (!s.name) errors.push({ name: 'name', message: 'Please enter your name' })
  if (!s.email || !/^\S+@\S+\.\S+$/.test(s.email)) errors.push({ name: 'email', message: 'Please enter a valid email' })
  if (!s.message) errors.push({ name: 'message', message: 'Please write a short message' })
  return errors
}

function onSubmit() {
  const subject = encodeURIComponent(`Fero Ferto enquiry from ${state.name} (${state.role})`)
  const body = encodeURIComponent(`Name: ${state.name}\nEmail: ${state.email}\nI am a: ${state.role}\n\n${state.message}`)
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  sent.value = true
}
</script>

<template>
  <div>
    <UPageHero
      title="Contact us"
      description="Tell us a little about you and we will get back to you."
    />

    <UPageSection>
      <div class="max-w-xl mx-auto">
        <UAlert
          class="mb-5"
          color="primary"
          variant="subtle"
          icon="i-lucide-monitor-play"
          title="Want to see the product before you write?"
          description="No booking needed — the interactive demo dashboard runs right in your browser with fictional data."
          :actions="[{ label: 'Open the live demo', to: '/demo', trailingIcon: 'i-lucide-arrow-right' }]"
        />
        <UForm :state="state" :validate="validate" class="space-y-5" @submit="onSubmit">
          <UFormField label="Your name" name="name" required>
            <UInput v-model="state.name" class="w-full" placeholder="Full name" />
          </UFormField>

          <UFormField label="Email" name="email" required>
            <UInput v-model="state.email" type="email" class="w-full" placeholder="you@example.com" />
          </UFormField>

          <UFormField label="I am a" name="role">
            <USelect v-model="state.role" :items="roles" class="w-full" />
          </UFormField>

          <UFormField label="Message" name="message" required>
            <UTextarea v-model="state.message" :rows="5" class="w-full" placeholder="How can we help?" />
          </UFormField>

          <UButton type="submit" label="Send message" size="lg" trailing-icon="i-lucide-send" />

          <UAlert
            v-if="sent"
            color="success"
            variant="subtle"
            title="Your email app should open now"
            description="Press send in your email app to finish."
          />
        </UForm>
      </div>
    </UPageSection>
  </div>
</template>
