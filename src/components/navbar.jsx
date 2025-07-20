import {Link} from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{ padding: '1rem', background: '#eee', textAlign: 'right' }}>
            <Link to="/">Home</Link> |
            <Link to="/login">Login</Link> |
            <Link to="/register">Register</Link> |
            <Link to="/favourites">Favourites</Link> |
        </nav>
    );
}
export default Navbar;