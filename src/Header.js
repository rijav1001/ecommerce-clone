import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function Header() {
    const [{ cart, user }, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }

  return (
    <div className='header'>
        <Link to='/' style={{ textDecoration: "none" }}>
            <img className='header__logo' src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='logo'/>
        </Link>


        <div className='header__search'>
            <input className='header__searchInput' type='text' placeholder='Search items...'/>
            <SearchIcon className='header__searchIcon' style={{ cursor: "pointer" }} />
        </div>

        <div className='header__nav'>
            <Link to={!user && '/login'} style={{ textDecoration: "none" }}>
            <div onClick={handleAuthentication} className='header__option'>
                <span className='header__optionLineOne'>{user ? `Hello, ${user._delegate.email}` : 'Hello, Guest'}</span>
                <span className='header__optionLineTwo'>{user ? 'Sign Out' : 'Sign In'}</span>
            </div>
            </Link>
            <div className='header__option'>
                <span className='header__optionLineOne'>Returns</span>
                <span className='header__optionLineTwo'>& Orders</span>
            </div>
            <div className='header__option'>
                <span className='header__optionLineOne'>Join</span>
                <span className='header__optionLineTwo'>Prime</span>
            </div>

            <Link to='/checkout' style={{ textDecoration: "none" }}>
                <div className='header__basket'>
                    <ShoppingCartIcon/>
                    <span className='header__optionLineTwo header__basketCount'>{cart?.length}</span>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default Header;
