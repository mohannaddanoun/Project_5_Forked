import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import AddPhoto from '../../components/addPhotos';
import { setLogout } from '../../redux/reducers/auth';

function Index() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => ({
    token: state.auth.token,
  }));

  const navigateHome = () => navigate('/adminPage');
  const navigateMessage = () => navigate('/message');
  const dispatch = useDispatch();

  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get("http://localhost:5000/categories/");
        console.log(result.data);

        if (Array.isArray(result.data.result)) {
          setCategories(result.data.result);
        } else {
          console.error("Array:", result.data.result);
        }
      } catch (err) {
        console.error("Error fetching categories:", err.message);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryTitleChange = (e) => setCategoryTitle(e.target.value);
  const handleCategoryImageChange = (url) => setCategoryImage(url);

  const handleProductTitleChange = (e) => setProductTitle(e.target.value);
  const handleProductDescriptionChange = (e) => setProductDescription(e.target.value);
  const handleProductPriceChange = (e) => setProductPrice(e.target.value);
  const handleProductImageChange = (url) => setProductImage(url);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const input = {
      title: categoryTitle,
      image: categoryImage,
    };

    try {
      const result = await axios.post("http://localhost:5000/categories/", input);
      console.log(result.data);
      if (result.data) {
        console.log({
          success: true,
          message: result.data,
        });
      }
    } catch (err) {
      console.error({
        success: false,
        message: err.message,
      });
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const input = {
      image: productImage,
      title: productTitle,
      description: productDescription,
      price: productPrice,
      category_id: selectedCategory,
    };

    try {
      const result = await axios.post("http://localhost:5000/products/", input, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data) {
        console.log({
          success: true,
          message: result.data,
        });
      }
    } catch (err) {
      console.error({
        success: false,
        message: err.message,
      });
    }
  };

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.clear();
    navigate('/');
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
              <li className="nav-item">
                <button className="btn btn-outline-light ml-2" onClick={handleLogout}>Logout</button>
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

                <>
                <AddPhoto onUrlChange={handleCategoryImageChange} />
                </>
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
                    
                  </div>
                  <button type="submit" className="btn btn-primary">Create Category</button>
                </form>
              
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Create Product</h5>
                <AddPhoto onUrlChange={handleProductImageChange} />
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
                    <label htmlFor="categorySelect" className="form-label">Product Category</label>
                    <select 
                      className="form-control" 
                      id="categorySelect" 
                      value={selectedCategory} 
                      onChange={handleCategoryChange} 
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productImage" className="form-label">Product Image</label>
                   
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
