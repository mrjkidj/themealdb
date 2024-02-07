import React, { useState } from 'react';
import s from './Header.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from '../../Assets/logo.png'




const Header = () => {
    return (
        <nav className={s.navbar}>
            <div className="container">
                <div className={s.nav_content}>
                    <img src={Logo} alt="" />
                    <form className={s.form_control}>
                        <input type="text" />
                        <button>Send</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Header;
