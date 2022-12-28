const router = require('express').Router();
const User = require('../models/User');
const Seats = require('../models/Seats');
const { verifyTokenAuth, verifyTokenAdmin} = require('./verifyToken');

router.post("/addseat",verifyTokenAdmin,async(req,res)=>{
    const newSeat = new Seats(req.body);

    try{
        const savedSeat = await newSeat.save();
        res.status(200).json(savedSeat)
    }catch (err){
        res.status(500).json(err);
    }
})


router.put("/book/:id",verifyTokenAuth,async (req,res)=>{
    try{
        const updatedSeat = await Seats.updateOne({_id:req.body.seatid,userId:"empty"},{
            $set:{userId:req.user.id}
        },{new:true});
        res.status(200).json(updatedSeat)
    }catch(err){
        res.status(500).json(err);
    }
});

router.put("/cancel/:id",verifyTokenAuth,async (req,res)=>{
    try{
        const updatedSeat = await Seats.updateOne({userId:req.params.id,_id:req.body.seatid},{
            $set:{userId:'empty'}
        },{new:true});
        res.status(200).json(updatedSeat)
    }catch(err){
        res.status(500).json(err);
    }
});

router.put("/cancel/admin/:seatid",verifyTokenAdmin,async(req,res)=>{
    try{
        const canceledSeat = await Seats.updateOne({_id:req.params.seatid},{
            $set :{userId :'empty'}
        },{new:true});
        res.status(200).json(canceledSeat)
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/',async (req,res)=>{
    try{
        const getseats = await Seats.find();
        res.status(200).json(getseats);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;