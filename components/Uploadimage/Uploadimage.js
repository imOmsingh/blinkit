import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from './Uploadimage.module.css'
import ima from './upload.jpg'

export default function Uploadimage() {

    const [file, setFile] = useState();
    const [successFlag, setSuccessFlag] = useState();

    const hadleUpload = async () => {

        try {

            if(!file) return;

            const formData = new FormData()
            formData.append("image", file)

            const result = await axios.post('/api/upload/uploadimage', formData, { headers: {'Content-Type': 'multipart/form-data'}})
            setSuccessFlag(true)

            setTimeout(() => {
                setSuccessFlag(false);
            }, 5000);
            
        } catch (error) {
            console.log(error)
        }

        
    
    }


  return (
    <>
        <div className={styles.mainComponent}>
            {/* <div className={styles.uploadContainer}> */}
            <div className={styles.uploadContainer} type="file" name="profile-files" required  >
                <div className={styles.image}>
                    <img
                        src="upload.jpg"
                        alt="Picture of the author"
                    />
                </div>
                <input
                    filename={file} 
                    onChange={e => setFile(e.target.files[0])} 
                    type="file" 
                    accept="image/*"
                    ></input>

                <div className={styles.text} onClick={hadleUpload}>Upload Image</div>

                
            </div>
            
        </div>
        {
            successFlag &&
            <div className={styles.oaerrorsuccess}>
                <strong>Finally</strong> - Congrats, Image uploaded
            </div>
        }
    </>
  )
}
