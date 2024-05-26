import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOneProduct } from "../../redux/reducers/oneProduct/index";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "antd";
const { Meta } = Card;
import { Divider } from "antd";
import "./OneProduct.css"

const OneProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [categoryId,setCategoryId]=useState()
    const [productsByCategoryId,setProductsByCategoryId]=useState([])



    const { token } = useSelector((state) => {
        return {
            token: state.auth.token
        };
    });



    const { oneProduct } = useSelector((state) => {
        return {
            oneProduct: state.oneProduct.oneProduct,
        };
    });
    console.log("from one product", oneProduct);


    const getProductById = async () => {
        try {
            const result = await axios.get(`http://localhost:5000/products/product/${id}`);
            console.log("result from one product", result);
            dispatch(setOneProduct(result.data.result));
            setCategoryId(result.data.result[0].category_id)

        } catch (error) {
            console.log(error);
        }
    };

    const getProductsByCategoryId = async () => {
        try {
            const result = await axios.get(`http://localhost:5000/products/${categoryId}`);
            console.log("result get product by category", result);
            const shuffledProducts = result.data.result.sort(() => 0.5 - Math.random());
            setProductsByCategoryId(shuffledProducts.slice(0, 3));

            
        } catch (error) {
            console.log(error);
            console.log(categoryId);

           
        }
    };
    console.log(categoryId);




    const AddToCart = () => {
        console.log(token);
        axios
            .post(
                `http://localhost:5000/cart/${id}`, {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((Result) => {
                console.log("from result", Result.data.result);
                
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getProductById(),
        getProductsByCategoryId();
    }, [categoryId]);

    return (
        <div>

        <div className="one-product-container">
            {oneProduct.length === 0 ? (
                <h1>No products yet</h1>
            ) : (
                oneProduct.map((Product, index) => {
                    return (
                        <div className="oneProductDiv" key={index}>
                            <img src={Product.image} alt={Product.title} />
                            <div className="productDetails">
                                <h3>{Product.title}</h3>
                                <h4>{Product.description}</h4>
                                <p>${Product.price}</p>
                                <button onClick={AddToCart}>Add to Cart</button>
                            </div>
                        </div>

                    );

                })
            )}
             
        </div>

        <Divider>Similar Products</Divider>
        <div className="similar-products-container">
            {productsByCategoryId.map((oneSimilar,index)=>{

                return(
                    <div className="similarProductDiv"
                    key={index}>
                        <Card
                  hoverable
                  style={{
                    maxWidth: 240,
                    margin:7
                  }}
                  cover={
                    <img
                      style={{ minHeight: 160, maxHeight: 140 }}
                      src={oneSimilar.image}
                      onClick={() => {
                        navigate(`/product/${oneSimilar.id}`);
                        window.location.reload();
                        
                      }}
                    />
                  }
                >
                  <Meta title={oneSimilar.title} />
                </Card>




                    </div>
                )
            })}
            


        </div>
        </div>


    );
};

export default OneProduct;