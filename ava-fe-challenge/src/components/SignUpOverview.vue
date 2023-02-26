<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <BaseLogo />
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create a new account
          </h1>
          <div class="space-y-4 md:space-y-6">
            <BaseInput v-model="state.username" label="Username" type="text" placeholder="karim7" />
            <p class="text-red-500 text-sm italic" v-if="v$.username.$error">{{ v$.username.$errors[0].$message }}</p>
            <BaseInput v-model="state.email" label="Email" type="text" placeholder="karim@example.com" />
            <p class="text-red-500 text-sm italic" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</p>
            <BaseInput v-model="state.password" label="Password" type="password" placeholder="••••••••" />
            <p class="text-red-500 text-sm italic" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</p>
            <BaseInput
              v-model="state.confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
            />
            <p class="text-red-500 text-sm italic" v-if="v$.confirmPassword.$error">
              {{ v$.confirmPassword.$errors[0].$message }}
            </p>
            <BaseButton text="Sign Up" @handleClick="signUp" />
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              You have an account already?
              <RouterLink to="/signIn" class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Sign in</RouterLink
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseLogo from '@/components/base/BaseLogo.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import { computed, reactive } from 'vue';
import { email, helpers, minLength, required } from '@vuelidate/validators';
import useValidate from '@vuelidate/core';
import { useAuthStore } from '@/stores/auth';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

const router = useRouter();

const state = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const rules = computed(() => ({
  username: { required: helpers.withMessage('This field cannot be empty', required) },
  email: {
    required: helpers.withMessage('This field cannot be empty', required),
    email: helpers.withMessage('This field must be a valid email', email)
  },
  password: { required: helpers.withMessage('This field cannot be empty', required), minLength: minLength(6) },
  confirmPassword: {
    required: helpers.withMessage('This field cannot be empty', required),
    sameAsPassword: helpers.withMessage('Passwords do not match', (value) => value === state.password)
  }
}));

const v$ = useValidate(rules, state);

const signUp = async () => {
  const validate = await v$.value.$validate();
  if (validate) {
    const authStore = useAuthStore();
    const signIn = await authStore.signUp(state.username, state.email, state.password);
    if (signIn) {
      toast('Welcome 🍻 !', { type: 'success' });
      await router.push('/');
    } else {
      toast(authStore.error?.response?.data + '😢 !', { type: 'error' });
    }
  }
};
</script>

<style scoped></style>
