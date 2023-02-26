<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <BaseLogo />
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <div class="space-y-4 md:space-y-6">
            <BaseInput v-model="state.email" label="Email" type="text" placeholder="karim@example.com" />
            <p class="text-red-500 text-sm italic" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</p>
            <BaseInput v-model="state.password" label="Password" type="password" placeholder="••••••••" />
            <p class="text-red-500 text-sm italic" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</p>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                </div>
              </div>
            </div>
            <BaseButton text="Sign In" @handleClick="signIn" />
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <RouterLink to="/signUp" class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Sign up</RouterLink
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
import useValidate from '@vuelidate/core';
import { computed, reactive } from 'vue';
import { email, helpers, minLength, required } from '@vuelidate/validators';

const state = reactive({
  email: '',
  password: ''
});

const rules = computed(() => ({
  email: {
    required: helpers.withMessage('This field cannot be empty', required),
    email: helpers.withMessage('This field must be a valid email', email)
  },
  password: { required: helpers.withMessage('This field cannot be empty', required), minLength: minLength(6) }
}));

const v$ = useValidate(rules, state);

const signIn = async () => {
  const validate = await v$.value.$validate();
  if (validate) {
    console.log('valid form');
  }
};
</script>

<style scoped></style>
