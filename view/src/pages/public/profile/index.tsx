import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { Container } from './styles';
import { Alert, Button } from 'antd';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const key = localStorage.getItem('token');
    api
      .get('/projects', { headers: { Authorization: `${key}` } })
      .then(resp => {
        setUser(resp.data.user);
      })
      .catch(err => {
        console.log(err);
        localStorage.clear();
      });
  }, [false]);

  return (
    <Container>
      {user ? (
        <div>
          {user}
          <Button
            type="primary"
            onClick={() => {
              localStorage.clear();
            }}
            href="/"
          >
            Sair
          </Button>
        </div>
      ) : (
        <>
          <Alert
            message="Realize o login para acessar esta pagina"
            type="warning"
            closable
          />
          <Link to="/login">Realizar login</Link>
        </>
      )}
    </Container>
  );
};

export default Profile;
