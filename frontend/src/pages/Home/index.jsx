import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from '../../redux/reducers/products';



const Home = () => {
  const dispatch = useDispatch();

  const {products}=useSelector((state)=>{
    return {
      products:state.products.products
    }
  })
  console.log(products);


  const getAllProducts = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/products`
        
      );
      console.log(result);

      dispatch(setProducts(result.data.result));
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);









  return (
    <div>
      {products.lenght===0?(<h1>No products yet</h1>):
      (products.map((oneProduct,index)=>{
        return(
          <div key={index}>

            <img
            src={oneProduct.image}
            />
            <h3>{oneProduct.title}</h3>
            <h4>{oneProduct.price}</h4>




          </div>
        )
          
        



      }))
      
      
      }

    </div>
  )
}

export default Home
