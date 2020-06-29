import React from 'react';
import { useState } from 'react';

const TestPayment = () => {
	const [amount, setAmount] = useState(0);

	const onSubmitHandler = (e) => {
		e.preventDefault();

		console.log(amount);
		const payment_amount = amount;
		const options = {
			key: process.env.REACT_APP_RAZORPAY_KEY,
			amount: payment_amount * 100,
			name: 'Payments',
			description: 'Donate yourself some time',

			handler(response) {
				const paymentId = response.razorpay_payment_id;
				const url = `http://localhost:8000/attendance/api/payment_capture?payment_id=${paymentId}&amount=${payment_amount}`;
				// Using my server endpoints to capture the payment
				fetch(url, {
					method: 'get',
					headers: {
						'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
					},
				})
					.then((resp) => resp.json())
					.then(function (data) {
						console.log('Request succeeded with JSON response', data);
					})
					.catch(function (error) {
						console.log('Request failed', error);
					});
			},

			prefill: {
				name: 'Shubham Jain',
				email: 'jains1801@gmail.com',
			},
			notes: {
				address: 'Goa,India',
			},
			theme: {
				color: '#9D50BB',
			},
		};
		const rzp1 = new window.Razorpay(options);

		rzp1.open();
	};

	return (
		<div>
			<form onSubmit={onSubmitHandler}>
				<h4>Amount To be paid</h4>
				<input
					type='number'
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
				/>
				<button type='submit'>Pay Now</button>
			</form>
		</div>
	);
};

export default TestPayment;
