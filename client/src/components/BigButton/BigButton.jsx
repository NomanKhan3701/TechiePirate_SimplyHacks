import React from 'react'
import './BigButton.scss'

const BigButton = ({ children, onClick }) => {
	return (
		<div className='big-btn' onClick={onClick}>{children}</div>
	)
}

export default BigButton