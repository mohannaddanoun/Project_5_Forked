import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOneProduct } from "../../redux/reducers/oneProduct/index";
import {addProduct,setCart} from "../../redux/reducers/cart/index"

import { useParams,useNavigate } from "react-router-dom";


const OneProduct = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const { id } = useParams();

    const {token}=useSelector((state)=>{
        return{
            token: state.auth.token
        };
       
    });
    const {cart}=useSelector((state)=>{
        return{
            cart: state.cart.inCart
        };
       
    });

    const { oneProduct } = useSelector((state) => {
        return {
          oneProduct: state.oneProduct.oneProduct,
        };
      });
      console.log("from one product",oneProduct);

      const getProductById = async () => {
        try {
          const result = await axios.get(`http://localhost:5000/products/product/${id}`);
          console.log("result from one product",result);
    
          dispatch(setOneProduct(result.data.result));
        } catch (error) {
          console.log(error);
        }
      };


      const AddToCart = () => {
        console.log(token);
        axios
          .post(
            `http://localhost:5000/cart/${id}`,{},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((Result) => {
            console.log("from result",Result.data.result);
            
            // dispatch(setCart(Result.data.result));
            // dispatch(addProduct(cart))
          })
          .catch((err) => {
            console.log(err);
          });
      };

      useEffect(() => {
        getProductById()
      }, []);






  return <div>
  {oneProduct.lenght === 0 ? (
          <h1>No products yet</h1>
        ) : (
            oneProduct.map((Product, index) => {
            return (
              <div className="oneProductDiv" key={index}
              onClick={() => {
                navigate(`/product/${Product.id}`);
              }}>
                
                <img style={{maxHeight:150 , maxWidth:200}} src={Product.image} />
                <h3>{Product.title}</h3>
                <h3>{Product.description}</h3>
                <h4>{Product.price}</h4>
                <button onClick={AddToCart}>add to cart</button>
               
              </div>
            );
          })
        )}
</div>
};

export default OneProduct;
