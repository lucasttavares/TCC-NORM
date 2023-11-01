import React, { useEffect, useState } from 'react';
import { Conatiner } from './styles';
import api from '../../../services/api';
import { NormI } from '../../../utils/types';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [norms, setNorms] = useState<NormI[]>([]);

  useEffect(() => {
    api
      .get('/norm/getNorm')
      .then((resp: any) => {
        setNorms(resp.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  const [user, setUser] = useState();

  useEffect(() => {
    const key = localStorage.getItem('token');
    api
      .get('/projects', { headers: { Authorization: `${key}` } })
      .then((resp: { data: { user: React.SetStateAction<undefined> } }) => {
        setUser(resp.data.user);
      })
      .catch((err: any) => {
        localStorage.clear();
      });
  }, []);

  return (
    <Conatiner>
      {user ? (
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
      )}
      {norms.map(norm => (
        <div key={norm._id} style={{ marginBottom: 10 }}>
          <p>Title: {norm.title}</p>
          <p>Description: {norm.description}</p>
          <p>Type: {norm.type}</p>
          <p>Course: {norm.course}</p>
          <p>Date: {norm.date}</p>
        </div>
      ))}
    </Conatiner>
  );
};

export default Home;
