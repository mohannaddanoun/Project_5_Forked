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
    className="products-container"
    >
      {products.length === 0 ? (
        <h1>no products yet</h1>
      ) : (
        products.map((oneProduct, index) => {
          return (
            <div className="ProductDiv"
            key={index}
            onClick={() => {
              navigate(`/product/${oneProduct.id}`);
            }}
           >
            <Card
              hoverable
              style={{
                maxWidth: 240,
                margin:7
              }}
              cover={
                <img
                  style={{ minHeight: 160, maxHeight: 140 }}
                  src={oneProduct.image}
                  onClick={() => {
                    navigate(`/${oneCategory.id}`);
                  }}
                />
              }
            >
              <Meta title={oneProduct.title} />
              

            </Card>

          </div>
          );
        })
      )}
    </div>
  
  )
}

export default Products