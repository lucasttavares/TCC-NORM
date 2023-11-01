import React, { FormEvent, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { Container } from './styles';
import api from '../../../services/api';
import { Link } from 'react-router-dom';

const FormAdmin: React.FC = () => {
  const [title, setTitle] = useState('');
  const [pdf, setPdf] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [course, setCourse] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    if (pdf) {
      formData.append('pdf', pdf);
    }
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('course', course);

    await api
      .post('/norm/addNorm', formData)
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
        alert('Não foi possível concluir a publicação');
      });
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
        <Form.Item label="Tipo de documento:">
          <Input
            placeholder="Digite o tipo do documento"
            value={type}
            onChange={e => {
              setType(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Curso:">
          <Input
            placeholder="Digite para qual curso o documento está direcionado"
            value={course}
            onChange={e => {
              setCourse(e.target.value);
            }}
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
