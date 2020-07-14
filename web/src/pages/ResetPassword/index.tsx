import React, { useRef, useCallback } from 'react';

import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErros';

import { Container, Content, AnimationContainer, Background } from './styles';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  passwordConfirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const location = useLocation();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('Password required'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Different Passwords',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { token } = queryString.parse(location.search);

        if (!token) {
          throw new Error();
        }

        // Doesn't make sense to await this action
        api.post('/password/reset', {
          password: data.password,
          passwordConfirmation: data.passwordConfirmation,
          token,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'An error ocurred while reseting your password, please try again ',
        });
      }
    },
    [addToast, history, location.search],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Reset password</h1>
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="New password"
            />
            <Input
              name="passwordConfirmation"
              icon={FiLock}
              type="password"
              placeholder="New password confirmation"
            />
            <Button type="submit">Change password</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};
export default ResetPassword;
