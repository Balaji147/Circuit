import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import {ErrorInfoProvider } from "./contexts/errorHandler.context"
import { Provider } from 'react-redux'
import {store} from "./store/store.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorInfoProvider >
          <App />
        </ErrorInfoProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
