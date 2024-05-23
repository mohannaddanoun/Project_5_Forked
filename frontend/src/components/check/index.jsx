import { Button } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'


const Check =() => {
    const {cart}=useSelector((state)=>{
        return{
            cart: state.cart.inCart
        };
       
    });
    const log =()=>{
        console.log(cart);
    }
  return (
    <div>
      <h1>asdf</h1>
      <Button onClick={log}>checkout </Button>
    </div>
  )
}

export default Check
