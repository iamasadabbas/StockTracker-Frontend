import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  timeout: 2000,
  position: positions.TOP_CENTER,
  transition: transitions.SCALE,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <Provider store={store}>
      <div className="alert-container" style={{ zIndex: 1591 }}> {/* Apply custom class here */}
        <App />
      </div>
    </Provider>
  </AlertProvider>
);
