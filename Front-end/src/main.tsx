import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { configStore } from './reducers/store.ts';
import MarkerComponent from './MarkerComponent.ts';
import { LDProvider } from 'launchdarkly-react-client-sdk';
const { VITE_APP_LD_CLIENT_ID } = import.meta.env;

// A "context" is a data object representing users, devices, organizations, and other entities.
// You'll need this later, but you can ignore it for now.
const context = {
  kind: 'user',
  key: 'user-key-123abcde',
  email: 'biz@face.dev',
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={configStore}>
      <LDProvider clientSideID={`${VITE_APP_LD_CLIENT_ID}`} context={context}>
        <App />

        <MarkerComponent />
      </LDProvider>
    </Provider>
  </StrictMode>,
);
