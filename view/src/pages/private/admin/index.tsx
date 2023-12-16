import React, { FormEvent, useState } from 'react';
import { Button, DatePicker, Form, Input, Select, notification } from 'antd';
import { Container } from './styles';
import api from '../../../services/api';
import { Link, useNavigate } from 'react-router-dom';

const FormAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [pdf, setPdf] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [course, setCourse] = useState('');
  const [date, setDate] = useState<any>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const key = localStorage.getItem('token');

    const formData = new FormData();
    if (pdf) {
      formData.append('pdf', pdf);
    }
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('course', course);
    formData.append('date', date);

    try {
      const resp = await api.post('/norm/addNorm', formData, {
        headers: {
          Authorization: `${key}`,
        },
      });
      console.log(resp);
      notification.success({
        message: 'Publicação bem sucedida',
      });
    } catch (err: any) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        notification.warning({
          message: 'Token expirado',
          description: 'Por favor, faça login novamente',
        });
        navigate('/admin');
      }
    }
  };

  function clearStorage() {
    localStorage.clear();
  }

  return (
    <Container>
      <h1>Admin Form</h1>
      <Form layout="vertical">
        <Form.Item label="Titulo:">
          <Input
            placeholder="Digite o titulo do documento"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Arquivo (apenas pdf):">
          <Input
            type="file"
            onChange={e => {
              if (e.target.files && e.target.files.length > 0) {
                const selectedFile = e.target.files[0];
                setPdf(selectedFile);
              }
            }}
          />
        </Form.Item>
        <Form.Item label="Descrição:">
          <Input
            placeholder="Digite a descrição do documento"
            value={description}
            onChange={e => {
              setDescription(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Selecione a Data de publicação">
          <DatePicker
            format={'DD/MM/YYYY'}
            onChange={(value: any) => {
              const formatDate = new Date(value).toISOString().split('T')[0];
              setDate(formatDate);
            }}
          />
        </Form.Item>
        <Form.Item label="Tipo de documento:">
          <Select
            placeholder="Selecione o tipo de publicação desejada"
            onChange={value => {
              setType(value);
            }}
            options={[
              {
                label: 'Institucional',
                value: 'Institucional',
              },
              {
                label: 'Edital',
                value: 'Edital',
              },
              {
                label: 'Informativo',
                value: 'Informativo',
              },
              {
                label: 'Lista',
                value: 'Lista',
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Curso:">
          <Select
            placeholder="Selecione para qual curso a publicação é destinada"
            onChange={value => {
              setCourse(value);
            }}
            options={[
              {
                label: 'Análise e Desenvolvimento de Sistemas',
                value: 'Análise e Desenvolvimento de Sistemas',
              },
              {
                label: 'Automação Industrial',
                value: 'Automação Industrial',
              },
              {
                label: 'Computação e Informática',
                value: 'Computação e Informática',
              },
              {
                label: 'Desenho de Construção Civil (PROEJA)',
                value: 'Desenho de Construção Civil (PROEJA)',
              },
              {
                label: 'Edificações',
                value: 'Edificações',
              },
              {
                label: 'Eletromecânica',
                value: 'Eletromecânica',
              },
              {
                label: 'Engenharia Civil',
                value: 'Engenharia Civil',
              },
              {
                label: 'Engenharia de Controle e Automação',
                value: 'Engenharia de Controle e Automação',
              },
              {
                label: 'Informática',
                value: 'Informática',
              },
              {
                label: 'Licenciatura em Matemática',
                value: 'Licenciatura em Matemática',
              },
              {
                label: 'Meio Ambiente (PROEJA)',
                value: 'Meio Ambiente (PROEJA)',
              },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Publicar documento
          </Button>
        </Form.Item>
      </Form>
      <Link to={'/admin'} onClick={clearStorage}>
        Sair
      </Link>
    </Container>
  );
};

export default FormAdmin;
