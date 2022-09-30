import './App.scss'
import { useState } from 'react'
import { Datepicker } from '../lib'

const App = () => {
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [startDate, setStartDate] = useState('')
  const [submit, setSubmit] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmit(`
    dateOfBirth:${dateOfBirth}
    startDate:${startDate}`)
  }

  return (
    <section className="container">
      <h1 className="title">Basic Datepicker React</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date-of-birth">Date of Birth</label>
        <Datepicker
          id="date-of-birth"
          onChange={(date) => setDateOfBirth(date)}
          selected={dateOfBirth}
          required
        />
        <label htmlFor="start-date">Start Date</label>
        <Datepicker
          id="start-date"
          onChange={(date) => setStartDate(date)}
          selected={startDate}
          required
        />
        <button>Submit</button>
      </form>
      <pre>{submit}</pre>
    </section>
  )
}

export default App
