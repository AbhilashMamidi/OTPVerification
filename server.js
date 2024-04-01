var exepress=require('express');
var app=exepress();
var bodyParaser=require('body-parser');
var cors=require('cors');

app.use(cors('*'));
app.use(bodyParaser.urlencoded({extended:false}));
app.use(bodyParaser.json());

var nm=require('nodemailer');
let savedOTPS={

};
var transporter=nm.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:'abhilashmamidi22@gmail.com',
        pass:'Abhi@22$*',
    }

})

app.post('/sendotp',(req,res)=>{
    let email=req.body.email;
    let digits='0123456789';
    let limit=4;
    let otp='';
    for(let i=0;i<limit;i++){
        otp+=digits[Math.floor(Math.random()*10)];
    }
    var options={
        from:'pintumamdidi22@gmail.com',
        to:`${email}`,
        subject:"Testing Node emails",
        html:`<p>Enter the OTP ${otp} to specify your email address</p>`
    }
    transporter.sendMail(
        options,function(error,info){
            if(error){
                console.log(error);
                res.status(500).send("coudn't send")
            }
            else{
                savedOTPS[email]=otp;
                setTimeout(()=>{
                    delete savedOTPS.email
                },60000
                )
                res.send("send otp")
            }
        }
    )
})

app.post('/verify',(req,res)=>{
 let otpreceived=req.body.otp;
 let email=req.body.email;
 console.log(email,otpreceived);
 console.log(savedOTPS);
 if(savedOTPS[email]==otpreceived){
    res.send("Verified");
 }
 else{
    res.status(500).send("Invalid OTP")
 }
})

app.listen(4000,()=>{
    console.log("started")
})