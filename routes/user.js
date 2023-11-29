const router = require("express").Router();
const  User  = require("../model/userSchema");
const bcrypt =  require("bcryptjs")
const JWT = require("jsonwebtoken")


//importing validation
const { 
    registerValidation, 
    loginValidation } = require('../validations/Validations');

router.get('/', (req, res) => {
    res.send("inside the auth")
})


//Regitering User

router.post('/register', async (req, res) => {
    //validationg user details
    const { error } = registerValidation(req.body);
    
    //throw validation error object
    if(error) return res.status(400).send(error.details[0].message)

    //checking if email already exist
    const emailExist = await User.findOne({ email: req.body.email })
   if(emailExist) return res.status(400).send({msg:'Email already exist'});
   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
    const user = new User({
    name : req.body.name,
    email : req.body.email,
    password: hashedPassword
   })

   try {
    const newUser = await user.save();
     res.status(200).send({success: true, data:{ id: newUser._id}})
   } catch (error) {
     res.status(400).send({success: false, error: error.message})
   }
})

//Logging User 

router.post('/login',  async (req, res) => {
    //validation of user details
    const { error } = loginValidation(req.body);

    //throw validation error object
    if(error) return res.status(400).send(error.details[0].message)

    //checking cred in db
    const user = await User.findOne({ email: req.body.email })
    if(!user) return res.status(400).send({msg:'Invalid email'});
     
     //validating password
    const validPass = await bcrypt.compare(req.body.password, user.password )
    if(!validPass) return res.status(400).send({msg:'Invalid  password'});

    //creating  token for user
    const token = JWT.sign({_id: user._id}, process.env.USER_TOKEN);
    res.header('auth-token', token)
    .status(200)
    .send({ success: true, token: token, });
})

module.exports = router;