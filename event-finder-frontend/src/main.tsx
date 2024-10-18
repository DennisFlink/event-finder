import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import OwnEvents from './views/OwnEvents/OwnEvents.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,

		children: [
			{
				path: 'login',
				element: <div>header</div>,
			},
			{
				path: 'createdEvents',
				element: (
					<div>
						<OwnEvents />
					</div>
				),
			},
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
