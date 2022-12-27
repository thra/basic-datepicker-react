'use strict';

var React = require('react');

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "[theme=light] {\n  --BG-COLOR: #FFFEFC;\n  --FONT-COLOR-strong: #262627;\n  --FONT-COLOR-light: #616060;\n  --FONT-COLOR-otherMonth: #616161;\n  --FONT-COLOR-disabled: #9E9E9E;\n  --SELECTED-COLOR-default: #FFFEFC;\n  --SELECTED-COLOR-hover: #CCC;\n}\n\n[theme=dark] {\n  --SELECTED-COLOR-hover: #3A3A3A;\n  --SELECTED-COLOR-default: rgb(38, 38, 39);\n  --BG-COLOR: #262627;\n  --FONT-COLOR-strong: #FFFEFC;\n  --FONT-COLOR-otherMonth: #6A6A6A;\n  --FONT-COLOR-light: #BCBCBC;\n  --FONT-COLOR-disabled: #373737;\n}\n\n.custom-date-picker-calendar {\n  position: absolute;\n  z-index: 100;\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  width: 264px;\n  margin: 8px auto;\n  padding: 16px 16px;\n  border-radius: 8px;\n  background-color: var(--BG-COLOR);\n  box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.2);\n}\n.custom-date-picker-calendar .calendar-header {\n  display: flex;\n  justify-content: space-between;\n}\n.custom-date-picker-calendar .calendar-header > select {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 14px;\n  font-weight: bolder;\n  color: var(--FONT-COLOR-strong);\n  border: none;\n  background-color: var(--BG-COLOR);\n}\n.custom-date-picker-calendar .calendar-header > select:focus {\n  outline: none;\n}\n.custom-date-picker-calendar .calendar-header .calendar-header-menu {\n  cursor: pointer;\n}\n.custom-date-picker-calendar .calendar-header .calendar-header-menu-button {\n  font-size: 18px;\n  padding-right: 5px;\n  padding-bottom: 2px;\n  padding-left: 4px;\n  color: var(--FONT-COLOR-strong);\n  border: none;\n}\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days-header {\n  display: grid;\n  padding: 12px 0 6px 0;\n  gap: 0 4px;\n  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;\n  grid-auto-rows: 1fr;\n  grid-template-areas: \". . . . . . . \";\n}\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days-header > .week-day-name {\n  font-size: 12px;\n  font-weight: bolder;\n}\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days {\n  display: grid;\n  flex-wrap: wrap;\n  padding-bottom: 12px;\n  gap: 4px 4px;\n  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;\n  grid-auto-rows: 1fr 1fr 1fr 1fr 1fr;\n  grid-template-areas: \". . . . . . . \" \". . . . . . . \" \". . . . . . . \" \". . . . . . . \" \". . . . . . . \";\n}\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days .week-day-name,\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days-header .week-day-name {\n  margin: auto;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  padding: 4px;\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 14px;\n  cursor: default;\n  color: var(--FONT-COLOR-light);\n}\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days .week-day,\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days-header .week-day {\n  margin: auto;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  padding: 4px;\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 12px;\n  cursor: pointer;\n  color: var(--FONT-COLOR-strong);\n}\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days .week-day:hover,\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days-header .week-day:hover {\n  cursor: pointer;\n  color: white;\n  background-color: var(--SELECTED-COLOR-hover);\n}\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days .week-day.selected,\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days-header .week-day.selected {\n  color: var(--FONT-COLOR-strong);\n  outline: 1px solid var(--FONT-COLOR-strong);\n  background-color: var(--SELECTED-COLOR-default);\n}\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days .week-day.selected:hover,\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days-header .week-day.selected:hover {\n  cursor: inherit;\n}\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days .week-day.selected.today,\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days-header .week-day.selected.today {\n  color: var(--FONT-COLOR-strong);\n  background-color: var(--SELECTED-COLOR-default);\n}\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days .week-day.selected.today:hover,\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days-header .week-day.selected.today:hover {\n  cursor: pointer;\n}\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days .week-day.today,\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days-header .week-day.today {\n  font-weight: bolder;\n  color: var(--FONT-COLOR-strong);\n  background-color: var(--SELECTED-COLOR-hover);\n}\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days .week-day.today:hover,\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days-header .week-day.today:hover {\n  background-color: var(--SELECTED-COLOR-hover);\n}\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days .week-day.disabledDay,\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days-header .week-day.disabledDay {\n  cursor: inherit;\n  pointer-events: none;\n  color: var(--FONT-COLOR-disabled);\n}\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days .week-day.disabledDay:hover,\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days-header .week-day.disabledDay:hover {\n  color: var(--FONT-COLOR-disabled);\n  background-color: transparent;\n}\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days .other-month,\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days-header .other-month {\n  cursor: default;\n  color: var(--FONT-COLOR-otherMonth);\n}\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days .other-month.disabledDay,\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days-header .other-month.disabledDay {\n  cursor: inherit;\n  pointer-events: none;\n  color: var(--FONT-COLOR-disabled) !important;\n}\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days .other-month.disabledDay:hover,\n.custom-date-picker-calendar .custom-date-picker-calendar-days .week-days-header .other-month.disabledDay:hover {\n  color: var(--FONT-COLOR-disabled);\n  background-color: transparent;\n}";
styleInject(css_248z);

/**
 * Returns a formatted string of a date object 'mm/dd/yyyy' in function of locales in param
 * @param {String} locales BCP 47 see: https://fr.wiktionary.org/wiki/Wiktionnaire:BCP_47/language-2 example 'fr' or 'en-US'
 * @param {Date} dateObject example: new Date('01/01/2020')
 * @returns {String} 'mm/dd/yyyy' by default
 */
const dateFormat = (locales = 'en', dateObject = new Date()) => new Intl.DateTimeFormat(locales, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
}).format(dateObject);
/**
 * Fill and returns years array from 100 year before current year
 * @returns {Array} [1922, 1923,...]
 */
const years = Array(150)
    .fill(undefined)
    .map((v = new Date().getFullYear() - 100, index) => v + index);
/**
 * Returns array of a week days starting to Sunday in function of locales param for translation
 * @param {String} locales BCP 47 see https://fr.wiktionary.org/wiki/Wiktionnaire:BCP_47/language-2 example 'fr' or 'en-US'
 * @returns {Array} array of string example for 'en' param : ['Sunday', Monday',...]
 */
const weekDays = (locales = 'en') => {
    const startDate = new Date(1898, 11, 31);
    const array = [];
    for (let i = 0; i < 7; i++) {
        array.push(new Date(startDate.setDate(startDate.getDate() + 1)).toLocaleString(locales, { weekday: 'long' }));
    }
    return array;
};
/**
 * Returns array of month name starting to January in function of locales param for translation
 * @param {String} locales BCP 47 see https://fr.wiktionary.org/wiki/Wiktionnaire:BCP_47/language-2 example 'fr' or 'en-US'
 * @returns {Array} array of string example for 'en' param: ['January', 'February',...]
 */
const months = (locales = 'en') => {
    const startDate = new Date(1898, 11, 1);
    const array = [];
    for (let i = 0; i < 12; i++) {
        array.push(new Date(startDate.setMonth(startDate.getMonth() + 1)).toLocaleString(locales, { month: 'long' }));
    }
    return array;
};
/**
 * By default init days calendar in function of current date
 * @returns {Array} Array of String Date format 'mm/dd/yyyy' example ['09/01/2020', '09/02/2020',...]
 */
const handleSetDays = (value = new Date()) => {
    const days = Array(42);
    const firstDay = new Date(value.setDate(1));
    // handle first Week
    // complete start of the first week from first day of the month
    for (let i = 0; i <= firstDay.getDay(); i++) {
        const yesterday = new Date(new Date(firstDay).setDate(firstDay.getDate() - i));
        days[firstDay.getDay() - i] = dateFormat('en', yesterday);
    }
    // complete remainder of the days
    for (let i = firstDay.getDay() + 1; i < days.length; i++) {
        const tomorrow = new Date(firstDay.setDate(firstDay.getDate() + 1));
        days[i] = dateFormat('en', tomorrow);
    }
    return days;
};
const Datepicker = ({ locale = 'en', theme = 'light', setInputValue, RHFinputName, currentSelectedValue, disableFuture, hide }) => {
    const [days, setDays] = React.useState(handleSetDays());
    const [month, setMonth] = React.useState(new Date().getMonth());
    const [year, setYear] = React.useState(new Date().getFullYear());
    const ref = React.useRef(null);
    React.useEffect(() => {
        const el = ref.current;
        theme === 'dark' ? el === null || el === void 0 ? void 0 : el.setAttribute('theme', 'dark') : el === null || el === void 0 ? void 0 : el.setAttribute('theme', 'light');
    }, [theme]);
    // Update all states (month, year and days)
    const updateDapickerUI = (value) => {
        const date = new Date(value);
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setDays(handleSetDays(new Date(date.getFullYear(), date.getMonth(), 1)));
    };
    const handleSelectedDate = (value) => {
        // update selectedDate if value is a correct string for Date Object and also included in years range
        const date = new Date(value);
        if (date.toString() !== 'Invalid Date' &&
            years.includes(date.getFullYear())) {
            updateDapickerUI(date);
            // callback => Name if using with react-hook-form-library
            setInputValue(dateFormat(locale, new Date(date)), RHFinputName);
        }
        hide();
    };
    const handleMonthSelect = (e) => {
        setMonth(parseInt(e.target.value));
        updateDapickerUI(new Date(year, parseInt(e.target.value, 10), 1));
    };
    const handleYearSelect = (e) => {
        const value = parseInt(e.target.value);
        setYear(value);
        updateDapickerUI(new Date(value, month, 1));
    };
    const handlePreviousMonth = () => {
        const date = new Date(year, month, 1);
        setMonth(new Date(date.setMonth(date.getMonth() - 1)).getMonth());
        setYear(date.getFullYear());
        setDays(handleSetDays(date));
    };
    const handleNextMonth = () => {
        const date = new Date(year, month, 1);
        setMonth(new Date(date.setMonth(date.getMonth() + 1)).getMonth());
        setYear(date.getFullYear());
        setDays(handleSetDays(date));
    };
    // onclickoutside : https://blog.logrocket.com/detect-click-outside-react-component-how-to/
    React.useEffect(() => {
        const handleClickOutSide = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                hide();
            }
        };
        document.addEventListener('click', handleClickOutSide, true);
        return () => {
            document.removeEventListener('click', handleClickOutSide, true);
        };
    }, [hide]);
    const isSelectedDate = (value) => {
        const dateToCheck = currentSelectedValue || dateFormat();
        return dateToCheck === value;
    };
    const isToday = (value) => {
        const dateToCheck = dateFormat();
        return dateToCheck === value;
    };
    const computeDayClassName = (index, value) => {
        let className = 'week-day';
        const day = new Date(value).getDate();
        const allDays = new Date(value);
        const isAfterToday = () => allDays.getTime() > Date.now();
        if ((index < 7 && day > 7) || (index > 27 && day < 14)) {
            className += ' other-month';
        }
        if (isSelectedDate(value)) {
            className += ' selected';
        }
        if (isToday(value)) {
            className += ' today';
        }
        if (disableFuture) {
            if (isAfterToday())
                className += ' disabledDay';
        }
        return className;
    };
    return (React.createElement("div", null,
        React.createElement("section", { ref: ref, className: 'custom-date-picker-calendar' },
            React.createElement("nav", { className: 'calendar-header' },
                React.createElement("div", { className: 'calendar-header-menu calendar-header-menu-button', onClick: handlePreviousMonth }, "\u00AB"),
                React.createElement("select", { className: 'calendar-header-menu', value: month, onChange: handleMonthSelect }, months().map((item, index) => (React.createElement("option", { key: item, value: index }, item)))),
                React.createElement("select", { className: 'calendar-header-menu', value: year, onChange: handleYearSelect }, years.map((item) => (React.createElement("option", { key: item }, item)))),
                React.createElement("div", { className: 'calendar-header-menu calendar-header-menu-button', onClick: handleNextMonth }, "\u00BB")),
            React.createElement("section", { className: 'custom-date-picker-calendar-days' },
                React.createElement("div", { className: 'week-days-header' }, weekDays().map((weekDay, index) => (React.createElement("div", { key: `week-day-${index}`, className: 'week-day-name' }, weekDay.charAt(0).toUpperCase() +
                    weekDay.substring(0, 2).slice(1))))),
                React.createElement("div", { className: 'week-days' }, days.map((value, index) => (React.createElement("div", { key: `day-${index}`, className: computeDayClassName(index, value), onClick: () => handleSelectedDate(value) }, new Date(value).getDate()))))))));
};

exports.Datepicker = Datepicker;
//# sourceMappingURL=index.js.map
