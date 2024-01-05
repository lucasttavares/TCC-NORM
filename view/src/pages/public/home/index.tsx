import React, { useEffect, useState } from 'react';
import {
  Container,
  Content,
  Decoration,
  EmptyList,
  FiltersContent,
  FiltersTitle,
  FormItem,
  Header,
  InputSearch,
  MainContent,
  NormsContainer,
  RecentTitle,
  Title,
} from './styles';
import api from '../../../services/api';
import { NormI } from '../../../utils/types';
import { Divider, Form, Select } from 'antd';
import Norm from '../../../components/Norm/Norm';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
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
      console.log(requestPath);
      setNorms(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    search();
  }, [searchNorm, typeFilter, dateFilter, courseFilter]);

  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <Title
          onDoubleClick={() => {
            navigate('/admin');
          }}
        >
          NORM
        </Title>
        <InputSearch
          size="large"
          allowClear
          placeholder="Pesquise o documento desejado"
          onSearch={value => {
            setSearchNorm(value);
          }}
        />
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
                    label: '2020',
                    value: '=2020',
                  },
                  {
                    label: '2021',
                    value: '=2021',
                  },
                  {
                    label: '2022',
                    value: '=2022',
                  },
                  {
                    label: '2023',
                    value: '=2023',
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
                    label: 'Desenho de Construção Civil (PROEJA)',
                    value: '=Desenho de Construção Civil (PROEJA)',
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
                    title={norm.title}
                    link={norm.link}
                    description={norm.description}
                    type={norm.type}
                    course={norm.course}
                    date={new Date(`${norm.date}`).toISOString().split('T')[0]}
                  />
                ))
            ) : (
              <EmptyList>Nenhum resultado encontrado</EmptyList>
            )}
          </NormsContainer>
        </MainContent>
      </Content>
      <Decoration />
    </Container>
  );
};

export default Home;
