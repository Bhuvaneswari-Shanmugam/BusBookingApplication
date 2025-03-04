import React from 'react';
import Card from '../components/Card';  

const PaymentHistory: React.FC = () => {
    const payments = [
        {
            paymentId: 'PAY12345',
            date: '2023-10-01',
            amount: '₹1500',
            method: 'Credit Card',
            status: 'Completed'
        },
        {
            paymentId: 'PAY67890',
            date: '2023-11-01',
            amount: '₹2000',
            method: 'Debit Card',
            status: 'Pending'
        },
        {
            paymentId: 'PAY54321',
            date: '2023-12-01',
            amount: '₹1000',
            method: 'Net Banking',
            status: 'Completed'
        }
    ];

  
    const content = (
        <div>
            {payments.length > 0 ? (
                <ul className="list-group list-group-flush w-100">
                    <li key="header" className="list-group-item d-flex align-items-center">
                        <span className="w-100 d-flex justify-content-between">
                            <strong>Payment ID</strong>
                            <strong>Date</strong>
                            <strong>Amount</strong>
                            <strong>Method</strong>
                            <strong>Status</strong>
                        </span>
                    </li>
                    {payments.map((payment, index) => (
                        <li key={index} className="list-group-item d-flex align-items-center">
                            <span className="d-flex justify-content-between w-100">
                                <span>{payment.paymentId}</span>
                                <span>{new Date(payment.date).toLocaleDateString()}</span>
                                <span>{payment.amount}</span>
                                <span>{payment.method}</span>
                                <span>{payment.status}</span>
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No payments found.</p>
            )}
        </div>
    );

    return (
        <Card 
            className='mt-5'
            style={{width:'150%'}}
            header="Payment History" 
           description={content}
        />
    );
};

export default PaymentHistory;
