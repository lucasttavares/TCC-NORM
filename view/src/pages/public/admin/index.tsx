import React, { FormEvent, useState } from 'react';
import { Container } from './styles';
import { Button, Form, Input } from 'antd';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';

const LoginAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await api
      .post('/auth/login-admin', {
        username,
        password,
      })
      .then(resp => {
        console.log(resp);
        localStorage.setItem('token', 'Bearer ' + resp.data.token);
        localStorage.setItem(
          `${process.env.REACT_APP_ADMIN_KEY}`,
          `${process.env.REACT_APP_ADMIN_VALUE}`,
        );
        navigate('/private/admin');
      })
      .catch(err => {
        console.log(err);
        alert('Credenciais inválidas');
      });
  };
  return (
    <Container>
      <p>Admin Login</p>
      <Form layout="vertical">
        <Form.Item label="User:">
          <Input
            placeholder="Digite seu usuário"
            value={username}
            onChange={e => {
              setUsername(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item label="Senha:">
          <Input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default LoginAdmin;
