import {ClassicExample} from './ClassicExample'
import React from 'react'
import {RHFExample} from './RHFExample'
import './App.scss'

const App = () => {
	
	return (
		<main>
			<h1 className='title'>Basic Datepicker React</h1>
			<div className='container'>
				<ClassicExample/>
				<RHFExample/>
			</div>
		</main>
	
	)
}

export default App
