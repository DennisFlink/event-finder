import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateEventModal from './components/CreateEventModal.tsx';
import OwnEvents from './views/OwnEvents/OwnEvents.tsx';

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
				element: <OwnEvents />,
			},
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
