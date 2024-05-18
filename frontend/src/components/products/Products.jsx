import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/reducers/products";
import { useParams,useNavigate } from "react-router-dom";
import { Card } from "antd";
const { Meta } = Card;




const Products = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate()

    const { products } = useSelector((state) => {
        return {
          products: state.products.products,
        };
      });

      const getAllProductsByCategoryId = async () => {
        try {
          const result = await axios.get(`http://localhost:5000/products/${id}`);
          console.log(result);
    
          dispatch(setProducts(result.data.result));
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        getAllProductsByCategoryId()
      }, []);


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
      {products.length === 0 ? (
        <h1>no products yet</h1>
      ) : (
        products.map((oneProduct, index) => {
          return (
            <div
              style={{
                alignItems: "center",
                width: "25%",
                justifyContent: "center",
                marginRight: "10px",
              }}
              key={index}
              onClick={() => {
                navigate(`/product/${oneProduct.id}`);
              }}>
            
              <Card
                style={{
                  width: 300,
                  padding: 20,
                }}
                cover={
                  <img
                    
                    src={oneProduct.image}
                  />
                }
              >
                <Meta
                  title={oneProduct.title}
                  description={oneProduct.description}
                />
              </Card>
            </div>
          );
        })
      )}
    </div>
  
  )
}

export default Products