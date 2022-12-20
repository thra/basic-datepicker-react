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

## Classic Example 

```js
import Datepicker from 'basic-datepicker-react'
import { useState } from 'react'

export const ClassicExample = () => {
	const [inputValue, setInputValue] = useState('')
	
	// custom Hook to display datePicker (not provided)
	const [isShown, {setTrue: show, setFalse: hide}] = useBoolean(false)
	
	const submit = e => {
		e.preventDefault()
		// your logic
		console.log(inputValue)
	}
	
	return (
  
      <form onSubmit={submit}>
					
        <label htmlFor='birthdate'>Birthdate</label>
        <input name='birthdate' type='text' onClick={show} defaultValue={inputValue}/>
        {isShown
          ? <Datepicker locale='en'
                        hide={hide}
                        setInputValue={setInputValue}
                        currentSelectedValue={inputValue} />
          : null}


        <input type='submit' value='Submit'/>
      </form>
      
	)
}
```

## Example with react-hook-form

```js
import Datepicker from 'basic-datepicker-react'
import { useState } from 'react'
import {useForm} from 'react-hook-form'

export const RhfExample = () => {
  const {register, handleSubmit, setValue, getValues} = useForm()
  
  //custom Hook to display datePicker (not provided)
  const [isShown, {setTrue: show, setFalse: hide}] = useBoolean(false)
	
  //IMPORTANT the following function is mandatory to get input value from datePicker.
  const getInputValue = (value, name) => {
		setValue(name, value)
	}
  
  const submit = (data) => console.log(data)
	
  return (
    <form onSubmit={handleSubmit(submit)}>
      <label htmlFor='birthdate'>Birthdate</label>
      
      <input onClick={show} type='text' {...register('birthdate')}/>
          {isShown
            ? <Datepicker RHFinputName='birthdate'
                          hide={hide}
                          setInputValue={getInputValue}
                          currentSelectedValue={getValues('birthdate')}/>

            : null}
            
      <input type='submit' value='Submit'/>
    </form>

    )
}

// RHFinputName prop is mandatory to tell the datepicker wich input is targeted
```

## Props Options:

```js
disableFuture={true}
```
To disable the selection of every days after today (Default is false)

#

```js
theme='dark'
```
To display in dark-mode (Default is 'light'). You can use conditionnal rendering there to pluf it to your app dark/light mode
