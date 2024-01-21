import React, { forwardRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

 const PracticeCaptcha =forwardRef(({ onChange }, ref)  => {
    const key = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
        
    const handleChange =(value) =>  {
        console.log("Captcha value:", value);
        onChange(value);
      }

    return (        
        <ReCAPTCHA
            ref={ref}
            sitekey={key}
            onChange={handleChange}
        />                
    )
})

export default PracticeCaptcha;
