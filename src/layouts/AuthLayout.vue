<template>
  <q-layout view="hHh lpR fFf" class="liquid-cheese">
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card
          class="bg-white rounded-lg max-h-full max-w-md py-8 px-4 text-grey-9 sm:px-6 md:p-8"
        >
          <q-card-section>
            <h1 class="font-bold mx-auto text-center mb-4 text-4xl">
              LRS Dashboard
            </h1>
          </q-card-section>
          <q-card-section>
            <router-view />
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
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
