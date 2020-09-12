import React, { useCallback, useRef, ChangeEvent } from 'react';

import { FiArrowLeft, FiMail, FiLock, FiUser, FiCamera } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import { Container,  Content, AvatarInput } from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  oldPassword: string;
  passwordConfirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name required'),
          email: Yup.string()
            .email('Insert a valid e-mail')
            .required('Email required'),
          oldPassword: Yup.string(),
          password: Yup.string().when('oldPassword', {
            is: String,
            then: Yup.string().min(6),
            otherwise: Yup.string(),
          }),
          passwordConfirmation: Yup.string()
            .when('oldPassword', {
              is: String,
              then: Yup.string().required('Field required'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], 'Different passwords'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          oldPassword,
          password,
          passwordConfirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(oldPassword
            ? {
              oldPassword,
              password,
              passwordConfirmation,
            }
            : {}),
        };

        console.log(formData);

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Profile updated',
          description: 'Your changes were saved sucssesfully',
        });

        history.push('/');
      } catch (err) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        addToast({
          type: 'error',
          title: 'Error updating profile',
          description: 'An error ocurred  while updating your profile',
        });
      }
    },
    [addToast, history, updateUser],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData()

        data.append('avatar', e.target.files[0])

        api
          .patch('/users/avatar', data)
          .then((response) => {
            updateUser(response.data)

            addToast({
              type: 'success',
              title: 'Avatar updated sucssesfully',
            })
          })
          // Unnecessary?
          /*
          .catch(() => {
            addToast({
              type: 'error',
              title: 'Error changing avatar',
            });
          });
          */
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref = {formRef}
          initialData = {{
            name: user.name,
            email: user.email,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>My profile</h1>

          <Input name="name" icon={FiUser} type="text" placeholder="Name" />
          <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />
          
        
          <Input

            name="oldPassword"
            icon={FiLock}
            type="password"
            placeholder="Old password"
          />
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
            placeholder="Confirm your new password"
          />
          
          <Button type="submit">Confirm changes</Button>
        </Form>
      </Content>
    </Container>
  );
};
export default Profile;

  /*            containerStyle={ { marginTop: 24 } } */