// import { Link } from 'react-router-dom';
import './index.css';

const Sidebar = () => (
    <div className='sidebar-main-container'>
        <input type="checkbox" checked="true" id="check" />
        {/* <label htmlFor="check">
            <i className="fas fa-bars " id="btn"></i>
            <i className="fas fa-times " id="cancel"></i>
        </label> */}
        <div className="sidebar">
            <header>EYE ZONES</header>
            {/* <Link className='style-link'> */}
                <a href="/" className="active">
                    <i className="fas fa-qrcode"></i>
                    <span>Dashboard</span>
                </a>
            {/* </Link> */}
            <a href="/add-images">
                <i className="fas fa-link"></i>
                <span>Add Product</span>
            </a>
            <a href="/manage-image">
                <i className="fas fa-calendar"></i>
                <span>Manage Product</span>
            </a>
            
            <a href="/banner">
                <i className="fas fa-stream"></i>
                <span>Home Page</span>
            </a>
            
            <a href="/#">
                <i className="far fa-question-circle"></i>
                <span>Manage Video</span>
            </a>
            <a href="#">
                <i className="fas fa-sliders-h"></i>
                <span>Services</span>
            </a>

            <a href="/contact">
                <i className="far fa-envelope"></i>
                <span>Contact</span>
            </a>
            {/* <a href="#">
                <i className="fas fa-sliders-h"></i>
                <span>Services</span>
            </a>
            <a href="#">
                <i className="far fa-envelope"></i>
                <span>Contact</span>
            </a> */}
        </div>

        {/* <div className="frame">
            <p> Responsive </p>
            <h2>SIDE BAR</h2>
            <p>in Pure CSS</p>
        </div> */}
    </div>
);

export default Sidebar;
