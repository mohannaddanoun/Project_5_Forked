import React from 'react'
import CartComponent from '../../components/cart/index'
import Check from '../../components/check'
import "./style.css"

function Cart() {
  return (
    <div className='cart'>
      <Check className="checkout" />
      <CartComponent/>

    </div>

  )
}

export default Cart