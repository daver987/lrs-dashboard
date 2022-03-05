<template>
  <q-layout view="hHh lpR fFf" class="liquid-cheese">
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="bg-white max-w-md text-grey-9 q-pa-md">
          <q-card-section>
            <h1 class="font-bold mx-auto text-center text-4xl">
              LRS Dashboard
            </h1>
          </q-card-section>

          <router-view />
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
