import React from "react";
import { useState } from "react";
import Usercontext from "./Usercontext";
import axios from "axios";


const Userstate = (props) => {
  const [user, setUser] = useState(false);
  const [userName, setUserName] = useState("");
  const [id, setId] = useState("");


  const getUserInformation = async (token) =>{
    try {
      console.log(token)
        const res = await axios.get('/api/user/userdetails',
        {
          headers: {token}
        });
        console.log(res)
        setUserName(res.data.User.name)


    } catch (error) {
      console.log(error)
    }
  }


  return (
    <Usercontext.Provider
      value={{
        user,
        userName,
        setUser,
        setUserName,
        setId,
        id,
        getUserInformation
      }}
    >
      {props.children}
    </Usercontext.Provider>
  );
};

export default Userstate;
