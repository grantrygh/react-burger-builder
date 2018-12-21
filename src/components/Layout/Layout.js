import React from 'react'
import classes from './Layout.css'
import Toolbar from '../Toolbar/Toolbar'

const layout = ( props ) => (
	<React.Fragment>
		<Toolbar />
		<div>SideDrawer, Backdrop</div>
		<main className={classes.Content}>
			{props.children}
		</main>
	</React.Fragment>
);

export default layout