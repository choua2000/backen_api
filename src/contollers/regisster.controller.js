const Register = require('../models/register.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// signup user
exports.signup = async (req, res) => {
    try {
        const { firstName, email, password, phone } = req.body;
        if(!firstName || !email || !password || !phone){
            return res.status(404).json({message:"please input data"})
        }
        const data = await Register.findOne({ where: { phone } });
        if (data) {
            return res.status(404).json({ message: "exist phone" })
        }
        
        const newPassword = await bcrypt.hash(password, 10)
        const register = await Register.create({
            firstName,
            email,
            password: newPassword,
            phone
        })
        
        return res.status(200).json(register)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}

// login user
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await Register.findOne({where:{email:email}})
        if (!data) {
            return res.status(404).json({ message: "this data not found" })
        }
        const checkPass = await bcrypt.compare(password, data.password);
        if (!checkPass) {
            return res.status(404).json({ message: "you password incorrect" })
        }
        const token = await jwt.sign({
            firstName: data.firstName,
            email: data.email,
            password: data.password,
            phone: data.phone
        }, 'Register', { expiresIn: "24h" })
        return res.status(200).json({ message: "successfully", Token: token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}

// select user
exports.select = async (req, res) => {
    try {
        const data = await Register.findAndCountAll({});
        if (!data) {
            return res.status(404).json({ message: "not found" })
        }
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}

//get_id user

exports.getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Register.findByPk(id);
        if (!data) {
            return res.status(404).json({ message: "data not found" })
        }
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}

//  update user 

exports.update = async (req, res) => {
    try {
      const {id} = req.params;
      const {firstName,email,password,phone} = req.body;
      const data = await Register.findByPk(id);
      if(!data){
        return res.status(404).json({message:"not found"})
      }
      const newPassword = await bcrypt.hash(password, 10);
      const register = await data.update({
        firstName,
        email,
        password: newPassword,
        phone
      })
      return res.status(200).json(register);
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}

// delete user

exports.delete = async (req,res) =>{
    try {
        const {id} = req.params;
        const register = await Register.destroy({where:{id:id}});
            if(register){
                return res.status(201).json({message:"deleted success"})
            }
            return res.status(404).json({message:"not found"})
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
}

