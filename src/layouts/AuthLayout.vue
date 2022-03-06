<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: '#ffffff',
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000',
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: 'img/github.svg',
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab',
        },
        onclick: {
          enable: true,
          mode: 'push',
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  })
})
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <div id="particles-js" class="dark_gradient"></div>
        <q-card class="bg-white max-w-md min-w-md text-grey-9 q-pa-md">
          <q-card-section>
            <h1 class="text-capitalize mx-auto text-center text-4xl">
              My Dashboard
            </h1>
          </q-card-section>
          <router-view />
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style>
/*.liquid-cheese {*/
/*  background-color: #0a0e46;*/
/*  background-image: url('./assets/background.svg');*/
/*  background-attachment: fixed;*/
/*  background-size: contain;*/
/*  background-position: center;*/
/*  !* background by SVGBackgrounds.com *!*/
/*}*/

#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
.normal-gradient {
  background: linear-gradient(145deg, #13244d 15%, #497df8cb 75%);
}
.dark_gradient {
  background: linear-gradient(145deg, rgb(7, 7, 7) 35%, #8a6100 70%);
}
</style>
