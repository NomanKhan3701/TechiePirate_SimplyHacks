import React from 'react'
import './Button.scss'

const Button = ({ text, onClick }) => {
	return (
		<div className='green-btn' onClick={onClick}>{text}</div>
	)
}

export default Button