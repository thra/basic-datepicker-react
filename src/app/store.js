import { configureStore } from '@reduxjs/toolkit'
import datepickerReducer from '../lib/features/datepickerSlice'

const logMiddleware = (store) => (next) => (action) => {
  // on affiche chaque action dans la console
  console.log(action)
  return next(action)
}

export default configureStore({
  reducer: {
    datePicker: datepickerReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      // exceptions for date Object : https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['datePicker/setDays', 'datePicker/setSelectedDate'],
        // Ignore these paths in the state
        ignoredPaths: ['datePicker.date', 'datePicker.selectedDate'],
      },
    }),
    logMiddleware,
  ],
})
