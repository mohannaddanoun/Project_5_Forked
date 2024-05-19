import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Index() {
  const navigate = useNavigate();
  const { token, userid, isLoggedIn } = useSelector((state) => ({
    token: state.auth.token,
    userid: state.auth.userid,
    isLoggedIn: state.auth.isLoggedIn,
  }));

  const navigateHome = () => navigate('/adminPage');
  const navigateMessage = () => navigate('/');

  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);

  const handleCategoryTitleChange = (e) => setCategoryTitle(e.target.value);
  const handleCategoryImageChange = (e) => setCategoryImage(e.target.files[0]);

  const handleProductTitleChange = (e) => setProductTitle(e.target.value);
  const handleProductDescriptionChange = (e) => setProductDescription(e.target.value);
  const handleProductPriceChange = (e) => setProductPrice(e.target.value);
  const handleProductImageChange = (e) => setProductImage(e.target.files[0]);

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    //Check VAlues if submitted 
    console.log(
      categoryTitle,
      categoryImage
    );

    const input = {
      categoryTitle,
      categoryImage
    };

    const result = await axios.post("http://localhost:5000/categories/",input).then((result)=>{
      if(result.data){
        res.status(201).json({
          success:true,
          message:result.data
        })
      }
      }).catch((err)=>{
        if(err)
          {
            res.status(500).json({
              success:false,
              message:err.message
            })
          }
      })
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    //Check VAlues if subnitted 
    console.log('Product Title:', productTitle);
    console.log('Product Description:', productDescription);
    console.log('Product Price:', productPrice);
    console.log('Product Image:', productImage);

    const input = {
      productTitle,
      productDescription,
      productPrice,
      productImage
    };

    const result = await axios.post("http://localhost:5000/products/",input).then((result)=>{
      if(result.data){
        res.status(201).json({
          success:true,
          message:result.data
        })
      }
      }).catch((err)=>{
        if(err)
          {
            res.status(500).json({
              success:false,
              message:err.message
            })
          }
      })


  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
        <div className="container">
          <span className="navbar-brand">Navbar</span>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <span className="nav-link" onClick={navigateHome}>Home</span>
              </li>
              <li className="nav-item">
                <span className="nav-link" onClick={navigateMessage}>Messages</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <div className="container flex-grow-1 mt-4 mb-5">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h2>Admin Panel</h2>
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Create Category</h5>
                <form onSubmit={handleCategorySubmit}>
                  <div className="mb-3">
                    <label htmlFor="categoryTitle" className="form-label">Category Title</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="categoryTitle" 
                      value={categoryTitle} 
                      onChange={handleCategoryTitleChange} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="categoryImage" className="form-label">Category Image</label>
                    <input 
                      type="file" 
                      className="form-control" 
                      id="categoryImage" 
                      onChange={handleCategoryImageChange} 
                      required 
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Create Category</button>
                </form>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Create Product</h5>
                <form onSubmit={handleProductSubmit}>
                  <div className="mb-3">
                    <label htmlFor="productTitle" className="form-label">Product Title</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="productTitle" 
                      value={productTitle} 
                      onChange={handleProductTitleChange} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productDescription" className="form-label">Product Description</label>
                    <textarea 
                      className="form-control" 
                      id="productDescription" 
                      value={productDescription} 
                      onChange={handleProductDescriptionChange} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productPrice" className="form-label">Product Price</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="productPrice" 
                      value={productPrice} 
                      onChange={handleProductPriceChange} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productImage" className="form-label">Product Image</label>
                    <input 
                      type="file" 
                      className="form-control" 
                      id="productImage" 
                      onChange={handleProductImageChange} 
                      required 
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Create Product</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-dark text-white text-center py-3 fixed-bottom w-100">
        Infinite Horizon
      </footer>
    </div>
  );
}

export default Index;
