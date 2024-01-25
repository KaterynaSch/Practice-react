import React, { forwardRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

 const PracticeCaptcha =forwardRef(({ onChange }, ref)  => {
    // const key = '6LeiHlYpAAAAAAUZdmy1Ovkjl7Ww-F4DbP_LvT_1'
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
    );
});

export default PracticeCaptcha;

// import React, { useState } from 'react';
// import ReCAPTCHA from 'react-google-recaptcha';

// const RegisterForm = () => {
//   const [recaptchaToken, setRecaptchaToken] = useState('');

//   const handleRecaptchaChange = (token) => {
//     setRecaptchaToken(token);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Отримайте `recaptchaToken` та відправте його разом з іншими даними на сервер для перевірки.
//     console.log('recaptchaToken:', recaptchaToken);
//     // Додаткова логіка для обробки реєстрації...
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Додайте компонент ReCAPTCHA */}
//       <ReCAPTCHA
//         sitekey="ВАШ_SITE_KEY"
//         onChange={handleRecaptchaChange}
//       />
//       <button type="submit">Зареєструватися</button>
//     </form>
//   );
// };

// export default RegisterForm;

// перевірка токену на сервері
// const axios = require('axios');

// Функція для перевірки токену reCAPTCHA на сервері
// async function verifyRecaptchaToken(token) {
//   const secretKey = 'ВАШ_SECRET_KEY';
//   const url = 'https://www.google.com/recaptcha/api/siteverify';

//   try {
//     const response = await axios.post(url, null, {
//       params: {
//         secret: secretKey,
//         response: token,
//       },
//     });

//     const { success, score } = response.data;
//     // Результат перевірки токену
//     return { success, score };
//   } catch (error) {
//     console.error('Помилка перевірки reCAPTCHA токену:', error);
//     return { success: false, score: 0 };
//   }
// }


// const token = 'ТОКЕН_З_КЛІЄНТА';
// verifyRecaptchaToken(token)
//   .then((result) => {
//     console.log('Результат перевірки:', result);
//     // Обробка результату перевірки токену
//   })
//   .catch((error) => {
//     console.error('Помилка перевірки токену:', error);
//   });
