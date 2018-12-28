import React from 'react'

import classes from './Toolbar.css'
import Logo from '../Logo/Logo'
import NavigationItems from '../Navigation/NavigationItems/NavigationItems'
import ToggleDrawer from '../SideDrawer/ToggleDrawer/ToggleDrawer'

const toolbar = (props) => (
	<header className={classes.Toolbar}>
	<ToggleDrawer clicked={props.showMenu} />
		<div className={classes.Logo}>
			<Logo />
		</div>
		<nav className={classes.DesktopOnly}>
			<NavigationItems />
		</nav>
	</header>
)

export default toolbar