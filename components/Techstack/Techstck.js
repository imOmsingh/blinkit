import React from 'react'
import styles from './Techstck.module.css'

export default function Techstck() {
  return (
    <div style={{paddingBottom:'100px', paddingLeft:'20px'}}>
        <h1 style={{textAlign:'center', marginBottom:'30px'}}><u>Tech Stack</u></h1>
        <h2 className={styles.midText}><u>Frontend</u></h2>
        <h4 className={styles.simpleTextEnd}>- Next.js</h4>
        <h2 className={styles.midText}><u>Backend</u></h2>
        <h4 className={styles.simpleText}>- Express</h4>
        <h4 className={styles.simpleTextEnd}>- Node.js</h4>
        <h2 className={styles.midText}><u>Database</u></h2>
        <h4 className={styles.simpleTextEnd}>- MongoDB</h4>
        <h2 className={styles.midText}><u>Authentication</u></h2>
        <h4 className={styles.simpleText}>- Password Hashing: Utilized bcrypt for secure password hashing, enhancing user data protection.</h4>
        <h4 className={styles.simpleText}>- Token-based Authentication: Implemented JSON Web Tokens (JWT) for secure token generation upon user login.</h4>
        <h4 className={styles.simpleText}>- Database Integration: Employed MongoDB for efficient data storage, ensuring scalability and reliability.</h4>
        <h4 className={styles.simpleText}>- Browser State Management: Stored JWT tokens in the browser's local storage to persist user authentication state.</h4>
        <h4 className={styles.simpleText}>- Frontend State Handling: Leveraged React's useContext hook to manage and access user authentication state across components.</h4>
        <h4 className={styles.simpleTextEnd}>- Contextual Data Fetching: Employed the useContext hook to fetch and use user state on specific pages, enhancing modularity and code organization.</h4>
        <h2 className={styles.midText}><u>Image Uploading</u></h2>
        <h4 className={styles.simpleText}>- Middleware Integration: Integrated Multer as middleware to handle file uploads in the Express.js backend.</h4>
        <h4 className={styles.simpleText}>- Configured Multer to efficiently handle and store uploaded image files.</h4>
        <h4 className={styles.simpleTextEnd}>- Contextual Data Fetching: Employed the useContext hook to fetch and use user state on specific pages, enhancing modularity and code organization.</h4>
        <h2 className={styles.midText}><u>API's</u></h2>
        <h4 className={styles.simpleText}>- /api/user/login : To login users</h4>
        <h4 className={styles.simpleText}>- /api/user/signup : To signup users</h4>
        <h4 className={styles.simpleText}>- /api/user/userdetails : To upload images</h4>
    </div>
  )
}
