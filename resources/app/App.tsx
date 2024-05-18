import { ErrorBoundary } from 'react-error-boundary';
import './index.css';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import RssFeedsPage from '@/rss-feeds/rss-feeds.page.tsx';

const Layout = () => {
  return (
    <ErrorBoundary fallback={<div>App error</div>}>
      <div className="min-h-screen bg-background font-sans antialiased">
        <div className="elative flex min-h-screen flex-col">
          <Outlet/>
        </div>
      </div>
    </ErrorBoundary>
  );
};

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout/>,
    children: [
      {
        path: '',
        element: <RssFeedsPage />,
        index: true,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>}/>;
}
