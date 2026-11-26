import nodemailer from 'nodemailer'

type ApplicationType = 'rental' | 'driver'

interface ApplicationDetails {
  type: ApplicationType
  name: string
  email: string
  phone: string
  fields: Array<[string, string]>
}

const readField = (
  body: Record<string, unknown>,
  key: string,
  { required = false, maxLength = 500 }: { required?: boolean, maxLength?: number } = {}
) => {
  const value = body[key]

  if (typeof value !== 'string') {
    if (required) {
      throw createError({
        statusCode: 400,
        statusMessage: `A valid ${key} is required.`
      })
    }
    return ''
  }

  const trimmed = value.trim()
  if (required && !trimmed) {
    throw createError({
      statusCode: 400,
      statusMessage: `A valid ${key} is required.`
    })
  }

  if (trimmed.length > maxLength) {
    throw createError({
      statusCode: 400,
      statusMessage: `${key} must be ${maxLength} characters or fewer.`
    })
  }

  return trimmed
}

const validateEmail = (email: string) => {
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'A valid email address is required.'
    })
  }
}

const buildApplication = (
  body: Record<string, unknown>
): ApplicationDetails => {
  const type = body.type
  if (type !== 'rental' && type !== 'driver') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Application type must be rental or driver.'
    })
  }

  const isRental = type === 'rental'
  const name = readField(body, isRental ? 'contactName' : 'fullName', {
    required: true,
    maxLength: 150
  })
  const email = readField(body, 'email', { required: true, maxLength: 254 })
  validateEmail(email)

  const phone = readField(body, 'phone', { required: true, maxLength: 50 })
  const fields: Array<[string, string]> = isRental
    ? [
        ['Company', readField(body, 'company', { required: true, maxLength: 200 })],
        ['Contact name', name],
        ['Email', email],
        ['Phone', phone],
        ['Delivery platform', readField(body, 'platform') || 'Not provided'],
        [
          'Operating location',
          readField(body, 'location', { required: true, maxLength: 200 })
        ],
        ['Preferred start date', readField(body, 'startDate', { maxLength: 30 }) || 'Not provided'],
        ['Additional details', readField(body, 'notes', { maxLength: 3000 }) || 'None']
      ]
    : [
        ['Full name', name],
        ['Email', email],
        ['Phone', phone],
        ['Location', readField(body, 'location', { required: true, maxLength: 200 })],
        ['Driving licence details', readField(body, 'licence') || 'Not provided'],
        ['Driving experience', readField(body, 'experience') || 'Not provided'],
        ['Availability', readField(body, 'availability') || 'Not provided'],
        ['Additional details', readField(body, 'notes', { maxLength: 3000 }) || 'None']
      ]

  return { type, name, email, phone, fields }
}

export default defineEventHandler(async (event) => {
  const body: unknown = await readBody(event)
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'A valid application is required.'
    })
  }

  const application = buildApplication(body as Record<string, unknown>)
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 465)
  const user = process.env.SMTP_USER
  const password = process.env.SMTP_PASSWORD

  if (!host || !user || !password || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Email service is not configured.'
    })
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass: password }
  })

  const recipient = 'van@feroferto.gr'
  const kind = application.type === 'rental' ? 'Van rental enquiry' : 'Van driver application'
  const subjectName = application.name.replace(/[\r\n]+/g, ' ').slice(0, 150)
  const enquiryText = [
    kind,
    '',
    ...application.fields.map(([label, value]) => `${label}: ${value}`)
  ].join('\n')
  const confirmationText = [
    `Hello ${application.name},`,
    '',
    `Thanks for your ${application.type === 'rental' ? 'van rental enquiry' : 'driver application'} with FeroFerto.`,
    'We’ve received your message, and the relevant contact person will be in touch with you soon.',
    '',
    'If you have any questions in the meantime, reply to this email.',
    '',
    'The FeroFerto team'
  ].join('\n')

  try {
    await transporter.sendMail({
      from: user,
      to: recipient,
      replyTo: application.email,
      subject: `${kind} — ${subjectName}`,
      text: enquiryText
    })
    await transporter.sendMail({
      from: user,
      to: application.email,
      subject: `We received your ${application.type === 'rental' ? 'van rental enquiry' : 'driver application'}`,
      text: confirmationText
    })
  } catch (error) {
    console.error(
      'Van application email delivery failed:',
      error instanceof Error ? error.message : 'Unknown SMTP error'
    )
    throw createError({
      statusCode: 502,
      statusMessage: 'Unable to deliver the application email.'
    })
  }

  return { ok: true }
})
