import React, { Component } from 'react'

import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = ( WrappedComponent, axios ) => {
	return class extends Component {
		state = {
			error: null
		}

		componentWillMount() {
			this.requestInterceptor = axios.interceptors.request.use( request => {
				this.setState({ error: null });
				return request
			})
			this.responseInterceptor = axios.interceptors.response.use( response => response, error => {
				this.setState({ error: error });
			})
		}

		// Whenever we don't need BurgerBuilder component anymore, interceptors will be cleaned up
		// This way, if withErrorHandler is reused in application, we don't create more and more interceptors with old ones living on
		componentWillUnmount () {
			axios.interceptors.request.eject( this.requestInterceptor );
			axios.interceptors.response.eject( this.responseInterceptor );
		}

		errorConfirmedHandler = () => {
			this.setState({ error: null })
		}

		render() {
			return (
				<React.Fragment>
					<Modal 
						show={this.state.error} 
						modalClosed={this.errorConfirmedHandler}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</React.Fragment>
			)
		}
	}
}

export default withErrorHandler