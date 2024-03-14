import React, { useEffect, useState } from 'react';
import {
  Container,
  Header,
  ContainerButton,
  Row,
  SelectFormItem,
  LogOutDiv,
  Decoration,
  Title,
  InputSearch,
  Content,
  FiltersContent,
  FiltersTitle,
  FormItem,
  MainContent,
  RecentTitle,
  NormsContainer,
  EmptyList,
} from './styles';
import { NormI } from '../../../utils/types';
import api from '../../../services/api';
import {
  Button,
  DatePicker,
  Divider,
  FloatButton,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Upload,
  notification,
} from 'antd';
import Norm from '../../../components/Norm/Norm';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { MdLogout } from 'react-icons/md';
import { clearStorage, getStorage } from '../../../utils/storage';

const HomeAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [norms, setNorms] = useState<NormI[]>([]);
  const [searchNorm, setSearchNorm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');

  const search = async () => {
    try {
      let requestPath = '/norm/getNorms';

      if (searchNorm) {
        requestPath = `/norm/searchNorm/${searchNorm}?type${typeFilter}&year${dateFilter}&course${courseFilter}`;
      } else {
        requestPath = `norm/filter/?type${typeFilter}&year${dateFilter}&course${courseFilter}`;
      }

      const resp = await api.get(requestPath);
      setNorms(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    search();
  }, [norms, searchNorm, typeFilter, dateFilter, courseFilter]);

  const logOut = () => {
    clearStorage();
    navigate('/');
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCanel = () => {
    setIsModalOpen(false);
  };

  const [title, setTitle] = useState('');
  const [pdf, setPdf] = useState<any>(null);
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [course, setCourse] = useState('');
  const [date, setDate] = useState<any>();

  const handleSubmit = async () => {
    const key = getStorage('token');

    const formData = new FormData();
    if (pdf) {
      formData.append('pdf', pdf.originFileObj);
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
      notification.success({
        message: 'Publicação bem sucedida',
      });
      setIsModalOpen(false);
      search();
      form.resetFields();
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

  return (
    <Container>
      <Header>
        <Title>NORM</Title>
        <InputSearch
          size="large"
          allowClear
          placeholder="Pesquise o documento desejado"
          onSearch={value => {
            setSearchNorm(value);
          }}
        />
        <Popconfirm
          title="Sair da conta?"
          onConfirm={logOut}
          okText="Sim"
          cancelText="Não"
          placement="bottomRight"
        >
          <LogOutDiv>
            <p>Sair </p> <MdLogout />
          </LogOutDiv>
        </Popconfirm>
      </Header>
      <Content>
        <FiltersContent>
          <FiltersTitle>Filtros</FiltersTitle>
          <Form layout="vertical">
            <FormItem label="Tipo de documento:">
              <Select
                defaultValue="Todos os Tipos"
                onChange={value => {
                  setTypeFilter(value);
                }}
                options={[
                  {
                    label: 'Todos os Tipos',
                    value: '',
                  },
                  {
                    label: 'Edital',
                    value: '=Edital',
                  },
                  {
                    label: 'Informativo',
                    value: '=Informativo',
                  },
                  {
                    label: 'Lista',
                    value: '=Lista',
                  },
                  {
                    label: 'Resolução',
                    value: '=Resolução',
                  },
                  {
                    label: 'Ofício',
                    value: '=Ofício',
                  },
                ]}
              />
            </FormItem>
            <Divider />
            <FormItem label="Ano de Publicação:">
              <Select
                defaultValue="Todos os Anos"
                onChange={value => {
                  setDateFilter(value);
                }}
                options={[
                  {
                    label: 'Todos os Anos',
                    value: '',
                  },
                  {
                    label: '2024',
                    value: '=2024',
                  },
                  {
                    label: '2023',
                    value: '=2023',
                  },
                  {
                    label: '2022',
                    value: '=2022',
                  },
                  {
                    label: '2021',
                    value: '=2021',
                  },
                ]}
              />
            </FormItem>
            <Divider />
            <FormItem label="Destinação:">
              <Select
                defaultValue="Todas"
                onChange={value => {
                  setCourseFilter(value);
                }}
                options={[
                  {
                    label: 'Todas',
                    value: '',
                  },
                  {
                    label: 'Institucionais',
                    value: '=Institucional',
                  },
                  {
                    label: 'Análise e Desenvolvimento de Sistemas',
                    value: '=Análise e Desenvolvimento de Sistemas',
                  },
                  {
                    label: 'Automação Industrial',
                    value: '=Automação Industrial',
                  },
                  {
                    label: 'Computação e Informática',
                    value: '=Computação e Informática',
                  },
                  {
                    label: 'Edificações',
                    value: '=Edificações',
                  },
                  {
                    label: 'Eletromecânica',
                    value: '=Eletromecânica',
                  },
                  {
                    label: 'Engenharia Civil',
                    value: '=Engenharia Civil',
                  },
                  {
                    label: 'Engenharia de Controle e Automação',
                    value: '=Engenharia de Controle e Automação',
                  },
                  {
                    label: 'Informática',
                    value: '=Informática',
                  },
                  {
                    label: 'Licenciatura em Matemática',
                    value: '=Licenciatura em Matemática',
                  },
                  {
                    label: 'Meio Ambiente (PROEJA)',
                    value: '=Meio Ambiente (PROEJA)',
                  },
                ]}
              />
            </FormItem>
          </Form>
        </FiltersContent>
        <MainContent>
          <RecentTitle>
            <p>Documentos recentes</p>
          </RecentTitle>
          <NormsContainer>
            {norms.length > 0 ? (
              norms
                .slice(0)
                // .reverse()
                .map(norm => (
                  <Norm
                    key={norm._id}
                    _id={norm._id}
                    isAdmin
                    title={norm.title}
                    link={norm.link}
                    description={norm.description}
                    type={norm.type}
                    course={norm.course}
                    date={new Date(`${norm.date}`).toISOString().split('T')[0]}
                    onEffect={() => {
                      search();
                    }}
                  />
                ))
            ) : (
              <EmptyList>Nenhum resultado encontrado</EmptyList>
            )}
          </NormsContainer>
        </MainContent>

        <FloatButton
          shape="square"
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
        />
      </Content>
      <Decoration />
      <Modal
        title="Publicar Documento"
        open={isModalOpen}
        onCancel={() => {
          handleCanel();
          form.resetFields();
        }}
        footer={false}
        width={'40%'}
        destroyOnClose
      >
        <Form layout="vertical" form={form} onFinish={() => handleSubmit()}>
          <Form.Item
            label="Titulo:"
            name="titulo"
            rules={[{ required: true, message: 'Insira o título' }]}
          >
            <Input
              placeholder="Digite o titulo do documento"
              autoComplete="off"
              value={title}
              onChange={e => {
                setTitle(e.target.value);
              }}
            />
          </Form.Item>
          <Row>
            <Form.Item
              label="Arquivo (apenas pdf):"
              name="arquivo"
              rules={[{ required: true, message: 'Selecione um aquivo' }]}
            >
              <Upload
                accept=".pdf"
                multiple={false}
                maxCount={1}
                beforeUpload={() => {
                  return false;
                }}
                onChange={(info: any) => {
                  setPdf(info.fileList[0]);
                }}
              >
                <Button icon={<UploadOutlined />}>Clique para carregar</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="Data de publicação:"
              name="data"
              rules={[
                { required: true, message: 'Selecione a data de publicação' },
              ]}
            >
              <DatePicker
                format={'DD/MM/YYYY'}
                onChange={(value: any) => {
                  const formatDate = new Date(value)
                    .toISOString()
                    .split('T')[0];
                  setDate(formatDate);
                }}
              />
            </Form.Item>
          </Row>
          <Form.Item
            label="Descrição:"
            name="descricao"
            rules={[{ required: true, message: 'Insira uma descrição' }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Digite a descrição do documento"
              value={description}
              onChange={e => {
                setDescription(e.target.value);
              }}
            />
          </Form.Item>
          <Row>
            <SelectFormItem
              label="Tipo de documento:"
              name="tipodocumento"
              rules={[
                { required: true, message: 'Selecione o tipo do documento' },
              ]}
            >
              <Select
                placeholder="Selecione o tipo do documento"
                onChange={value => {
                  setType(value);
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
            </SelectFormItem>
            <SelectFormItem
              label="Destinação:"
              name="destinacao"
              rules={[
                {
                  required: true,
                  message: 'Selecione a destinação do documento',
                },
              ]}
            >
              <Select
                placeholder="Selecione a destinação do documento"
                onChange={value => {
                  setCourse(value);
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
            </SelectFormItem>
          </Row>
          <ContainerButton>
            <Button htmlType="submit" type="primary">
              Publicar documento
            </Button>
          </ContainerButton>
        </Form>
      </Modal>
    </Container>
  );
};

export default HomeAdmin;
