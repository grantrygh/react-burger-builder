import React from 'react'
import classes from './Logo.css'
import burgerLogo from '../../assets/images/burger-logo.png'

const logo = () => (
	<div className={classes.Logo}>
		<img src={burgerLogo} />
	</div>
)

export default logo