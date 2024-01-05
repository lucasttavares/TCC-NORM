import { Form } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #003566;
`;

const Content = styled.div`
  background-color: #ffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 25%;
  border-radius: 3px;
  box-shadow: 1px 1px 11px 3px rgba(0, 0, 0, 0.58);
  -webkit-box-shadow: 1px 1px 11px 3px rgba(0, 0, 0, 0.58);
  -moz-box-shadow: 1px 1px 11px 3px rgba(0, 0, 0, 0.58);
`;

const FormContainer = styled.div`
  height: 100%;
  padding: 3% 8% 1% 8%;
`;

const Title = styled.h2`
  padding: 4%;
  color: #003566;
`;

const FormLogin = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled(Form.Item)`
  width: 100%;
`;

export { Container, Content, FormContainer, Title, FormLogin, Label };
