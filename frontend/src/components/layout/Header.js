import React, { Fragment } from 'react'
import '../../App.css'
import { Route, Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import { logout } from '../../actions/userActions'
import Search from './Search'
const Header = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () =>{
        dispatch(logout());
        alert.success('Logged out successfully.')
    }


    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img style={{'width':'200px'}}src="/images/logo.jpg" />
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Route render={({ history }) => <Search history={history} />} />
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    {user ? (
                        <div className="ml-2 dropdown d-inline">
                            <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                                <figure className="avatar avatar -nav mr-3">
                                    <img 
                                        src="/images/default_avatar_1.png"
                                        //src={user.avatar && user.avatar.url} 
                                        //alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                                {user && user.role ==='admin' && (
                                    <Link to="/dashboard" className="dropdown-item">Dashboard</Link> 
                                )}
                                <Link to="/orders/me" className="dropdown-item">Orders</Link>
                                <Link to="/me" className="dropdown-item">Profile</Link>
                                <Link to="/" className="dropdown-item text-danger" onClick={logoutHandler}>
                                    Logout
                                </Link>
                            </div>
                        </div>

                    ): !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>
                    }
                    
                    <Link to="/cart" style={{ textDecoration: 'none' }}>
                    <span id="cart" className="ml-3">Cart</span>
                    <span className="ml-1" id="cart_count">{cartItems.length}</span>
                    </Link>
                </div>
            </nav>
        </Fragment>
    )
}

export default Header