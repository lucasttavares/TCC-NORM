import React, { FormEvent, useState } from 'react';
import {
  Container,
  Content,
  FormContainer,
  FormLogin,
  Label,
  Title,
} from './styles';
import { Button, Form, Input, notification } from 'antd';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { setStorage } from '../../../utils/storage';

const LoginAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    await api
      .post('/auth/login-admin', {
        username,
        password,
      })
      .then(resp => {
        setStorage('token', 'Bearer ' + resp.data.token);
        setStorage(
          `${process.env.REACT_APP_ADMIN_KEY}`,
          `${process.env.REACT_APP_ADMIN_VALUE}`,
        );
        navigate('/private/home');
      })
      .catch(err => {
        console.log(err);
        notification.warning({ message: 'Credenciais inválidas' });
      });
  };
  return (
    <Container>
      <Content>
        <Title>Norm | Admin</Title>
        <FormContainer>
          <FormLogin layout="vertical">
            <Label label="Usuário:">
              <Input
                placeholder="Digite seu usuário"
                value={username}
                onChange={e => {
                  setUsername(e.target.value);
                }}
              />
            </Label>

            <Label label="Senha:">
              <Input.Password
                placeholder="Digite sua senha"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
            </Label>
            <Form.Item>
              <Button type="primary" onClick={handleSubmit}>
                Entrar
              </Button>
            </Form.Item>
          </FormLogin>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default LoginAdmin;
