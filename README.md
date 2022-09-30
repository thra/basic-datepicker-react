# Basic Datepicker React

A simple and basic reusable datepicker component using react

No other third party libraries just only standard built-in Date objects

## Installation

```
npm install basic-datepicker-react
```

## Example

```
() => {
  const [startDate, setStartDate] = useState('')
  return (
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  )
}
```
