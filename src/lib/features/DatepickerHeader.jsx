import { useSelector, useDispatch } from 'react-redux'
import {
  selectNavMonth,
  incrementMonth,
  decrementMonth,
  selectNavYear,
  setNavMonth,
  setNavYear,
} from './datepickerSlice'
import { years, months } from './properties'

const DatepickerHeader = () => {
  const dispatch = useDispatch()
  const month = useSelector(selectNavMonth)
  const year = useSelector(selectNavYear)

  const handleMonthSelect = (e) => dispatch(setNavMonth(e.target.value))
  const handleYearSelect = (e) => dispatch(setNavYear(e.target.value))
  const handlePreviousMonth = (e) => dispatch(decrementMonth())
  const handleNextMonth = (e) => dispatch(incrementMonth())

  return (
    <nav className="calendar-header">
      <div
        className="calendar-header-menu calendar-header-menu-button-left"
        onClick={handlePreviousMonth}
      >
        {'<'}
      </div>
      <select
        className="calendar-header-menu"
        value={month}
        onChange={handleMonthSelect}
      >
        {months().map((item, index) => (
          <option key={item} value={index}>
            {item}
          </option>
        ))}
      </select>
      <select
        className="calendar-header-menu"
        value={year}
        onChange={handleYearSelect}
      >
        {years.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <div
        className="calendar-header-menu calendar-header-menu-button-right"
        onClick={handleNextMonth}
      >
        {'>'}
      </div>
    </nav>
  )
}

export default DatepickerHeader
