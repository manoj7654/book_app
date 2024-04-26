const {UserModal}=require("../modal/userModal");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")

require("dotenv").config()

const register=async(req,res)=>{
    const {name,email,phone,password}=req.body;
    try {
        const result=await UserModal.find({email});
        if(result.length){
            return res.json({message:"Email already exists"})
        }
        bcrypt.hash(password,5,async(err,secure_password)=>{
            if(err){
                res.json(err.message)
            }else{
                const user=new UserModal({name,email,phone,password:secure_password});
                await user.save();
            }

        })
       
        res.status(201).json({message:"User added successfully"})
    } catch (error) {
        res.send(error.message)
    }
}

const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await UserModal.find({email});
        if(user.length>0){
          bcrypt.compare(password,user[0].password,(err,result)=>{
            if(result){
                const token=jwt.sign({userId:user[0]._id},process.env.key)
                res.status(200).json({message:"login successfull","token":token})
            }else{
                res.status(401).json(err)
            }
          })
        }else{
            res.send(err.mesage)
        }
    } catch (error) {
        res.send(error.message)
    }
}

module.exports={register,login}