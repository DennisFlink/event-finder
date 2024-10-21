import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignupView } from './views/loginView/signUpView.tsx';
import { LoginView } from './views/loginView/loginView.tsx';

const router = createBrowserRouter([
   {
      path: '/',
      element: <App />,

      children: [],
   },
   {
      path: '/signup',
      element: <SignupView />,
   },
   { path: '/login', element: <LoginView /> },
]);

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <RouterProvider router={router} />
   </StrictMode>
);
