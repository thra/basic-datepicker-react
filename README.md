# Basic Datepicker React

A simple and basic reusable datepicker component using react

No other third party libraries just only standard built-in Date objects

<a href="https://www.npmjs.com/package/basic-datepicker-react"><img alt="npm" src="https://img.shields.io/npm/dw/basic-datepicker-react"></a>
<a href="https://www.npmjs.com/package/basic-datepicker-react"><img alt="npm" src="https://img.shields.io/npm/v/basic-datepicker-react"></a>
<a href="https://www.npmjs.com/package/basic-datepicker-react"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/basic-datepicker-react"></a>
<a href="https://www.npmjs.com/package/basic-datepicker-react">
<img alt="Maintenance Status" src="https://img.shields.io/badge/maintenance-active-green.svg" />
</a>

## Installation

```
npm install basic-datepicker-react
```

## Example

```js
import Datepicker from 'basic-datepicker-react'
import { useState } from 'react'

const Example = () => {
  const [startDate, setStartDate] = useState('')
  return (
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  )
}

export default Example
```
