import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from './Signup.module.css'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function Signup({setOpenSignup}) {

    const router = useRouter();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //error

    const [namerror, setNameerror] = useState(false)
    const [emailerror, setEmailerror] = useState(false)
    const [passworderror, setPassworderror] = useState(false)

    const handleSignup = async () =>{
        try {

            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if(name == "") {
                setNameerror(true)
                return;
            }
            setNameerror(false)
            if(!re.test(email)) {
                setEmailerror(true);
                return;
            }
            setEmailerror(false)
            if(password == "") return;
            setPassworderror(false)


            const res = await axios.post('/api/user/signup',{
                name,
                email,
                password,
            })

            if(res.data.success){
                console.log(res)
                localStorage.setItem("token",res.data.token);
                router.push('/')         
            }

            
        } catch (error) {
            console.log(error)
            console.log("error")
        }
    }

    useEffect(() => {
      if(localStorage.getItem('token')){
        // router.push('/')   
      }
    }, [])
    

  return (
    <div className={styles.mainComponent}>
        <div className={styles.signupBox}>
            <h1 className={styles.heading}><u>Sign up</u></h1>

            <input type='email' placeholder='Name' onChange={(e)=>{setName(e.target.value)}} className={ namerror ? styles.inputBoxError : styles.inputBox }></input>
            <input type='email' placeholder='Email'  className={ emailerror ? styles.inputBoxError : styles.inputBox } onChange={(e)=>{setEmail(e.target.value)}}></input>
            <input placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} className={ passworderror ? styles.inputBoxError : styles.inputBox }></input>

            <div className={styles.button} onClick={handleSignup}>Submit</div>
            <div className={styles.closebutton} onClick={()=>{setOpenSignup(false)}}>close</div>


        </div>
    </div>
  )
}
