import React, { useEffect, useState } from 'react';
import { NormI } from '../../utils/types';
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  notification,
} from 'antd';
import api from '../../services/api';
import timezone from 'dayjs/plugin/timezone';
import dayjs, { tz } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import {
  AdminOptions,
  ConfirmEditButton,
  Container,
  Content,
  DeleteButton,
  Description,
  EditButton,
  Infos,
  Link,
  PopConfirmIcon,
  Title,
} from './styles';
import { clearStorage, getStorage } from '../../utils/storage';

const Norm: React.FC<NormI> = ({
  _id,
  title,
  link,
  description,
  type,
  course,
  date,
  isAdmin = false,
  onEffect,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [norm, setNorm] = useState<NormI>();
  const [editForm] = Form.useForm();
  const navigate = useNavigate();

  const showModal = () => {
    setNorm({ ...norm, title, description, type, course, date });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const key = getStorage('token');

  const deleteNorm = async (id: string) => {
    const key = getStorage('token');
    try {
      await api.delete(`/norm/deleteNorm/${id}`, {
        headers: { Authorization: `${key}` },
      });
      onEffect?.();
    } catch (err: any) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        notification.warning({
          message: 'Token expirado',
          description: 'Por favor, faça login novamente',
        });
        clearStorage();
        navigate('/');
      }
    }
  };

  const editNorm = async (id: string) => {
    await api
      .put(
        `/norm/updateNorm/`,
        { ...norm, _id: id },
        {
          headers: { Authorization: `${key}` },
        },
      )
      .then(resp => {
        notification.success({
          message: 'Edição bem sucedida',
        });
        onEffect?.();
      })
      .catch(err => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          notification.warning({
            message: 'Token expirado',
            description: 'Por favor, faça login novamente',
          });
          clearStorage();
          navigate('/');
        }
      });
    setIsModalOpen(false);
  };

  useEffect(() => {
    editForm.setFieldsValue({
      titulo: norm?.title,
      descricao: norm?.description,
    });
  }, [norm]);

  dayjs.extend(utc);

  return (
    <Container key={_id}>
      <Content>
        <Title>
          <Link href={link} target="_blank" rel="noreferrer">
            {title?.toUpperCase()}
          </Link>
        </Title>
        <Infos>
          <p>{type}</p> <p>{`${dayjs(date).format('DD/MM/YYYY')}`}</p>
          <p>{course}</p>
        </Infos>
        <Description>{description}</Description>
        {isAdmin ? (
          <AdminOptions>
            <EditButton onClick={showModal}>
              <p>Editar</p>
              <FaRegEdit />
            </EditButton>
            <Popconfirm
              title="Tem certeza?"
              description="Deseja mesmo excluir este documento?"
              onConfirm={() => {
                deleteNorm(`${_id}`);
              }}
              okText="Sim"
              cancelText="Não"
              icon={<PopConfirmIcon />}
            >
              <DeleteButton>
                <p>Excluir</p>
                <FaRegTrashAlt />
              </DeleteButton>
            </Popconfirm>
          </AdminOptions>
        ) : null}
        <Divider />
      </Content>

      <Modal
        title="Editar documento"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
        forceRender
      >
        <Form
          layout="vertical"
          form={editForm}
          onFinish={() => editNorm(`${_id}`)}
        >
          <Form.Item
            label="Titulo:"
            name="titulo"
            rules={[{ required: true, message: 'Insira o título' }]}
          >
            <Input
              value={norm?.title}
              onChange={e => {
                setNorm({ ...norm, title: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Descrição:"
            name="descricao"
            rules={[{ required: true, message: 'Insira uma descrição' }]}
          >
            <Input.TextArea
              rows={4}
              value={norm?.description}
              onChange={e => {
                setNorm({ ...norm, description: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="Tipo de Documento:">
            <Select
              value={norm?.type}
              onChange={value => {
                setNorm({ ...norm, type: value });
              }}
              options={[
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
                {
                  label: 'Resolução',
                  value: 'Resolução',
                },
                {
                  label: 'Ofício',
                  value: 'Ofício',
                },
              ]}
            />
          </Form.Item>

          <Form.Item label="Destinação:">
            <Select
              value={norm?.course}
              onChange={value => {
                setNorm({ ...norm, course: value });
              }}
              options={[
                {
                  label: 'Institucional',
                  value: 'Institucional',
                },
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

          <Form.Item label="Data de publicação:">
            <DatePicker
              allowClear={false}
              defaultValue={dayjs.utc(date)}
              format={'DD/MM/YYYY'}
              onChange={(value: any) => {
                setNorm({
                  ...norm,
                  date: new Date(value).toISOString().split('T')[0],
                  year: new Date(value).getFullYear(),
                });
              }}
            />
          </Form.Item>
          <ConfirmEditButton>
            <Button htmlType="submit" type="primary">
              Salvar
            </Button>
          </ConfirmEditButton>
        </Form>
      </Modal>
    </Container>
  );
};

export default Norm;
