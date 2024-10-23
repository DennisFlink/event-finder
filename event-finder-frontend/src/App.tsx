import { Outlet, useLocation } from 'react-router';
import Header from './components/Header';
import { Toaster } from '@/components/ui/toaster';
function App() {
   const location = useLocation();
   const noHeaderRoutes = ['/login', '/signup'];
   return (
      <>
         {!noHeaderRoutes.includes(location.pathname) && <Header />}
         <Outlet />
         <Toaster />
      </>
   );
}

export default App;
