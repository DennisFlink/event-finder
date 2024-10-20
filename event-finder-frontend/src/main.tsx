import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateEventModal from './components/CreateEventModal.tsx';
import EventList from './views/EventList/EventList.tsx';
import AdminPanel from './views/AdminPanel/AdminPanel.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,

		children: [
			{
				path: 'login',
				element: <div>hej</div>,
			},
			{
				path: 'events/create',
				element: <CreateEventModal />,
			},
			{
				path: 'createdEvents',
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
