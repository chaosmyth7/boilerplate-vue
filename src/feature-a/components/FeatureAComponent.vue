<script setup lang="ts">
import FormField from '@/shared/components/FormField.vue'
import { useForm } from '@tanstack/vue-form'
import { z as ZodValidation } from 'zod'

const userSchema = ZodValidation.object({
  firstName: ZodValidation.string()
    .min(3, '[Zod] You must have a length of at least 3')
    .refine((val) => val.startsWith('A'), "[Zod] First name must start with 'A'"),
  lastName: ZodValidation.string().min(3, '[Zod] You must have a length of at least 3'),
})

const form = useForm({
  defaultValues: {
    firstName: '',
    lastName: '',
  },
  onSubmit: async ({ value }) => {
    alert(JSON.stringify(value))
  },
})
</script>

<template>
  <form @submit.prevent.stop="form.handleSubmit">
    <FormField :form="form" name="firstName" label="First Name" :rules="userSchema.shape.firstName">
      <template #default="{ field, fieldId }">
        <input
          :id="fieldId"
          :value="field.state.value"
          @input="(e) => field.handleChange((e.target as HTMLInputElement).value)"
          @blur="field.handleBlur"
          type="text"
          class="border border-black p-2 rounded"
        />
      </template>
    </FormField>

    <FormField :form="form" name="lastName" label="Last Name" :rules="userSchema.shape.lastName">
      <template #default="{ field, fieldId }">
        <input
          :id="fieldId"
          :value="field.state.value"
          @input="(e) => field.handleChange((e.target as HTMLInputElement).value)"
          @blur="field.handleBlur"
          type="text"
          autocomplete="family-name"
          class="border border-black p-2 rounded"
        />
      </template>
    </FormField>

    <form.Subscribe>
      <template v-slot="{ isSubmitting, canSubmit }">
        <div class="mt-4">
          <p>Can submit: {{ canSubmit }}</p>
          <button
            class="p-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
            type="submit"
            :disabled="!canSubmit || isSubmitting"
          >
            {{ isSubmitting ? '...' : 'Submit' }}
          </button>
        </div>
      </template>
    </form.Subscribe>
  </form>
</template>
