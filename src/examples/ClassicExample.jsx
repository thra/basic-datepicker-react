import React, {useRef, useState} from 'react'
import useBoolean from './useBoolean'
import Datepicker from '../lib'

export const ClassicExample = () => {
	const [inputValue, setInputValue] = useState('')
	const ref = useRef(null)
	
	// custom Hook to display datePicker (not provided)
	const [isShown, {setTrue: show, setFalse: hide}] = useBoolean(false)
	
	const getInputValue = (value) => {
		setInputValue(value)
		hide()
	}
	
	const submit = e => {
		e.preventDefault()
		// your logic
		alert(ref.current.defaultValue)
	}
	
	return (
		<section className='container'>
			<form onSubmit={submit}>
				<label htmlFor='birthdate'>Birthdate</label>
				<input name='birthdate' ref={ref} type='text' onClick={show} defaultValue={inputValue}/>
				{isShown
					? <Datepicker locale='en'
					              hide={hide}
					              setInputValue={getInputValue}
					              currentSelectedValue={inputValue}
					              disableFuture={true}
					/>
					: null}
				<input type='submit'/>
			</form>
		</section>
	
	)
}
