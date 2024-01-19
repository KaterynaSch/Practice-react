import { Formik, Form, Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

import  PracticeCaptcha  from 'components/PracticeCaptcha/PracticeCaptcha';


const QuizSchema = Yup.object().shape({
    topic: Yup.string().min(3, 'Too Short!').required('Required'),
    time: Yup.number().min(10, 'Min 10 mins').max(30, 'Max 30 mins').required('Required'),
    questions: Yup.number().min(5, 'Min 5 questions').max(20, 'Max 30 questions').required('Required'),
    level: Yup.string().oneOf(['beginner', 'intermediate', 'advanced']).required('Required')    
})

export const QuizForm = ({onAdd}) => {
  const [captchaValue, setCaptchaValue] = useState('');
    return (      
        <Formik
        initialValues={{//початкове значення
          topic: '',
          time: 0,
          questions: 0,
          level: 'beginner'
        }}
        validationSchema={QuizSchema}
        onSubmit={ (values, actions) => {
          console.log(values);//дані з полів форми
          onAdd(values);//додавання нового квіза при submit
          actions.resetForm();//очищення полів форми при submit
        }}
      >
        <Form>
            <label >
                Topic
                <Field  name="topic" placeholder="Topic" />
                <ErrorMessage name= 'topic'/>
            </label>
            <label >
                Time
                <Field type='number' name="time" placeholder="Time" />
                <ErrorMessage name='time'/>
            </label>
            <label >
                Questions
                <Field type='number' name="questions" placeholder="Questions" />
                <ErrorMessage name= 'questions'/>
            </label>
            <label >
                Level
                <Field as="select" name="level">             
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>             
                </Field>
                <ErrorMessage name= 'level'/>
            </label> 
            <PracticeCaptcha onChange={setCaptchaValue}/> 
            { captchaValue && <button type='submit'>Add quiz</button>}          
        </Form>
      </Formik>        
    );
};
