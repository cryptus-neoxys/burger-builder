import React, { Component } from 'react'

import Order from '../../components/Order/Order';
import axios from '../../axios-orders'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        const fetchedOrders = [];
        axios.get('/orders.json')
            .then(res => {
                for (let key in res.data) {
                    fetchedOrders.push(res.data[key]);
                }
                this.setState({loading: false, orders: fetchedOrders})
            })
            .catch(err => {
                this.setState({loading: false})
            })
    }

    render () {
        return (
            <div>
                <Order />
                <Order />
            </div>
        );
    }
}

export default Orders