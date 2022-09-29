import './Datepicker.scss'
// import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'
import DatepickerHeader from './DatepickerHeader'
import {
  selectSelectedDate,
  selectIsDisplayed,
  setIsDisplayed,
  setSelectedDate,
  selectOptions,
  setOptions,
  selectDays,
} from './datepickerSlice'
// import CalendarDays from './CalendarDays'
import { weekDays, dateFormat } from './properties'

const Datepicker = ({ id, selected, onChange = (data) => {} }) => {
  const dispatch = useDispatch()
  const isDisplayed = useSelector(selectIsDisplayed)
  const selectedDate = useSelector(selectSelectedDate)
  // const options = useSelector(selectOptions)
  const days = useSelector(selectDays)

  // useEffect(() => {
  //   console.log('first time')
  //   dispatch(setOptions({ language: 'en', format: 'mm/dd/yyyy', id: id }))
  // }, [dispatch, id])

  const handleOnChange = (e) => {
    console.log('handleOnChange - selected:', selected)
    dispatch(setSelectedDate({ value: e.target.value, cb: onChange }))
    // onChange(selectedDate)
  }

  // onclickoutside : https://blog.logrocket.com/detect-click-outside-react-component-how-to/
  const ref = useRef(null)
  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(setIsDisplayed(false))
      }
    }
    document.addEventListener('click', handleClickOutSide, true)
    return () => {
      document.removeEventListener('click', handleClickOutSide, true)
    }
  }, [dispatch])

  const isSelectedDate = (value) => {
    const dateToCheck = selectedDate || dateFormat()
    return dateToCheck === value
  }

  const computeDayClassName = (index, value) => {
    let className = 'week-day'
    const day = new Date(value).getDate()

    if ((index < 7 && day > 7) || (index > 27 && day < 14)) {
      className += ' other-month'
    }

    if (isSelectedDate(value)) {
      className += ' selected'
    }

    return className
  }

  const handleSelectedDate = (value) => {
    dispatch(
      setSelectedDate({
        value,
        cb: onChange,
      })
    )
  }

  return (
    <div className="custom-date-picker">
      <input
        type="text"
        onClick={() => dispatch(setIsDisplayed(true))}
        id={id}
        value={selectedDate}
        name={id}
        // onChange={handleSelectedDate}
        onChange={handleOnChange}
      />
      {isDisplayed ? (
        <section ref={ref} className="custom-date-picker-calendar">
          <DatepickerHeader />
          <section className="custom-date-picker-calendar-days">
            <div className="week-days-header">
              {weekDays().map((weekDay, index) => (
                <div key={`week-day-${index}`} className="week-day-name">
                  {weekDay.charAt(0).toUpperCase() +
                    weekDay.substring(0, 3).slice(1)}
                </div>
              ))}
            </div>
            <div className="week-days">
              {days.map((value, index) => (
                <div
                  key={`day-${index}`}
                  className={computeDayClassName(index, value)}
                  onClick={(e) => handleSelectedDate(value)}
                >
                  {new Date(value).getDate()}
                </div>
              ))}
            </div>
          </section>
        </section>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Datepicker
