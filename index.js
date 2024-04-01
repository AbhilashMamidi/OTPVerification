let emailEle=document.querySelector('.email');
let successEle=document.querySelector('.success');
let errorEle=document.querySelector('.error')
let verfEle=document.querySelector('.verification');
let emailpartialEle=document.querySelector('.emailpartial');
let otp_inputs=document.querySelectorAll('.otp_num')
let otp_check='';
let email;
let regEx=new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');


otp_inputs.forEach(
    (ip)=>{
        ip.addEventListener('keyup',moveNext);
    }
)
function moveNext(event){
    let current=event.target;
    let index=current.classList[1].slice(-1);
    if(event.keyCode==8 && index>1){
        current.previousElemnetSibling.focus()
    }
    else if(index<4){
        current.nextElementSibling.focus()
    }
    otp_check='';
    for(ip of otp_check){
        otp_check+=ip.value;
    }
    if(otp_check.length==4){
        verifyOTP()
    }
}
function verifyOTP(){
    fetch('http://localhost:4000/verify',{
        method:'POST',
        body:JSON.stringify({
            'email':`${email}`,
            "otp":`${otp_check}`
        }),
        headers: {'content-Type':'application/json'}
    }
    ).then(
        (res)=>{
           if(res.status==200){
              verfEle.style.display='none';
              successEle.style.display='block';
              errorEle.style.display='none';
           }
           else{
            errorEle.style.display='block';
            errorEle.innerHTML="Invalid OTP";
            successEle.style.display='none';
           }
        }
       )

}

function sendOTP(){
     email=emailEle.value;
    if(regEx.test(email)){
       fetch('https://localhost:4000/sendotp',{
        method:'POST',
        body:JSON.stringify({
            "email":`${email}`
        }),
        headers:{'content-Type':'application/json'}
       })
       .then(
        (res)=>{
           if(res.status==200){
              verfEle.style.display='block';
              emailpartialEle.value="****"+email.slice(4);
              emailEle.value='';
           }
           else{
            errorEle.style.display='block';
            errorEle.innerHTML="Email Not Exist";
            successEle.style.display='none';
           }
        }
       )
    }
    else{
            errorEle.style.display='block';
            errorEle.innerHTML="Invalid Email";
            successEle.style.display='none';
    }
}