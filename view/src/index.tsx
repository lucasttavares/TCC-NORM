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
    <ConfigProvider
      locale={ptBR}
      theme={{
        token: {
          colorPrimary: '#3367b0',
          colorInfo: '#3367b0',
          colorSuccess: '#006aff',
          colorWarning: '#ffaa00',
          colorError: '#ff0000',
          wireframe: false,
          borderRadius: 3,
        },
        components: {
          Form: {
            itemMarginBottom: 14,
          },
          Divider: {
            colorSplit: 'rgba(5, 5, 5, 0.24)',
            marginLG: 19,
          },
        },
      }}
    >
      <Router />
    </ConfigProvider>
  </React.StrictMode>,
);

reportWebVitals();
