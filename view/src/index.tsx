import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './router/routes';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ConfigProvider locale={ptBR}>
      <Router />
    </ConfigProvider>
  </React.StrictMode>,
);

reportWebVitals();
