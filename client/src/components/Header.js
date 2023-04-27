import React from 'react'
import { Counter } from '../features/counter/Counter'

const Header = ({ msg1, msg2, wallet}) => {
  return (
    <div>

    <header className="App-header">
      
        <Counter />

        <p>
           { msg1 }
        </p>    
          {  msg2 }  

           <div>
            <p> Connected Wallet is : { wallet }</p>
          </div>     
      </header> 

    </div>
  )
}

export default Header