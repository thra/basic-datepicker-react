import React from 'react'
import useBoolean from './useBoolean'
import Datepicker from '../lib'
import {useForm} from 'react-hook-form'

export const RHFExample = () => {
	const {register, handleSubmit, getValues, setValue} = useForm()

// custom Hook to display datePicker (not provided)
	const [isShown, {setTrue: show, setFalse: hide}] = useBoolean(false)
	
	const getInputValue = (value, name) => {
		setValue(name, value)
		hide()
	}
	
	const submit = () => {
		console.log(getValues('birthdate'))
	}
	
	return (
		<form onSubmit={handleSubmit(submit)}>
			<label htmlFor='birthdate'>Birthdate</label>
			<input onClick={show} type='text' {...register('birthdate')}/>
			{isShown
				? <Datepicker RHFinputName='birthdate'
				              locale='en'
				              hide={hide}
				              setInputValue={getInputValue}/>
				: null}
			<input type='submit'/>
		</form>
	)
}
