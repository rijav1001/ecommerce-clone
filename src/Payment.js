import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Payment.css';
import Header from './Header';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getSubTotal } from './reducer';
import axios from './axios';

// const promise = loadStripe('pk_test_51KOz7MSAqsavqiN8olvriRpUdMXaSPQquCNIGeJyhCzPqvobUrSCP6vTW4QwYgctejlczh40P6asnWMhTUGl2GLu005T63a5qH');
 
function Payment() {
    const navigate = useNavigate();

    const [{ cart, user }, dispatch] = useStateValue();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState('');
    const [clientSecret, setClientSecret] = useState(true);
    // console.log(cart);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // generate the special strip secret which allows us to charge a customer
        const getClientSecret = async () => {
            const res = await axios({
                method: "post",
                //stripe expects the total in a currencies subunits
                url: `/payment/create?total=${getSubTotal(cart) * 100}`
            });
            setClientSecret(res.data.clientSecret);
        }
        getClientSecret();
    }, [cart])

    const handleSubmit = async (e) => {
        // this is comment
        e.preventDefault();
        setProcessing(true);
        
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            navigate('/orders', { replace: true })
        })
    }

    const handleChange = e => {
        // listen for changes inside card element and display errors if any
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

    return (
        <>
        <Header/>
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (<Link to='/checkout' style={{ textDecoration: "none", color: "black", cursor: "pointer" }}>{cart?.length} items</Link>)
                </h1>
                {/* payment-section:delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?._delegate.email}</p>
                        <p>Address line 1</p>
                        <p>Address Line 2</p>
                    </div>
                </div>

                {/* review the items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {cart.map((item, idx) => {
                            return (
                            <CheckoutProduct
                                key={idx} 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                            )
                        })}
                    </div>
                </div>

                {/* payment method */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className='payment__priceContainer'>
                                <CurrencyFormat 
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getSubTotal(cart)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>

            </div>
        </div>
        </>
    );
}

export default Payment;
