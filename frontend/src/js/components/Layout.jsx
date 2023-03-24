import {Link, Outlet} from 'react-router-dom';
import useAuthStore from '../hooks/useAuthStore';

function Layout() {
    const authStore = useAuthStore();
    

    return (
        <>
            <h2 style={{textAlign: 'center', fontSize: '18sp'}}>Welcome to MaNiMa, {authStore.isAuthenticated() ? authStore.user.name : 'my Friend'}!</h2>
            <nav>
                <ul style={{
                    display: 'flex',
                    gap: '1em',
                    justifyContent: 'center'
                }}>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                    <li><Link to='/protected'>Protected</Link></li>
                </ul>
            </nav>

            <Outlet />
        </>
    );
}

export default Layout;