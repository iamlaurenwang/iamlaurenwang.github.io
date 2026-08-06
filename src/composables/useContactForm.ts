import { reactive, ref } from 'vue'

export interface ContactFormFields {
  name: string
  email: string
  message: string
}

type ContactFormErrors = Partial<Record<keyof ContactFormFields, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnpaqwbo'

export function useContactForm() {
  const fields = reactive<ContactFormFields>({ name: '', email: '', message: '' })
  const errors = reactive<ContactFormErrors>({})
  const isSubmitted = ref(false)
  const isLoading = ref(false)
  const submitError = ref<string | null>(null)

  function validate(): boolean {
    errors.name = fields.name.trim() ? undefined : 'Please tell me your name.'
    errors.email = EMAIL_PATTERN.test(fields.email.trim())
      ? undefined
      : 'Please enter a valid email.'
    errors.message = fields.message.trim() ? undefined : 'A short message helps me help you.'
    return !errors.name && !errors.email && !errors.message
  }

  async function submit(): Promise<void> {
    if (!validate()) return
    isLoading.value = true
    submitError.value = null
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: fields.name, email: fields.email, message: fields.message }),
      })
      if (res.ok) {
        isSubmitted.value = true
      } else {
        submitError.value = 'Something went wrong. Please try again or reach out directly.'
      }
    } catch {
      submitError.value = 'Network error. Please check your connection and try again.'
    } finally {
      isLoading.value = false
    }
  }

  function reset(): void {
    fields.name = ''
    fields.email = ''
    fields.message = ''
    errors.name = undefined
    errors.email = undefined
    errors.message = undefined
    isSubmitted.value = false
    isLoading.value = false
    submitError.value = null
  }

  return { fields, errors, isSubmitted, isLoading, submitError, submit, reset }
}
