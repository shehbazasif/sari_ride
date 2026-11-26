<script setup lang="ts">
useSeoMeta({
  title: 'About | Fero Ferto',
  description: 'Fero Ferto puts delivery riders at the centre: clearer compliance, better tools and genuine support. Meet the team and the values behind it.'
})

const promises = [
  { title: 'Built by people who understand the gig economy', text: 'Our team includes former riders and industry veterans.' },
  { title: 'Focused on sustainability', text: 'We grow responsibly, investing profits back into rider support.' },
  { title: 'Transparent operations', text: 'No hidden fees, no surprises. Riders always know where they stand.' }
]

const values = [
  { icon: 'i-lucide-target', title: 'Rider first', text: 'Every feature, policy and decision starts with one question: "Does this help our riders?" We advocate for their success, wellbeing and economic security.' },
  { icon: 'i-lucide-zap', title: 'Speed and simplicity', text: 'We remove friction at every turn. Fast onboarding, clear communication and effortless platform management, without unnecessary complexity.' },
  { icon: 'i-lucide-handshake', title: 'Trust and transparency', text: 'No hidden fees, no surprise requirements. We are honest about what we do and why, and build relationships through clear communication.' },
  { icon: 'i-lucide-sprout', title: 'Continuous growth', text: 'We invest in tools, training and support so riders can grow their earnings, build their skills and have sustainable careers with us.' },
  { icon: 'i-lucide-shield-check', title: 'Safety first', text: 'We prioritise the safety of our riders through insurance, dedicated support and fair working standards.' },
  { icon: 'i-lucide-globe', title: 'Sustainable impact', text: 'We champion eco-friendly practices and encourage riders to make delivery choices that benefit their communities and the planet.' }
]

const team = [
  { name: 'Raja Shehzad Jamil', role: 'Founder & CEO', text: 'Former delivery operations manager with 8+ years in delivery platforms. Started as a rider to understand the pain points first-hand.' },
  { name: 'Shehbaz Asif', role: 'HR and Documentation', text: 'Operations specialist with a background in HR tech and compliance. Passionate about fair employment practices.' },
  { name: 'Ahmed', role: 'CTO', text: 'Develops strategy for business growth and manages the core platform that powers Fero Ferto\'s operations.' }
]

const initials = (n: string) => n.split(' ').map(p => p[0]).slice(0, 2).join('')

const apart = [
  {
    title: 'Built by riders, for riders',
    text: 'Our whole team, leadership included, has ground-level experience in the delivery industry. We don\'t guess at rider needs. We live them.',
    points: ['30%+ of the team are or were active riders', 'Weekly rider feedback sessions', 'Direct influence on product decisions'],
    img: '/images/built_for_riders.jpg',
    alt: 'Fero Ferto team working together'
  },
  {
    title: 'Enterprise-grade technology',
    text: 'The interface is simple and the backend does the heavy lifting: compliance, payroll and multi-platform coordination at scale.',
    points: ['Real-time earnings tracking and payouts', 'Automated compliance document management', 'Multi-platform synchronisation'],
    img: '/images/team_multifuntion.jpeg',
    alt: 'Fero Ferto operations team'
  },
  {
    title: 'A genuine commitment to sustainability',
    text: 'We are not here for a quick exit. We are building a company that grows responsibly and reinvests in the rider community.',
    points: ['Profits reinvested in product improvements', 'Annual benefits and welfare initiatives', 'Long-term vision, not short-term gains'],
    img: '',
    alt: ''
  }
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="mx-auto max-w-7xl px-4 pt-14 pb-20 sm:px-6 lg:pt-24">
      <p
        class="rise eyebrow"
        style="--d:.05s"
      >
        About us
      </p>
      <h1
        class="rise mt-5 max-w-4xl text-[2.6rem] leading-[1.04] font-semibold tracking-[-0.035em] text-highlighted sm:text-6xl"
        style="--d:.15s"
      >
        Our mission is to empower <span class="text-muted">delivery riders.</span>
      </h1>
      <p
        class="rise mt-6 max-w-2xl text-lg leading-relaxed text-muted"
        style="--d:.3s"
      >
        Fero Ferto is redefining delivery work by putting riders at the centre of everything we do. We believe independent couriers deserve better tools, clearer compliance and genuine support.
      </p>
    </section>

    <!-- Story -->
    <section class="border-y border-default bg-muted/60">
      <div class="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
        <div v-reveal>
          <p class="eyebrow">
            The Fero Ferto story
          </p>
          <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
            "What if we could be the bridge?"
          </h2>
        </div>
        <div
          v-reveal="120"
          class="space-y-5 text-muted"
        >
          <p>
            Fero Ferto was born from frustration. Our founders spent years watching talented delivery riders struggle with the same obstacles: fragmented onboarding across platforms, unclear compliance requirements, and difficulty managing their workload.
          </p>
          <p>
            In 2020 we asked ourselves: what if we handled all the administrative work, from verification and compliance to payroll and platform coordination, so riders could focus on earning and growing their careers?
          </p>
          <p>
            That question became Fero Ferto. Our biggest achievement isn't a number. It's the trust riders place in us.
          </p>
          <ul class="divide-y divide-default border-y border-default pt-1">
            <li
              v-for="p in promises"
              :key="p.title"
              class="flex gap-4 py-4"
            >
              <UIcon
                name="i-lucide-check"
                class="mt-0.5 size-5 shrink-0 text-primary"
              />
              <div>
                <p class="font-medium text-highlighted">
                  {{ p.title }}
                </p>
                <p class="mt-0.5 text-sm">
                  {{ p.text }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
      <div
        v-reveal
        class="max-w-2xl"
      >
        <p class="eyebrow">
          Our core values
        </p>
        <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-5xl">
          The principles behind every decision.
        </h2>
      </div>
      <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(v, i) in values"
          :key="v.title"
          v-reveal="(i % 3) * 100"
          class="panel p-7"
        >
          <span class="grid size-11 place-items-center rounded-xl border border-default">
            <UIcon
              :name="v.icon"
              class="size-5 text-primary"
            />
          </span>
          <h3 class="mt-5 text-lg font-semibold text-highlighted">
            {{ v.title }}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">
            {{ v.text }}
          </p>
        </div>
      </div>
    </section>

    <!-- Mission statement -->
    <section class="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <div
        v-reveal
        class="overflow-hidden rounded-3xl bg-inverted px-7 py-14 text-inverted sm:px-14 sm:py-20"
      >
        <p class="font-mono text-xs tracking-widest uppercase opacity-60">
          Our mission
        </p>
        <p class="mt-5 max-w-4xl text-2xl leading-snug font-semibold tracking-tight sm:text-3xl">
          To empower independent delivery riders with enterprise-grade tools, transparent workflows and genuine support, so they can earn more, work smarter and build sustainable careers.
        </p>
        <p class="mt-6 max-w-2xl opacity-70">
          We believe the future of delivery is built on trust between riders and platforms. By removing barriers and adding value, we're creating an ecosystem where everyone wins.
        </p>
      </div>
    </section>

    <!-- Team -->
    <section class="border-t border-default">
      <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
        <div class="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div v-reveal>
            <p class="eyebrow">
              Our team
            </p>
            <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-5xl">
              People who know delivery from the ground up.
            </h2>
          </div>
          <p
            v-reveal="120"
            class="max-w-lg text-muted lg:justify-self-end"
          >
            Founders, operators and riders, plus a team of 25+ riders, operators and support specialists who live our mission every day.
          </p>
        </div>
        <div class="mt-12 grid gap-4 md:grid-cols-3">
          <div
            v-for="(m, i) in team"
            :key="m.name"
            v-reveal="i * 100"
            class="panel p-7"
          >
            <span class="grid size-14 place-items-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
              {{ initials(m.name) }}
            </span>
            <h3 class="mt-5 text-lg font-semibold text-highlighted">
              {{ m.name }}
            </h3>
            <p class="font-mono text-xs tracking-wider text-primary uppercase">
              {{ m.role }}
            </p>
            <p class="mt-3 text-sm leading-relaxed text-muted">
              {{ m.text }}
            </p>
          </div>
        </div>
        <p
          v-reveal
          class="mt-8 text-muted"
        >
          We're hiring. If you believe in empowering riders,
          <ULink
            to="/contact?as=other"
            class="font-medium text-highlighted underline underline-offset-4"
          >we'd love to hear from you</ULink>.
        </p>
      </div>
    </section>

    <!-- What sets us apart -->
    <section class="border-t border-default bg-muted/60">
      <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
        <div
          v-reveal
          class="max-w-2xl"
        >
          <p class="eyebrow">
            What sets us apart
          </p>
          <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-5xl">
            Why riders and companies choose Fero Ferto.
          </h2>
        </div>
        <div class="mt-14 space-y-16">
          <div
            v-for="(a, i) in apart"
            :key="a.title"
            v-reveal
            class="grid items-center gap-10 lg:grid-cols-2"
          >
            <div :class="i % 2 === 1 ? 'lg:order-2' : ''">
              <h3 class="text-2xl font-semibold tracking-tight text-highlighted">
                {{ a.title }}
              </h3>
              <p class="mt-3 max-w-xl text-muted">
                {{ a.text }}
              </p>
              <ul class="mt-6 space-y-3">
                <li
                  v-for="pt in a.points"
                  :key="pt"
                  class="flex items-center gap-3 text-sm text-highlighted"
                >
                  <UIcon
                    name="i-lucide-check"
                    class="size-4 shrink-0 text-primary"
                  />
                  {{ pt }}
                </li>
              </ul>
            </div>
            <img
              v-if="a.img"
              :src="a.img"
              :alt="a.alt"
              loading="lazy"
              class="aspect-[4/3] w-full rounded-2xl border border-default object-cover"
            >
            <div
              v-else
              class="panel grid aspect-[4/3] place-items-center"
            >
              <UIcon
                name="i-lucide-leaf"
                class="size-16 text-primary/60"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
