import {Outlet} from 'react-router-dom';
import Navbar from '../components/Navbar';

function Layout() {
    return (
        <>
        <Navbar />
        <main style={{ padding: '1rem' }}>
            <Outlet />
        </main>
        </>
    );
}

export default Layout;