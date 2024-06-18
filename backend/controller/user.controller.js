const Usermod = require('../models/usermodel.js')

const signin = async (req, res) =>{
    try{
        const {email, password} = req.body
        Usermod.findOne({email: email})
            .then(user=>{
                if(user){
                    if(user.password === password){
                        res.json("successful")
                    }else{
                        res.json("password is incorrect")
                    }
                }else{
                    res.json("No record existed")
                }
            })
        
    } catch (error){
        res.status(500).json({message: error.message})
    }


}
const signup = async (req, res) =>{
    try {
        if (
            !req.body.lastname ||
            !req.body.firstname ||
            !req.body.email ||
            !req.body.password
        ){
    
            return res.status(400).send({
                  message: "Send all required feilds: firstname, lastname, email, password"
            })
      }
    
        
           const userReg = await Usermod.create(req.body)
            res.status(200).json(userReg)
            
            
    } catch (error) {
            console.log(error)
              res.status(500).json({message: error.message})
        }
}

const forgotpassword = async (req, res) =>{


}

const verifyemail = async () =>{

}

module.exports = {
    signin,
    signup,
    forgotpassword,
    verifyemail
    
}