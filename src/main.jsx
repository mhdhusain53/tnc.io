import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { store } from './Components/store/index.js'
import { AuthProvider } from './Context/AuthProvider.jsx'
import './index.css'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
)
