import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { setCart} from "../../redux/reducers/cart/index"
import {Card,Modal,Button} from 'antd'
const {Meta}=Card
import "./style.css"

// import auth from "../../redux/reducers/auth/index"
const CartComponent = () => {
    const dispatch =useDispatch();
    const {token}=useSelector((state)=>{
        return{
            token: state.auth.token || localStorage.getItem("token")
        };
       
    });

    const {cart}=useSelector((state)=>{
        return{
            cart: state.cart.inCart
        };
       
    });

    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState();
    const [img, setImg] = useState();
    const [id, setId] = useState();
    const [price, setPrice] = useState();
    const [number, setNumber] = useState("1")
    const [description, setDescription] = useState(1);
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
    const update= async ()=>{
     try{
        const result = await axios.put(`http://localhost:5000/cart`,{
            productId:id,
            itemcount:number
        })
        console.log(result);
     }catch(err){
        console.log(err);
     }
        handleClose()
    }
const getAllProductsByUserId =async ()=>{
    try{
        const result =await axios.get(`http://localhost:5000/cart`,  {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
       
        dispatch(setCart(result.data.result))

    }catch(error){
        console.log(error);
    }
}

const DeleteProductById = async ()=>{
    try{
        const result = await axios.delete(`http://localhost:5000/cart/${id}`,  {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          console.log(result);
    }catch(err) {
        console.log(err);
    }
    handleClickDelClose()
    handleClose()
}

useEffect(()=>{
    getAllProductsByUserId()
    console.log(token);
},[open])
  return (
    <div
    
    className='all-products'
  >{token===null ?(
    <h1>log in first</h1>
  ):
   (<>{cart.length === 0 ? (
      <h1>no products yet</h1>
    ) : (
      cart.map((product, index) => {
  
        return (
         <div 
           
            key={index}
          >
            <Card className='product'
              onClick={(e) => {
                handleClickOpen();
                setName(product.title);
                setImg(product.image);
                setId(product.product_id);
                setPrice(product.price)
                setDescription(product.itemcount)
                console.log(product.itemcount);
              }}
             

              cover={
                <img
                  
                  src={product.image}
                />
              }
            >
              <Meta
                title={product.title}
                description= {product.description}
              />
            </Card>
          </div>
         
        
        );
      })
    )}</>
    ) }
      {open && <><Modal
        open={open}
        onOk={handleClose}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClickDelOpen}>
            Delete
          </Button>,
          <Button key="submit" type="primary" onClick={update}>
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

        <input type="number" id="quantity" name="quantity" min="1" max="5" onChange={(e)=>{setNumber(e.target.value)
        console.log(e.target.value);}}placeholder='1'></input>
        <p>Number of items : {description} </p>
        <p> Price of items : {description*price}</p>
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
          <Button key="submit" type="primary" onClick={DeleteProductById}>
            Yes
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal> </>}
  </div>

  )
}

export default CartComponent
