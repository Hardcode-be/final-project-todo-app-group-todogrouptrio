import {Link, Outlet, useLocation} from 'react-router-dom';
import useAuthStore from '../hooks/useAuthStore';

function Layout() {
    const authStore = useAuthStore();
    let location = useLocation();

    let isOnDashboard = (location.pathname === '/dashboard')
    
    const handleLogout = () => authStore.logout();

    return (
        <div className='flex flex-col justify-center'>
            <div className='text-4xl text-center mt-5 font-bold  '>
                <h2>Welcome to MaNiMa, {authStore.isAuthenticated() ? authStore.user.username : 'my Friend'}!</h2>
            </div>
            <nav>
                <ul className='flex flex-row justify-evenly m-8' >
                    {isOnDashboard ? <></> : <li><Link to='/'>Dashboard</Link></li>}
                    <li><Link to='/register'>Connections</Link></li>
                    <li><button onClick={handleLogout} className='border-none' >Logout</button></li>
                </ul>
            </nav>

            <Outlet />
        </div>
    );
}

export default Layout;