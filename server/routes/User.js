const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

router.post('/signup',async (req,res)=>{
    try {
        const { name, email, password } = req.body;

        if(!email || !name || !password){
            return res.status(200).json({success:false,message:"Not enough data"});
        }
    
        const checkEmail = await User.find({email});
        if(checkEmail.length !== 0){
            return res.status(500).json({success:false,message:"User already exist"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const createdUser = await  User.create({ name,password:hashedPassword,email })

        if(!createdUser){
            return res.status(500).json({success:false,message:"User can not created"});
        }

        const payload = {
            user: {
              id: createdUser.id,
            },
          };
    
          jwt.sign(
            payload,
            "Secret_key",
            { expiresIn: '7 days' },
            (err, token) => {
              if (err) throw err;
              return res.status(200).json({ success:true, token });
            }
          );
    
        // res.status(200).json({success:true,message:"User is added",User:createdUser});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:'User can not be created',error:error.message});

    }

})


router.post('/login', async (req,res)=>{

    try {

        
        const { email , password  } = req.body;
    
        const user = await User.find({email});
        if(user.length == 0){
            return res.status(500).json({success:false,message:"User can not fetched"});
        }
        const match = await bcrypt.compare(password, user[0].password);
        if(! match){
            return res.status(500).json({success:false,message:"User cred invalid"});
        }

        const payload = {
            user: {
              id: user[0]._id.toString(),
            },
          };

        //   console.log("lohhing",user[0]._id.toString(),user)
    
          jwt.sign(
            payload,
            "Secret_key",
            { expiresIn: '7 days' },
            (err, token) => {
              if (err) throw err;
              return res.status(200).json({ success:true, message:"Logged in", token });
            }
          );

        // res.status(200).json({success:true,message:"Logged in",user});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:'User can not be logged in',error});

    }

})

router.get('/userdetails', auth, async (req,res)=>{

    try {
        
        const details = await User.findById(req.user.id);
        if(!details) return res.status(500).json({success:false,message:"User Invalid"});
        res.status(200).json({success:true,message:"Details Fecthed", User:details});

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:'User can not be logged in',error});
    }
    
})
































router.get('/getuserbyid',async (req,res)=>{

    try {

        const query = req.query;
        const { id  } = query;
    
        const user = await User.findById(id);
        if(!user){
            return res.status(500).json({success:false,message:"user can not fetched"});
        }
    
        res.status(200).json({success:true,message:"User is fetched",user});
        
    } catch (error) {
        
        res.status(500).json({success:false,message:'User can not be fetched',error});

    }

})

router.get('/rankingbycodeforces',async (req,res)=>{

    try {

        const query = req.query;
        const { id  } = query;
    
        const student = await User.find({college:id}).sort({codeforce_rating:"desc"});
        if(!student){
            return res.status(500).json({success:false,message:"students can not fetched"});
        }
    
        res.status(200).json({success:true,message:"students is fetched",student});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:'students can not be fetched',error:error.message});

    }

})

router.put('/edituser',async (req,res)=>{

    try {
        const updatedUser = {};
        const { id } = req.body;
        if(req.body.name){
            updatedUser.name = req.body.name;
        }
        if(req.body.codeforce_rating){
            updatedUser.codeforce_rating = req.body.codeforce_rating;
        }
        console.log(updatedUser)
    
        const user = await User.findByIdAndUpdate(id,updatedUser);
        if(!user){
            return res.status(500).json({success:false,message:"user can not fetched"});
        }
    
        res.status(200).json({success:true,message:"User is fetched",user});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:'User can not be fetched',error:error.message});

    }

})



module.exports = router;