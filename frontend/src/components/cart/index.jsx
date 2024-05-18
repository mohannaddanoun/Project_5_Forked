import axios from 'axios'
import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { setCart,
    addProduct,
     checkoutCart,
     deleteProductById
} from "../../redux/reducers/cart/index"
import {Card} from 'antd'
const {Meta}=Card
// import auth from "../../redux/reducers/auth/index"
const CartComponent = () => {
    const dispatch =useDispatch();
    const {token}=useSelector((state)=>{
        return{
            token: state.auth.token
        };
       
    });
console.log(token);
    const {cart}=useSelector((state)=>{
        return{
            cart: state.cart.inCart
        };
       
    });
    console.log(cart);
const getAllProductsByUserId =async ()=>{
    try{
        const result =await axios.get(`http://localhost:5000/cart`,  {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
         console.log(result.data.result);
        dispatch(setCart(result.data.result))


    }catch(error){
        console.log(error);
    }
}

useEffect(()=>{
    getAllProductsByUserId()
},[])
  return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      marginTop: 100,
      padding: "50px",
    }}
  >
    {cart.length === 0 ? (
      <h1>no products yet</h1>
    ) : (
      cart.map((product, index) => {
        return (
          <div
            style={{
              alignItems: "center",
              width: "25%",
              justifyContent: "center",
              marginRight: "10px",
            }}
            key={index}
          >
            <Card
              style={{
                width: 300,
                padding: 20,
              }}
              cover={
                <img
                  
                  src={product.image}
                />
              }
            >
              <Meta
                title={product.title}
                description={product.description}
              />
            </Card>
          </div>
        );
      })
    )}
  </div>

  )
}

export default CartComponent
