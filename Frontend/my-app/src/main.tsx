import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import store from './store/store.ts'
import { ErrorBoundary } from 'react-error-boundary'
import { I18nextProvider } from 'react-i18next';
import i18n from "../i18n"
const FallbackComponent = ({ error, resetErrorBoundary }) => (
  <div>
    <h2>Something went wrong: {error.message}</h2>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={FallbackComponent}>
<I18nextProvider i18n={i18n}>
    <Provider store={store}>
    <App />
    </Provider>
    </I18nextProvider>
    </ErrorBoundary>
   
  </StrictMode>,
)
