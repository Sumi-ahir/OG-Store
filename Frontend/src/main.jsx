import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.jsx'
import { Provider } from "react-redux"
import store, { persistor } from './app/app.store.js'
import { PersistGate } from 'redux-persist/integration/react'
import {GoogleOAuthProvider} from '@react-oauth/google'


createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={import.meta.env.GOOGLE_CLIENT_ID}>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  </GoogleOAuthProvider>

)
