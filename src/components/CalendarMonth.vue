<template>
  <q-page style='min-height: 100vh'>
    <div class='q-pa-md q-gutter-sm'>
      <q-btn label='Today' @click='onToday'></q-btn>
      <q-btn label='Prev' @click='onPrev'></q-btn>
      <q-btn label='Next' @click='onNext'></q-btn>
    </div>
    <div class='q-pa-md full-width' style='height: 400px'>
      <q-calendar-month
        ref='calendar'
        v-model='selectedDate'
        :day-min-height='70'
        focusable hoverable
        bordered
        @change='onChange'
        @moved='onMoved'
        @click-date='onClickDate'
        @click-day='onClickDay'
        @click-head-day='onClickHeadDay'/>
    </div>
  </q-page>
</template>

<script setup>
import QCalendarMonth from '@quasar/quasar-ui-qcalendar/dist/QCalendarMonth.esm.js'
import { ref } from 'vue'

const { today } = QCalendarMonth
const selectedDate = ref(today())
const calendar = ref(null)
const startDate = ref(today())
const endDate = ref(today())

function onMoved(data) {
  console.log('onMoved', data)
}

function onChange(data) {
  startDate.value = data.start
  endDate.value = data.end
}

function onClickDate(data) {
  console.log('onClickDate', data)
}

function onClickDay(data) {
  console.log('onClickDay', data)
}

function onClickHeadDay(data) {
  console.log('onClickHeadDay', data)
}

function onToday() {
  selectedDate.value = today()
}

function onPrev() {
  calendar.value.prev()
}

function onNext() {
  calendar.value.next()
}


</script>
