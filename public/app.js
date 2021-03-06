const loginForm = document.getElementById("login-form");
const codeInput = document.getElementById("codeInput");
let mobileNumber;
let isOTPDelivered = false;
const baseUrl = `http://localhost:2000/`;
// const baseUrl = `https://mobile-otp-authetication.herokuapp.com/`;

loginForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    mobileNumber = parseInt(document.getElementById('phoneInput').value);
    if(isNaN(mobileNumber)){
        alert(mobileNumber);
    }else{
        if(isOTPDelivered){
            const code = codeInput.value;
            const response = await verifyOTP(mobileNumber, code)
            console.log(response);
            alert(response.status)
            return ;

        }
        const response = await sendVerificationCode(mobileNumber);
        if(response.status === 'pending'){
            codeInput.parentElement.classList.remove('hidden');
            isOTPDelivered = true;

        }
    }

})
async function sendVerificationCode(mobileNumber){
    const res = await axios.post(baseUrl +`send-verification-otp`,{
        mobileNumber
    })
    if(res.status === 200){
        return res.data.verification
    }else{
        return res.data
    }
    
}

async function verifyOTP(mobileNumber,code){
    const res = await axios.post(baseUrl +`verify-otp`,{
        mobileNumber,code
    })
    if(res.status === 200){
        return res.data.verification_check
    }else{
        return res.data
    }
    
}