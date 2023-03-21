import {Link, Outlet} from 'react-router-dom';
import useAuthStore from '../hooks/useAuthStore';

function Layout() {
    const authStore = useAuthStore();

    return (
        <>
            <h2 style={{textAlign: 'center', fontSize: '18sp'}}>Welcome aboard, {authStore.isAuthenticated() ? authStore.user.fullname : 'Anonymous'}!</h2>
            <nav>
                <ul style={{
                    display: 'flex',
                    gap: '1em',
                    justifyContent: 'center'
                }}>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                    <li><Link to='/protected'>Protected</Link></li>
                </ul>
            </nav>

            <Outlet />
        </>
    );
}

export default Layout;