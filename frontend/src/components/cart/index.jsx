import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { setCart,
    addProduct,
     checkoutCart,
     deleteProductById
} from "../../redux/reducers/cart/index"
import {Card,Modal,Button} from 'antd'
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

    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState();
    const [img, setImg] = useState();
    const [id, setId] = useState();
    const [newName, setNewName] = useState();
    const [description, setDescription] = useState();
    const [delOpen, setDelOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClickDelOpen = () => {
      setDelOpen(true);
    };
    const handleClickDelClose = () => {
      setDelOpen(false);
    };
const getAllProductsByUserId =async ()=>{
    try{
        const result =await axios.get(`http://localhost:5000/cart`,  {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
         console.log(result.data);
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
              onClick={(e) => {
                handleClickOpen();
                setName(product.title);
                setImg(product.image);
                setId(product._id);
                console.log(product.id);
              }}
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
    <Modal
        open={open}
        onOk={handleClose}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClickDelOpen}>
            Delete
          </Button>,
          <Button key="submit" type="primary" onClick={handleClose}>
            Update
          </Button>,
        ]}
      >
        <img
          alt="example"
          style={{
            width: 240,
          }}
          src={img}
        />
        <p>{name}</p>
        <input
          type="text"
          onChange={(e) => {
            setNewName(e.target.value);
          }}
          placeholder="name"
        ></input>
        <input
          type="text"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="description"
        ></input>
      </Modal>
      <Modal
        title="Delete product"
        open={delOpen}
        onYes={handleClickDelClose}
        onCancel={handleClickDelClose}
        footer={[
          <Button key="back" onClick={handleClickDelClose}>
            No
          </Button>,
          <Button key="submit" type="primary" onClick={handleClickDelClose}>
            Yes
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
  </div>

  )
}

export default CartComponent
