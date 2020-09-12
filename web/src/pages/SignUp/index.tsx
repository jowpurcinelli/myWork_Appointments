import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import api from '../../services/api';

//Hook
import { useToast } from '../../hooks/toast';

//Toast
import getValidationErrors from '../../utils/getValidationErros';

//Components
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container,  Content,  AnimationContainer,  Background } from './styles';
import { useContext } from 'react';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { logo } = useContext( ThemeContext )
  
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast( );
  const history = useHistory( );

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({ });

        const schema = Yup.object().shape({
          name: Yup.string().required('Name required'),
          email: Yup.string()
            .email('Insert a valid e-mail ')
            .required('Email required'),
          password: Yup.string().min(6, 'Mínimum of 6 dígits'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push( '/' )

        addToast({
          type: 'success',
          title: 'Registration completed.',
          description: 'Now you can logIn!',
        })

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors);

        return
        }

        addToast({
          type: 'error',
          title: 'Registration Error ',
          description: 'An error ocurred while doing your registration, please try again',
        })
      }
    },
    [ addToast, history ],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={ logo } alt="logo" />
          
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <Input name="name" icon={FiUser} type="text" placeholder="Name" />
            <Input
              name="email"
              icon={FiMail}
              type="email"
              placeholder="E-mail"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />
            <Button type="submit">SignUp</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Go back to login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default SignUp;
