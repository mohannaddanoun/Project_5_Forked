import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOneProduct } from "../../redux/reducers/oneProduct/index";
import { useParams } from "react-router-dom";


const OneProduct = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

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
                <img src={Product.image} />
                <h3>{Product.title}</h3>
                <h3>{Product.description}</h3>
                <h4>{Product.price}</h4>
              </div>
            );
          })
        )}
</div>
};

export default OneProduct;
