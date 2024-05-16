import * as ReactDOM from 'react-dom/client';
import App from '@/App';

const element = document.getElementById('dashrapproot');

if (!element) {
  throw new Error('Unable to find dashrapproot');
}

ReactDOM.createRoot(element).render(<App/>);
