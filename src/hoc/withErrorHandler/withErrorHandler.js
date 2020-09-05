import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxilliary from '../Auxilliary/Auxilliary';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        
        state = {
            initialized: false,
            error: null
        }
                
        componentDidMount() { 
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
            this.setState({ initialized: true });
        }

        componentWillUnmount() {
            console.log('[withErrorHandler.js] componentWillUnmount', this.requestInterceptor, this.responseInterceptor);
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {

            const { initialized } = this.state;
            if (!initialized) return null;

            return(
                <Auxilliary>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {
                            this.state.error ?
                            (<Auxilliary>
                                <p>{this.state.error.message}</p>
                                <p style={{fontSize:'1rem'}}>
                                    Something went wrong
                                    <span role='img' aria-label='CONFUSED FACE'>&#x1F613;</span>!
                                </p>
                            </Auxilliary>)
                            : null
                        }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxilliary>
            );
        }
    }
}

export default withErrorHandler;