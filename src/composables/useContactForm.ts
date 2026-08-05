import { reactive, ref } from 'vue'

export interface ContactFormFields {
  name: string
  email: string
  message: string
}

type ContactFormErrors = Partial<Record<keyof ContactFormFields, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Front-end only contact form state. Validates locally and surfaces a
 * "submitted" state, but intentionally does NOT send anything to a backend.
 */
export function useContactForm() {
  const fields = reactive<ContactFormFields>({ name: '', email: '', message: '' })
  const errors = reactive<ContactFormErrors>({})
  const isSubmitted = ref<boolean>(false)

  function validate(): boolean {
    errors.name = fields.name.trim() ? undefined : 'Please tell me your name.'
    errors.email = EMAIL_PATTERN.test(fields.email.trim())
      ? undefined
      : 'Please enter a valid email.'
    errors.message = fields.message.trim() ? undefined : 'A short message helps me help you.'
    return !errors.name && !errors.email && !errors.message
  }

  function submit(): void {
    if (!validate()) return
    // No network request by design — this is a visual/interactive placeholder.
    isSubmitted.value = true
  }

  function reset(): void {
    fields.name = ''
    fields.email = ''
    fields.message = ''
    errors.name = undefined
    errors.email = undefined
    errors.message = undefined
    isSubmitted.value = false
  }

  return { fields, errors, isSubmitted, submit, reset }
}
