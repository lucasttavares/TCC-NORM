import styled from 'styled-components';
import { QuestionCircleOutlined } from '@ant-design/icons';

const Container = styled.div`
  margin-bottom: 1%;
`;

const Content = styled.div`
  height: 30%;
  display: flex;
  flex-direction: column;
  row-gap: 3px;
`;

const Title = styled.p`
  font-size: 1.1rem;
`;

const Link = styled.a`
  text-decoration: none;
  color: #005e9d;
`;

const Infos = styled.div`
  display: flex;
  gap: 10px;
  color: #939393;
  font-size: 0.9rem;
`;

const Description = styled.p`
  color: #484848;
  font-size: 0.9rem;
`;

const AdminOptions = styled.div`
  display: flex;
  gap: 1%;
  font-size: 0.8rem;
  margin-top: 0.5%;
`;

const EditButton = styled.div`
  display: flex;
  gap: 5px;
  color: #3691c5;
  cursor: pointer;
`;

const PopConfirmIcon = styled(QuestionCircleOutlined)`
  color: red;
`;

const DeleteButton = styled.div`
  display: flex;
  gap: 5px;
  color: #fc4e4e;
  cursor: pointer;
`;

const ConfirmEditButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export {
  Container,
  Content,
  Title,
  Link,
  Infos,
  Description,
  AdminOptions,
  EditButton,
  PopConfirmIcon,
  DeleteButton,
  ConfirmEditButton,
};
