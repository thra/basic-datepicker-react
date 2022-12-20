import React, {useState} from 'react'
import useBoolean from './useBoolean'
import Datepicker from '../lib'

export const ClassicExample = () => {
	const [inputValue1, setInputValue1] = useState('')
	const [inputValue2, setInputValue2] = useState('')
	
	// custom Hook to display datePicker (not provided)
	const [isShown1, {setTrue: show1, setFalse: hide1}] = useBoolean(false)
	const [isShown2, {setTrue: show2, setFalse: hide2}] = useBoolean(false)
	
	const submit = e => {
		e.preventDefault()
		// your logic
		console.log(inputValue1, inputValue2)
	}
	
	return (
		<div>
			<h3>Classic</h3>
			<section className='section basic'>
				<form onSubmit={submit}>
					
					
					<label htmlFor='birthdate'>Birthdate</label>
					<input name='birthdate' type='text' onClick={show1} defaultValue={inputValue1}/>
					{isShown1
						? <Datepicker locale='en'
						              hide={hide1}
						              setInputValue={setInputValue1}
						              currentSelectedValue={inputValue1}
						              disableFuture={true}
						/>
						: null}
					
					
					<label htmlFor='hired'>Hired</label>
					<input name='hired' type='text' onClick={show2} defaultValue={inputValue2}/>
					{isShown2
						? <Datepicker locale='en'
						              theme='dark'
						              hide={hide2}
						              setInputValue={setInputValue2}
						              currentSelectedValue={inputValue2}
						/>
						: null}
					
					
					<input type='submit' value='Submit'/>
				</form>
			</section>
		</div>
	
	)
}
