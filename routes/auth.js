const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const secretKey = 'gTRvhb89^&^&%';

router.post('/register',async (req,res)=>{
    try{
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.body.password,salt);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
} catch(err){
    console.log(err);
    res.status(500).json(err);
}
})

router.post('/login',async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username});
        bcrypt.compare(req.body.password, user.password, (error,success)=>{
            if(error){
                res.status(500).json({accessToken:''});
            }else if(success){
                const accessToken = jwt.sign({
                    id: user._id,
                    isAdmin: user.isAdmin
                },secretKey,{expiresIn:'10h'});
                const {password,...others} = user._doc;
                res.status(200).json({...others, accessToken});
            }else{res.send({accessToken:''})}
        })
    } catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;