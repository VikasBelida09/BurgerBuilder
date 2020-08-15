import React from 'react'
import burgerlogo from '../../assets/Images/burger-logo.png'
import classes from './Logo.module.css'
const Logo = (props) => {
    return (
        <div className={classes.Logo} style={{height:props.height}}>
            <img src={burgerlogo} alt="MyBurger"/>
        </div>
    )
}

export default Logo
