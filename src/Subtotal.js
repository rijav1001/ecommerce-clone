import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { getSubTotal } from './reducer';
import { useNavigate } from 'react-router-dom';

function Subtotal() {
    const navigate = useNavigate();
    const [{ cart }, dispatch] = useStateValue();
    // console.log(cart);
    
  return (
    <div className='subtotal'>
        <CurrencyFormat
            renderText={(value) => (
                <>
                <p>
                    Subtotal({cart?.length} items):  {/* add a function to add values to cart array */}
                    <strong>{value}</strong>
                </p>
                <small className='subtotal__gift'>
                    <input type="checkbox" />This order contains a gift
                </small>
                </>
            )}
            decimalScale={2}
            value={getSubTotal(cart)}   // add a func here to get subtotal
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
        />
        <button style={{ cursor: "pointer" }} onClick={e => navigate('/payment')} >Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
