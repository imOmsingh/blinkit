import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import styles from './Signup.module.css'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Usercontext from '../../Context/Usercontext/Usercontext'

export default function Login({setOpenLogin}) {

    const router = useRouter();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //error

    const [namerror, setNameerror] = useState(false)
    const [emailerror, setEmailerror] = useState(false)
    const [passworderror, setPassworderror] = useState(false)

    //context
    const usercontext = useContext(Usercontext);
    const {user,setUser, getUserInformation} = usercontext;

    const handleSignup = async () =>{
        try {

            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if(!re.test(email)) {
                setEmailerror(true);
                return;
            }
            setEmailerror(false)
            if(password == "") return;
            setPassworderror(false)

            console.log(email)

            const res = await axios.post('/api/user/login',{
                email,
                password,
            })

            if(res.data.success){
                localStorage.setItem("token",res.data.token);
                getUserInformation(res.data.token)
                setUser(true)
                setOpenLogin(false)
                router.push('/')         
            }
        } catch (error) {
            console.log(error)
            console.log("error")
        }
    }

    useEffect(() => {
      if(localStorage.getItem('token')){
        router.push('/')   
      }
    }, [])
    

  return (
    <div className={styles.mainComponent}>
        <div className={styles.signupBox}>
            <h1 className={styles.heading}><u>Login</u></h1>

            <input placeholder='Email'  className={ emailerror ? styles.inputBoxError : styles.inputBox } onChange={(e)=>{setEmail(e.target.value)}}></input>
            <input placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} className={ passworderror ? styles.inputBoxError : styles.inputBox }></input>

            <div className={styles.button} onClick={handleSignup}>Submit</div>
            <div className={styles.closebutton} onClick={()=>{setOpenLogin(false)}}>close</div>

        </div>
    </div>
  )
}
