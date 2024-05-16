import { ErrorBoundary } from 'react-error-boundary';


const App = () => {
  return (
    <ErrorBoundary fallback={<div>App error</div>}>
      <h1>Dashr</h1>
    </ErrorBoundary>
  )
}

export default App;
