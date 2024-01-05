import { Form, Input } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
`;

const Decoration = styled.div`
  z-index: -1;
  background-color: #003566;
  width: 100%;
  height: 10%;
  position: fixed;
  top: 70%;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background-color: #f3f3f3;
  padding-right: 3%;
  padding-left: 1%;
  margin-bottom: 2%;
`;

const Title = styled.h1`
  color: #003566;
`;

const InputSearch = styled(Input.Search)`
  width: 85%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
`;

const ContainerButton = styled(Form.Item)`
  display: flex;
  justify-content: flex-end;
`;

const SelectFormItem = styled(Form.Item)`
  width: 100%;
`;

const LogOutDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 5px;
  color: #003566;
  transition: 0.2s;
  &:hover {
    color: #6e8191;
  }
`;

const Content = styled.div`
  display: flex;
  padding-left: 1%;
  gap: 3%;
`;

const FiltersContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 10%;
  row-gap: 30px;
`;

const FiltersTitle = styled.div`
  font-size: 1.3rem;
  color: #4b4b4b;
`;

const FormItem = styled(Form.Item)`
  margin-left: 3%;
`;

const MainContent = styled.div`
  width: 90%;
`;

const RecentTitle = styled.div`
  margin-bottom: 1%;
  font-size: 1.2rem;
`;

const NormsContainer = styled.div`
  width: 90%;
  background-color: #f8f8f8;
  padding: 2%;
  border-radius: 1;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.75);
`;

const EmptyList = styled.p`
  color: #4b4b4b;
`;

export {
  Container,
  Decoration,
  Header,
  Title,
  InputSearch,
  Row,
  ContainerButton,
  SelectFormItem,
  LogOutDiv,
  Content,
  FiltersContent,
  FiltersTitle,
  FormItem,
  MainContent,
  RecentTitle,
  NormsContainer,
  EmptyList,
};
