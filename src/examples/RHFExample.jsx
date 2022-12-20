import React from 'react'
import useBoolean from './useBoolean'
import Datepicker from '../lib'
import {useForm} from 'react-hook-form'

export const RHFExample = () => {
	const {register, handleSubmit, setValue, getValues} = useForm()

// custom Hook to display datePicker (not provided)
	const [isShown1, {setTrue: show1, setFalse: hide1}] = useBoolean(false)
	const [isShown2, {setTrue: show2, setFalse: hide2}] = useBoolean(false)
	
	const getInputValue = (value, name) => {
		setValue(name, value)
	}
	
	const submit = (data) => console.log(data)
	
	return (
		<form onSubmit={handleSubmit(submit)}>
			<label htmlFor='birthdate'>Birthdate</label>
			<input onClick={show1} type='text' {...register('birthdate')}/>
			{isShown1
				? <Datepicker RHFinputName='birthdate'
				              locale='en'
				              hide={hide1}
				              setInputValue={getInputValue}
				              currentSelectedValue={getValues('birthdate')}
				              disableFuture={true}/>
				
				: null}
			<label htmlFor='hired'>Hired</label>
			<input onClick={show2} type='text' {...register('hired')}/>
			{isShown2
				? <Datepicker RHFinputName='hired'
				              locale='en'
				              hide={hide2}
				              setInputValue={getInputValue}
				              currentSelectedValue={getValues('hired')}/>
				: null}
			<input type='submit' value='Submit'/>
		</form>
	)
}
