import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {Menu} from './pages/Menu/Menu.tsx';
import {Cart} from './pages/Cart/Cart.tsx';
import {Error} from './pages/Error/Error.tsx';
import {Layout} from './layout/Layout/Layout.tsx';
import Dish from "./pages/Dish/Dish.tsx";

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout/>,
		children: [
			{
				path: '/',
				element: <Menu/>
			},
			{
				path: '/cart',
				element: <Cart/>
			},
			{
				path: '/dish/:id',
				element: <Dish/>
			}
		]
	},
	{
		path: '*',
		element: <Error/>
	}
],
{
	basename: import.meta.env.DEV ? '/' : '/YummyCart/'
}
);
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router}/>
	</StrictMode>
);
