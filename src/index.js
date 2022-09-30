import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './examples/App'
import './index.scss'

const root = createRoot(document.getElementById('root'))

root.render(<App />)
