const express = require('express');
const app = express();
const PORT = 2000;

const accountSid = "AC970fd6b8170e1db00b8d5649050eb525";
const authToken = "f3509b5ae2e6539af53cb8fe02ca8f75";
const serviceId = "VA1065707f3fb298c2214cee232783c179"
const client = require('twilio')(accountSid, authToken);


// app.use(express.static("public"));
app.use(express.json());


// app.get("/",(req,res)=>{
// res.sendFile(__dirname + "/public/index.html")
// });
app.get("/",(req,res)=>{
  res.status(200).json({
    message:'Welcome to our OTP server'
  })
})

app.post("/send-verification-otp",(req,res) => {

    const {mobileNumber} = req.body;

    client.verify.services(serviceId)
             .verifications
             .create({to: '+91'+mobileNumber, channel: 'sms'})
             .then(verification => {
                return res.status(200).json({verification})
             }).catch(error => {
                return res.status(400).json({error})
             });
})

app.post('/verify-otp',(req,res)=>{
    const {mobileNumber, code} = req.body;

    client.verify.services(serviceId)
      .verificationChecks
      .create({to: '+91'+mobileNumber, code: code})
      .then(verification_check => {
        return res.status(200).json({verification_check})
      }).catch(error => {
        return res.status(400).json({error})
    });
})
app.listen(PORT, ()=>{
    console.log("server running our port " + PORT)
})
