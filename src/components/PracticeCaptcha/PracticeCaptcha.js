import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

 const PracticeCaptcha = ({onChange}) => {
    const key = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
        
    const handleChange =(value) =>  {
        console.log("Captcha value:", value);
        onChange(value);
      }

    return (        
        <ReCAPTCHA
            sitekey={key}
            onChange={handleChange}
        />                
    )
}

export default PracticeCaptcha;
