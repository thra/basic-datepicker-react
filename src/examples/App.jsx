import { useState } from 'react'
import { Datepicker } from '../lib'

const App = () => {
  const [dateOfBirth, setDateOfBirth] = useState('')
  const handleDateOfBirthInput = (date) => {
    console.log('onChange', dateOfBirth, date)
    setDateOfBirth(date)
  }

  return (
    <section>
      <label htmlFor="date-of-birth">Date of Birth</label>
      <Datepicker
        id="date-of-birth"
        onChange={handleDateOfBirthInput}
        selected={dateOfBirth}
        required
      />
    </section>
  )
}

export default App
