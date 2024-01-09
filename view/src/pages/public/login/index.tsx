import React, { type FormEvent, useState } from 'react';
import { Container } from './styles';
import { Button, Form, Input } from 'antd';
import api from '../../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { setStorage } from '../../../utils/storage';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await api
      .post('/auth/login', {
        email,
        password,
      })
      .then(resp => {
        console.log(resp);
        setStorage('token', 'Bearer ' + resp.data.token);

        navigate('/');
      })
      .catch(err => {
        console.log(err);
        alert('Credenciais inválidas');
      });
  };
  return (
    <Container>
      <p>User Login</p>
      <Form layout="vertical">
        <Form.Item label="E-mail:">
          <Input
            placeholder="Digite seu e-mail"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
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
        <Link to={'/register'}>Registrar-se</Link>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default Login;
