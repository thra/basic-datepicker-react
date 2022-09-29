import { createSlice } from '@reduxjs/toolkit'
import { years, dateFormat } from './properties'

/**
 * By default init days calendar in function of current date
 * @returns {Array} Array of String Date format 'mm/dd/yyyy' example ['09/01/2020', '09/02/2020',...]
 */
const initDays = () => {
  const days = Array(42)
  const firstDay = new Date(new Date().setDate(1))

  // handle first Week
  // complete start of the first week from first day of the month
  for (let i = 0; i <= firstDay.getDay(); i++) {
    const yesterday = new Date(
      new Date(firstDay).setDate(firstDay.getDate() - i)
    )
    days[firstDay.getDay() - i] = dateFormat('en', yesterday)
  }
  // complete remainder of the days
  for (let i = firstDay.getDay() + 1; i < days.length; i++) {
    const tomorrow = new Date(firstDay.setDate(firstDay.getDate() + 1))
    days[i] = dateFormat('en', tomorrow)
  }
  return days
}

const handleSetDays = (state, value) => {
  const firstDay = new Date(new Date(value).setDate(1))

  // handle first Week
  // complete start of the first week from first day of the month
  for (let i = 0; i <= firstDay.getDay(); i++) {
    const yesterday = new Date(
      new Date(firstDay).setDate(firstDay.getDate() - i)
    )
    state.days[firstDay.getDay() - i] = dateFormat(
      state.options.language,
      yesterday
    )
  }
  // complete remainder of the days
  for (let i = firstDay.getDay() + 1; i < state.days.length; i++) {
    const tomorrow = new Date(firstDay.setDate(firstDay.getDate() + 1))
    state.days[i] = dateFormat(state.options.language, tomorrow)
  }
}

const datePickerSlice = createSlice({
  name: 'datePicker',
  initialState: {
    options: { language: 'en', format: 'mm/dd/yyyy' },
    days: initDays(),
    selectedDate: '',
    isDisplayed: false,
    nav: { month: new Date().getMonth(), year: new Date().getFullYear() },
  },
  reducers: {
    setOptions: (state, action) => {
      state.options = action.payload
    },
    setDays: (state, action) => {
      handleSetDays(state, action.payload)
    },
    setSelectedDate: (state, action) => {
      state.isDisplayed = false
      // update selecteDate if action.payload.value is a correct string for Date Object and also included in years range
      const date = new Date(action.payload.value)
      if (
        date.toString() !== 'Invalid Date' &&
        years.includes(date.getFullYear())
      ) {
        state.selectedDate = dateFormat(state.options.language, new Date(date))
        // update month, year and days
        state.nav.month = date.getMonth()
        state.nav.year = date.getFullYear()
        handleSetDays(state, new Date(state.nav.year, state.nav.month, 1))
      }
      // callback
      action.payload.cb(state.selectedDate)
    },
    setIsDisplayed: (state, action) => {
      state.isDisplayed = action.payload
    },
    setNavMonth: (state, action) => {
      state.nav.month = action.payload
      handleSetDays(state, new Date(state.nav.year, action.payload, 1))
    },
    setNavYear: (state, action) => {
      state.nav.year = action.payload
      handleSetDays(state, new Date(action.payload, state.nav.month, 1))
    },
    incrementMonth: (state) => {
      const date = new Date(state.nav.year, state.nav.month, 1)
      state.nav.month = new Date(date.setMonth(date.getMonth() + 1)).getMonth()
      state.nav.year = date.getFullYear()
      handleSetDays(state, date)
    },
    decrementMonth: (state) => {
      const date = new Date(state.nav.year, state.nav.month, 1)
      state.nav.month = new Date(date.setMonth(date.getMonth() - 1)).getMonth()
      state.nav.year = date.getFullYear()
      handleSetDays(state, date)
    },
  },
})

export const {
  setOptions,
  setDays,
  setSelectedDate,
  setIsDisplayed,
  incrementMonth,
  decrementMonth,
  setNavMonth,
  setNavYear,
} = datePickerSlice.actions

export default datePickerSlice.reducer

export const selectOptions = (state) => state.datePicker.options
export const selectDays = (state) => state.datePicker.days
export const selectSelectedDate = (state) => state.datePicker.selectedDate
export const selectIsDisplayed = (state) => state.datePicker.isDisplayed
export const selectNavMonth = (state) => state.datePicker.nav.month
export const selectNavYear = (state) => state.datePicker.nav.year
