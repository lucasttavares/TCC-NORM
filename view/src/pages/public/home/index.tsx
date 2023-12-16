import React, { useEffect, useState } from 'react';
import { Conatiner } from './styles';
import api from '../../../services/api';
import { NormI } from '../../../utils/types';
import { Button, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import Norm from '../../../components/Norm/Norm';

const Home: React.FC = () => {
  /*  const [user, setUser] = useState();

  useEffect(() => {
    const key = localStorage.getItem('token');
    api
      .get('/profile', { headers: { Authorization: `${key}` } })
      .then(resp => {
        setUser(resp.data.user);
      })
      .catch(err => {
        console.log(err);
        localStorage.clear();
      });
  }, []); */

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

  return (
    <Conatiner>
      {/*  {user ? (
        <div>
          <Link to={'/profile'}>{user}</Link>
          <Button
            type="primary"
            onClick={() => {
              localStorage.clear();
            }}
            href=""
          >
            Sair
          </Button>
        </div>
      ) : (
        <Link to={'/login'}>Realizar login</Link>
      )} */}
      <Input.Search
        allowClear
        placeholder="Pesquise o documento desejado"
        onChange={e => {
          setSearchNorm(e.target.value);
        }}
      />
      <Select
        defaultValue="Todos"
        onChange={value => {
          setTypeFilter(value);
        }}
        options={[
          {
            label: 'Todos',
            value: '',
          },
          {
            label: 'Institucional',
            value: '=Institucional',
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
      <Select
        defaultValue="Todos"
        onChange={value => {
          setDateFilter(value);
        }}
        options={[
          {
            label: 'Todos',
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
      <Select
        defaultValue="Todos"
        onChange={value => {
          setCourseFilter(value);
        }}
        options={[
          {
            label: 'Todos',
            value: '',
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
      {norms.map(norm => (
        <Norm
          key={norm._id}
          _id={norm._id}
          title={norm.title}
          pdf={norm.pdf}
          description={norm.description}
          type={norm.type}
          course={norm.course}
          date={norm.date}
        />
      ))}
    </Conatiner>
  );
};

export default Home;
