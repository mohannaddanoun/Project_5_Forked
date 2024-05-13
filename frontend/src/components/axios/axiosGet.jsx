import React from 'react'
import axios from 'axios';

export const axiosGet=async () =>{
  try{ 
    const result = await axios.get(url,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (result.data.success) {
      setArticles(result.data.result);
      setMessage("");
    } else throw Error;
  }
  catch (error) {
    if (!error.response.data.success) {
      return setMessage(error.response.data.message);
    }
    setMessage("Error happened while Get Data, please try again");
  }
}
