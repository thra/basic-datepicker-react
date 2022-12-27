import './Datepicker.scss'
import React, {Dispatch, SetStateAction} from 'react'
import {useEffect, useRef, useState} from 'react'

type DateValue = string | number | Date


/**
 * Returns a formatted string of a date object 'mm/dd/yyyy' in function of locales in param
 * @param {String} locales BCP 47 see: https://fr.wiktionary.org/wiki/Wiktionnaire:BCP_47/language-2 example 'fr' or 'en-US'
 * @param {Date} dateObject example: new Date('01/01/2020')
 * @returns {String} 'mm/dd/yyyy' by default
 */
const dateFormat = (locales = 'en', dateObject = new Date()) =>
    new Intl.DateTimeFormat(locales, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(dateObject)

/**
 * Fill and returns years array from 100 year before current year
 * @returns {Array} [1922, 1923,...]
 */
const years = Array(150)
    .fill(undefined)
    .map((v = new Date().getFullYear() - 100, index) => v + index)

/**
 * Returns array of a week days starting to Sunday in function of locales param for translation
 * @param {String} locales BCP 47 see https://fr.wiktionary.org/wiki/Wiktionnaire:BCP_47/language-2 example 'fr' or 'en-US'
 * @returns {Array} array of string example for 'en' param : ['Sunday', Monday',...]
 */
const weekDays = (locales = 'en') => {
    const startDate = new Date(1898, 11, 31)
    const array = []
    for (let i = 0; i < 7; i++) {
        array.push(
            new Date(startDate.setDate(startDate.getDate() + 1)).toLocaleString(
                locales,
                {weekday: 'long'}
            )
        )
    }
    return array
}

/**
 * Returns array of month name starting to January in function of locales param for translation
 * @param {String} locales BCP 47 see https://fr.wiktionary.org/wiki/Wiktionnaire:BCP_47/language-2 example 'fr' or 'en-US'
 * @returns {Array} array of string example for 'en' param: ['January', 'February',...]
 */
const months = (locales = 'en') => {
    const startDate = new Date(1898, 11, 1)
    const array = []
    for (let i = 0; i < 12; i++) {
        array.push(
            new Date(startDate.setMonth(startDate.getMonth() + 1)).toLocaleString(
                locales,
                {month: 'long'}
            )
        )
    }
    return array
}

/**
 * By default init days calendar in function of current date
 * @returns {Array} Array of String Date format 'mm/dd/yyyy' example ['09/01/2020', '09/02/2020',...]
 */
const handleSetDays = (value = new Date()) => {
    const days = Array(42)
    const firstDay = new Date(value.setDate(1))

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


type DatepickerProps = {
    locale?: string,
    theme?: string,
    setInputValue: Dispatch<SetStateAction<string>> | ((value: Date | string | number, name?: string) => void),
    RHFinputName?: string,
    currentSelectedValue?: string,
    disableFuture?: boolean,
    hide: () => void
}


const Datepicker = ({
                        locale = 'en',
                        theme = 'light',
                        setInputValue,
                        RHFinputName,
                        currentSelectedValue,
                        disableFuture,
                        hide
                    }: DatepickerProps) => {
    const [days, setDays] = useState(handleSetDays())
    const [month, setMonth] = useState<number>(new Date().getMonth())
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = ref.current
        theme === 'dark' ? el?.setAttribute('theme', 'dark') : el?.setAttribute('theme', 'light')
    }, [theme])

    // Update all states (month, year and days)
    const updateDapickerUI = (value: DateValue) => {
        const date = new Date(value)
        setMonth(date.getMonth())
        setYear(date.getFullYear())
        setDays(handleSetDays(new Date(date.getFullYear(), date.getMonth(), 1)))
    }

    const handleSelectedDate = (value: DateValue): void => {
        // update selectedDate if value is a correct string for Date Object and also included in years range
        const date = new Date(value)
        if (
            date.toString() !== 'Invalid Date' &&
            years.includes(date.getFullYear())
        ) {
            updateDapickerUI(date)

            // callback => Name if using with react-hook-form-library
            setInputValue(dateFormat(locale, new Date(date)), RHFinputName)
        }
        hide()
    }

    const handleMonthSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setMonth(parseInt(e.target.value))
        updateDapickerUI(new Date(year, parseInt(e.target.value, 10), 1))
    }

    const handleYearSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value)
        setYear(value)
        updateDapickerUI(new Date(value, month, 1))
    }

    const handlePreviousMonth = () => {
        const date = new Date(year, month, 1)
        setMonth(new Date(date.setMonth(date.getMonth() - 1)).getMonth())
        setYear(date.getFullYear())
        setDays(handleSetDays(date))
    }
    const handleNextMonth = () => {
        const date = new Date(year, month, 1)
        setMonth(new Date(date.setMonth(date.getMonth() + 1)).getMonth())
        setYear(date.getFullYear())
        setDays(handleSetDays(date))
    }

    // onclickoutside : https://blog.logrocket.com/detect-click-outside-react-component-how-to/

    useEffect(() => {
        const handleClickOutSide = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                hide()
            }
        }
        document.addEventListener('click', handleClickOutSide, true)
        return () => {
            document.removeEventListener('click', handleClickOutSide, true)
        }
    }, [hide])

    const isSelectedDate = (value: DateValue) => {
        const dateToCheck = currentSelectedValue || dateFormat()
        return dateToCheck === value
    }

    const isToday = (value: DateValue) => {
        const dateToCheck = dateFormat()
        return dateToCheck === value
    }


    const computeDayClassName = (index: number, value: DateValue): string => {
        let className = 'week-day'
        const day = new Date(value).getDate()
        const allDays: Date = new Date(value)

        const isAfterToday = (): boolean => allDays.getTime() > Date.now()

        if ((index < 7 && day > 7) || (index > 27 && day < 14)) {
            className += ' other-month'
        }

        if (isSelectedDate(value)) {
            className += ' selected'
        }

        if (isToday(value)) {
            className += ' today'
        }

        if (disableFuture) {
            if (isAfterToday()) className += ' disabledDay'
        }

        return className
    }


    return (
        <div>
            <section ref={ref} className='custom-date-picker-calendar'>
                <nav className='calendar-header'>
                    <div
                        className='calendar-header-menu calendar-header-menu-button'
                        onClick={handlePreviousMonth}>
                        &laquo;
                    </div>
                    <select
                        className='calendar-header-menu'
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
                        className='calendar-header-menu'
                        value={year}
                        onChange={handleYearSelect}
                    >
                        {years.map((item) => (
                            <option key={item}>{item}</option>
                        ))}
                    </select>
                    <div
                        className='calendar-header-menu calendar-header-menu-button'
                        onClick={handleNextMonth}
                    >
                        &raquo;
                    </div>
                </nav>
                <section className='custom-date-picker-calendar-days'>
                    <div className='week-days-header'>
                        {weekDays().map((weekDay, index) => (
                            <div key={`week-day-${index}`} className='week-day-name'>
                                {weekDay.charAt(0).toUpperCase() +
                                    weekDay.substring(0, 2).slice(1)}
                            </div>
                        ))}
                    </div>
                    <div className='week-days'>
                        {days.map((value, index) => (
                            <div
                                key={`day-${index}`}
                                className={computeDayClassName(index, value)}
                                onClick={() => handleSelectedDate(value)}
                            >
                                {new Date(value).getDate()}
                            </div>
                        ))}
                    </div>
                </section>
            </section>
        </div>
    )
}

export default Datepicker
