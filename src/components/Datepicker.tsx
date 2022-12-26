import './Datepicker.scss'
import React from 'react'
import {useEffect, useRef, useState} from 'react'
import {weekDays, dateFormat, years, months, handleSetDays} from './utils'

type DatepickerProps = {
    locale?: string,
    theme?: string,
    setInputValue: (value: Date | string | number, name?: string) => void,
    RHFinputName?: string,
    currentSelectedValue?: string,
    disableFuture?: boolean,
    hide: () => void
}

type DateValue = string | number | Date


const Datepicker = ({
                        locale = 'en',
                        theme = 'light',
                        setInputValue,
                        RHFinputName,
                        currentSelectedValue,
                        disableFuture,
                        hide
                    }: DatepickerProps) => {
    const [days, setDays] = useState<Date[]>(handleSetDays())
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

    const handleYearSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setYear(parseInt(e.target.value))
        updateDapickerUI(new Date(month, parseInt(e.target.value, 10), 1))
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


    const computeDayClassName = (index: number, value: number | Date): string => {
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
                        ＜
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
                        ﹥
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
