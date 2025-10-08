import { NavLink } from 'react-router-dom';
import './index.css';

const Sidebar = () => (
    <div className='sidebar-main-container'>
        <input type="checkbox" checked="true" id="check" />
        {/* <label htmlFor="check">
            <i className="fas fa-bars " id="btn"></i>
            <i className="fas fa-times " id="cancel"></i>
        </label> */}
       <div className="sidebar">
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </NavLink>

            <NavLink to="/cashfree/sale" className={({ isActive }) => isActive ? "active" : ""}>
                <i className="fas fa-money-bill-wave"></i>
                <span>Cash Free Sale</span>
            </NavLink>

            <NavLink to="/purse" className={({ isActive }) => isActive ? "active" : ""}>
                <i className="fas fa-wallet"></i>
                <span>Purse</span>
            </NavLink>

            <NavLink to="/jewelry" className={({ isActive }) => isActive ? "active" : ""}>
                <i className="fas fa-gem"></i>
                <span>Jewelry</span>
            </NavLink>

            <NavLink to="/clothing" className={({ isActive }) => isActive ? "active" : ""}>
                <i className="fas fa-tshirt"></i>
                <span>Clothing</span>
            </NavLink>

            <NavLink to="/add-images" className={({ isActive }) => isActive ? "active" : ""}>
                <i className="fas fa-plus-circle"></i>
                <span>Add Product</span>
            </NavLink>

            <NavLink to="/manage-image" className={({ isActive }) => isActive ? "active" : ""}>
                <i className="fas fa-tasks"></i>
                <span>Manage Product</span>
            </NavLink>

            <NavLink to="/banner" className={({ isActive }) => isActive ? "active" : ""}>
                <i className="fas fa-home"></i>
                <span>Home Page</span>
            </NavLink>

            <NavLink to="/manage-video" className={({ isActive }) => isActive ? "active" : ""}>
                <i className="fas fa-video"></i>
                <span>Manage Video</span>
            </NavLink>

            <NavLink to="/services" className={({ isActive }) => isActive ? "active" : ""}>
                <i className="fas fa-concierge-bell"></i>
                <span>Services</span>
            </NavLink>

            <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>
                <i className="fas fa-envelope"></i>
                <span>Contact</span>
            </NavLink>
        </div>

    </div>
);

export default Sidebar;
