import React, { Component } from 'react'
import classes from './Layout.css'
import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer'

class Layout extends Component {
	state = {
		showSideDrawer: false
	}

	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false})
	}

	toggleMenuHandler = (sideDrawerState) => {
		this.setState( (prevState ) => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	}

	render () {
		return (
			<React.Fragment>
				<Toolbar showMenu={this.toggleMenuHandler} />
				<SideDrawer 
					closed={this.sideDrawerClosedHandler} 
					open={this.state.showSideDrawer} />
				<div>Backdrop</div>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</React.Fragment>
		)
	}
}

export default Layout