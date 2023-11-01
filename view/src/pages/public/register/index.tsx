import React, { type FormEvent, useState } from 'react';
import { Container } from './styles';
import { Button, Form, Input } from 'antd';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await api
      .post('/auth/register', {
        name,
        email,
        password,
      })
      .then(resp => {
        console.log(resp);
        navigate('/login');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <Container>
      <Form layout="vertical">
        <Form.Item label="Nome:">
          <Input
            placeholder="Digite seu nome"
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          />
        </Form.Item>

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
            placeholder="Digite sua senha"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Confirmar
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default Register;
