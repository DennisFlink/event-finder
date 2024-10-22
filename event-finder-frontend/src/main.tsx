import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignupView } from './views/loginView/signUpView.tsx';
import { LoginView } from './views/loginView/loginView.tsx';
import CreateEventModal from './components/CreateEventModal.tsx';
import EventList from './views/EventList/EventList.tsx';
import AdminPanel from './views/AdminPanel/AdminPanel.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,

		children: [
			{
				path: '/',
				element: <EventList />,
			},
			{
				path: 'login',
				element: <LoginView />,
			},
			{
				path: 'signup',
				element: <SignupView />,
			},
			{
				path: 'events/create',
				element: <CreateEventModal />,
			},
			{
				path: 'events/own',
				element: <EventList />,
			},
			{
				path: 'admin',
				element: <AdminPanel />,
			},
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
