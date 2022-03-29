import React from 'react';
import Header from './Header';
import './Home.css';
import Product from './Product';

function Home() {
  return (
    <>
    <Header/>
    <div className='home'>
        <div className='home__container'>
            <img className='home__image' src='https://m.media-amazon.com/images/I/61aUfpZteZL._SX3000_.jpg' alt='---'/>
            
            <div className='home__row'>
                <Product 
                id="12321341" 
                title="The Lean Startup: How Constant Innovation Creates Radically Successful Business Paperback" 
                price={19.99} 
                image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg" rating={5}
                />
                <Product 
                id="49523147" 
                title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-Beater, Dough Hook and Whisk, 5 Litre Glass Bowl" 
                price={237.0} 
                image="https://m.media-amazon.com/images/I/61etD4-IrPL._AC_SL1200_.jpg" 
                rating={4} 
                />
            </div>

            <div className='home__row'>
                <Product
                id="49815742" 
                title="Samsung Galaxy Watch4 Gear (Jet Black)"
                price={198.99}
                rating={3}
                image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
                />
                <Product
                id="23457896"
                title="Amazon Echo | 3rd Gen | Smart speaker with Alexa, Charcoal Fabric"
                price={98.99}
                rating={5}
                image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilesx2$.jpg"
                />
                <Product
                id="15236487"
                title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB - Silver (4th Generation)"
                price={591.99}
                rating={4}
                image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg" 
                />
            </div>

            <div className='home__row'>
                <Product
                id="56474812"
                title="Samsung LC49RG90SSUXEN 49 Curved LED Gaming Monitor"
                price={1094.98}
                rating={4}
                image="https://m.media-amazon.com/images/I/81rus0UFhsL._AC_SL1500_.jpg"
                />
            </div>
        </div>
    </div>
    </>
  )
}

export default Home;
