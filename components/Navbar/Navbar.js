import React, { useContext } from 'react'
import styles from './Navbar.module.css'
import Image from 'next/image'
import logo from "../../public/logo.png";
import Usercontext from '../../Context/Usercontext/Usercontext';


export default function Navbar({setOpenSignup, setOpenLogin}) {

    //context
    const usercontext = useContext(Usercontext);
    const {user,setUser, userName} = usercontext;

    const handleLogout = () =>{
        localStorage.removeItem('token');
        setUser(false)
    }

  return (
    <div className={styles.navbody}>
        {/* <Image src={'/close.png'} width={30} height={80}/> */}
        <img
            alt="FPlogo"
            // style={{width:'100px'}}
            src="logo.png"
            width={150}
            height={50}
            quality={10}
        />
        {
            !user ?
            <div className={styles.buttonBody}>
                <div onClick={()=>{setOpenLogin(true)}} className={styles.login}>Login</div>
                <div onClick={()=>{setOpenSignup(true)}} className={styles.signup}>Sign Up</div>
            </div>
            :
            <div className={styles.buttonBody}>
                <div className={styles.userBody}>
                    <div className={styles.userLogo}>Welcome! {userName}</div>
                </div>
                <div onClick={handleLogout} className={styles.signup}>logout</div>
            </div>

            
        }
        
    </div>
  )
}
