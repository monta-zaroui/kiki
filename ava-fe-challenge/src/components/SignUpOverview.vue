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
            <BaseInput label="Username" type="text" placeholder="karim7" />
            <BaseInput label="Email" type="text" placeholder="karim@example.com" />
            <BaseInput label="Password" type="password" placeholder="••••••••" />
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

const signUp = () => {
  console.log('sign up');
};
</script>

<style scoped></style>
