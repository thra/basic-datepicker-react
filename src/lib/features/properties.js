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
  .fill()
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
        { weekday: 'long' }
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
        { month: 'long' }
      )
    )
  }
  return array
}

export { years, weekDays, months, dateFormat }
