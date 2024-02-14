import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useContext, useEffect, useState } from "react";
import Signup from "../../components/Signup/Signup";
import Login from "../../components/Login/Login";
import Navbar from "../../components/Navbar/Navbar";
import Usercontext from "../../Context/Usercontext/Usercontext";
import Uploadimage from "../../components/Uploadimage/Uploadimage";
import Techstck from "../../components/Techstack/Techstck";
// import Usercontext from '../../Context'


export default function Home() {

  const [openSignup, setOpenSignup] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)

  //context
  const usercontext = useContext(Usercontext);
  const {setUser, getUserInformation} = usercontext;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setUser(true);
      getUserInformation(token);
    }
  }, [])

  return (
    <div>
      
      <Navbar setOpenSignup={setOpenSignup} openSignup={openSignup} setOpenLogin={setOpenLogin}/>
      <Uploadimage/>
      <Techstck/>
      {openSignup && <Signup setOpenSignup={setOpenSignup}/>}
      {openLogin && <Login setOpenLogin={setOpenLogin}/>}

    </div>
  )
}
