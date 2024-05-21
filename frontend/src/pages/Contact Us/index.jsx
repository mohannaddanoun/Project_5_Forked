import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_title: '',
    message: ''
  });

  const { token } = useSelector((state) => ({
    token: state.auth.token,
  }));
  const handleChange =(e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmitButton = async(e) => {
    e.preventDefault();
    const input = {
        user_name:formData.user_name,
        user_title:formData.user_title,
        user_message:formData.message
    };
console.log(token);
    try{
        const result = await axios.post("http://localhost:5000/messages",input,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Result",result.data);
    }catch(error){
        console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmitButton} className="mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="user_title"
            value={formData.user_title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="message"
            rows="5"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
