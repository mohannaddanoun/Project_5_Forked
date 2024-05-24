import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/reducers/products";
import { setcategories } from "../../redux/reducers/categories";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";
const { Meta } = Card;
import { Divider } from "antd";
import { Carousel } from "antd";
import '../Home/Home.css'

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contentStyle = {
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    width: "100%",
    backgroundSize: "cover",
    aspectRatio: 16 / 4,
  };

  const { categories } = useSelector((state) => {
    return {
      categories: state.categories.categories,
    };
  });

  const { products } = useSelector((state) => {
    return {
      products: state.products.products,
    };
  });
  console.log(products);

  console.log(categories);

  const getAllCategories = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/categories`);
      console.log(result);

      dispatch(setcategories(result.data.result));
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/products`);
      console.log(result);

      dispatch(setProducts(result.data.result));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts(), getAllCategories();
  }, []);

  return (
    <div className="mainDiv">
      {/* <Carousel autoplay>
        <div>
          <img
            style={contentStyle}
            src="https://resumespice.com/wp-content/uploads/2021/03/38.png"
          />
        </div>
        <div>
          <img
            style={contentStyle}
            src="https://dablew.pk/file/2021/02/banner.jpg"
          />
        </div>
        <div>
          <img
            style={contentStyle}
            src="https://stylizedd.com/cdn/shop/files/Banner5_1400x.jpg?v=1650541024"
          />
        </div>
        <div>
          <img
            style={contentStyle}
            src="https://t3.ftcdn.net/jpg/03/08/09/84/360_F_308098498_raQvWUt7e7dPnRl7xvxTMqJL1wfaYR3G.jpg"
          />
        </div>
      </Carousel> */}

      <section id="hero">
        <h4>Trade-in-offer</h4>
        <h2>Super value deals</h2>
        <h1>on all products</h1>
        <p>Save more with coupons & up to 70% off!</p>

      </section>

      <Divider>Categories</Divider>
      <div className="category-container">
        {categories.length &&
          categories.map((oneCategory, index) => {
            return (
              <div key={index}>
                <Card
                  hoverable
                  style={{
                    maxWidth: 240,
                  }}
                  cover={
                    <img
                      style={{ minHeight: 160, maxHeight: 140 }}
                      src={oneCategory.image}
                      onClick={() => {
                        navigate(`/${oneCategory.id}`);
                      }}
                    />
                  }
                >
                  <Meta title={oneCategory.title} />
                </Card>
              </div>
            );
          })}
      </div>
      <Divider>Our Products</Divider>

      <div className="products-container">
        {products.lenght === 0 ? (
          <h1>No products yet</h1>
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
    </div>
  );
};

export default Home;
