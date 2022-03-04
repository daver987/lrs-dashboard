<template>
  <div class="flex h-full min-h-full liquid-cheese items-center">
    <div
      class="rounded-lg mx-auto max-h-full bg-slate-900 py-8 px-4 text-slate-50 sm:px-6 md:p-8 lg:p-12"
    >
      <div class="flex flex-col items-start">
        <h1 class="font-bold mx-auto text-center mb-4 text-4xl">
          LRS Dashboard
        </h1>
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
.liquid-cheese {
  background-color: #0a0e46;
  background-image: url('./assets/background.svg');
  background-attachment: fixed;
  background-size: contain;
  background-position: center;
  /* background by SVGBackgrounds.com */
}
</style>
