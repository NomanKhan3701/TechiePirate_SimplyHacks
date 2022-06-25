import React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router'
import './Payment.scss'

const Payment = () => {
	const { state } = useLocation();
	const { message, amount } = state;

	return (
		<div className='payment container'>Payment</div>
	)
}

export default Payment