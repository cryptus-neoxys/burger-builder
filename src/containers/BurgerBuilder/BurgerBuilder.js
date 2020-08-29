import React, { Component } from 'react'

import Auxilliary from '../../components/hoc/Auxilliary';
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component {
     render() {
         return (
             <Auxilliary>
                 <Burger />
                 <div>Build Controls</div>
             </Auxilliary>
         )
     }
}

export default BurgerBuilder;