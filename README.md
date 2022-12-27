# Basic Datepicker React

A simple and basic reusable datepicker component built in typescript using react and compatible
with <a href='https://www.npmjs.com/package/react-hook-form'><img src="https://img.shields.io/badge/-React%20Hook%20Form-111827?logo=React%20Hook%20Form&logoColor={LOGO-COLOR}style=For-the-badge" alt="badge sample"/> </a>

No other third party libraries just only standard built-in Date objects

<a href="https://www.npmjs.com/package/basic-datepicker-react"><img alt="npm" src="https://img.shields.io/npm/dw/basic-datepicker-react"></a>
<a href="https://www.npmjs.com/package/basic-datepicker-react"><img alt="npm" src="https://img.shields.io/npm/v/basic-datepicker-react"></a>
<a href="https://www.npmjs.com/package/basic-datepicker-react"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/basic-datepicker-react"></a>
<a href="https://www.npmjs.com/package/basic-datepicker-react">
<img alt="Maintenance Status" src="https://img.shields.io/badge/maintenance-active-green.svg" />
</a>

## Installation

```
npm i basic-datepicker-react
```

```
yarn add basic-datepicker-react
```

```
pnpm add basic-datepicker-react
```

## Example (classic)

```js
import {Datepicker} from 'basic-datepicker-react'
import {useState} from 'react'

const Example = () => {
	
	const [inputValue, setInputValue] = useState('')
	const [open, setOpen] = useState(false)
	
	const submit = e => {
		e.preventDefault()
		// your logic
		console.log(inputValue)
	}
	
	return (
		<form className='test' onSubmit={submit}>
			<label htmlFor='birthdate'>Birthdate</label>
			<input name='birthdate' type='text' onClick={() => setOpen(!open)} defaultValue={inputValue}/>
			
			{open
				? <Datepicker locale='en'
				              hide={() => setOpen(false)}
				              setInputValue={setInputValue}
				              disableFuture={true}
				              theme='dark'
				              currentSelectedValue={inputValue}/>
				: null
			}
			
			<input type='submit' value='Submit'/>
		</form>
	)
}

export default Example
```

#

## Example (with React-hook-form)

```js
import {Datepicker} from 'basic-datepicker-react'
import {useState} from 'react'
import {useForm} from "react-hook-form";

const Example = () => {
	
	const [isShown, setIsShown] = useState(false)
	const {register, handleSubmit, setValue, getValues} = useForm()
	
	//IMPORTANT the following function is mandatory to get input value from datePicker. 
	// You can copy/paste safely (we'll provide it in package later)
	const getInputValue = (value, name) => {
		setValue(name, value)
	}
	
	const submit = (data) => console.log(data)
	
	return (
		<form onSubmit={handleSubmit(submit)}>
			<label htmlFor='birthdate'>Birthdate</label>
			<input onClick={() => setIsShown(true)} type='text' {...register('birthdate')}/>
			
			{isShown
				? <Datepicker RHFinputName='birthdate'
				              hide={() => setIsShown(false)}
				              disableFuture={true}
				              setInputValue={getInputValue}
				              currentSelectedValue={getValues('birthdate')}/>
				
				: null
			}
			
			<input type='submit' value='Submit'/>
		</form>
	)
}

export default Example
```

### props:

`RHFinputName` the string you use to target your input with RHF (only if you work with react-hook-form) | _**Optional**_

`setInputValue` your setter fn to get input value (state setter without RHF or the getInputValue function with RHF)
| _**Required**_

`hide` your state setter | _**Required**_

`locale` a string to set the format of the date in therm of your region | _**Optional**_

`disableFuture` boolean to disable all days after today | _**Optional**_

`theme` a string: 'light' by default or 'dark' | _**Optional**_

`currentSelectedValue` your state to tell the datepicker if you reopen the day you've already selected | _**Optional**_

