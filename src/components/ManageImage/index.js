import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importing icons
import { SERVER_API_URL } from '../../server/server';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';

const ManageImage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [popupProduct, setPopupProduct] = useState(null);
    const [editProduct, setEditProduct] = useState(null);
    const [editData, setEditData] = useState({});
    const [activebtn, setActivebtn] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [notFoundMessage, setNotFoundMessage] = useState("");

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        const filtered = products.filter((product) => {
            const matchesQuery = product.product_title?.toLowerCase().includes(query) ||
                product.frem_type?.toLowerCase().includes(query) ||
                product.lens_type?.toLowerCase().includes(query) ||
                (product.highlights && product.highlights.toLowerCase().includes(query));

            const matchesPrice =
                (!minPrice || product.product_price >= parseFloat(minPrice)) &&
                (!maxPrice || product.product_price <= parseFloat(maxPrice));

            return matchesQuery && matchesPrice;
        });

        if (filtered.length === 0) {
            setNotFoundMessage("No products found matching the search criteria.");
        } else {
            setFilteredProducts(filtered);
        }

        setSearchQuery('')
        setMinPrice('')
        setMaxPrice('')
    };

    const handleReset = () => {
        setFilteredProducts(products)
        setNotFoundMessage('')
    }

    // Fetch products from the API
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${SERVER_API_URL}/product`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data.result); // Assuming the API returns the array under 'result'
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        const api = `${SERVER_API_URL}/api/products/delete/${id}`;
        try {
            const response = await fetch(api, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            // Assuming a successful response indicates the product was deleted
            setProducts((prevProducts) => prevProducts.filter(product => product.product_id !== id));
            toast.success('Product deleted successfully!');
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const openPopup = (product) => {
        setPopupProduct(product);
    };

    const closePopup = () => {
        setPopupProduct(null);
    };

    const openEditPopup = (product) => {
        setEditProduct(product);
        setEditData(product);
    };

    const closeEditPopup = () => {
        setEditProduct(null);
        setEditData({});
    };

    const updateProduct = async (event) => {
        event.preventDefault();
        setActivebtn(false);

        try {
            // Construct the request body
            const payload = {
                product_title: editData.product_title || '',
                highlights: editData.highlights || '',
                product_price: editData.product_price || '',
                discount: editData.discount || '',
                lens_type: editData.lens_type || '',
                frem_type: editData.frame_type || '',
                gender: editData.gender || '',
                count_in_stock: editData.count_in_stock || '',
            };

            // API request to update the product
            const response = await fetch(`${SERVER_API_URL}/api/update/${editProduct.product_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // Set content type for JSON
                },
                body: JSON.stringify(payload), // Send payload as JSON
            });

            if (response.ok) {
                // Update the local product list
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.product_id === editProduct.product_id
                            ? { ...product, ...editData }
                            : product
                    )
                );
                fetchProducts();
                closeEditPopup();
                toast.success('Product updated successfully!');
            } else {
                const responseText = await response.text(); // Parse error message if needed
                console.error('Error updating product:', responseText);
                toast.error('Failed to update product. Please try again.');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('An error occurred while updating the product.');
        } finally {
            setActivebtn(true);
        }
    };



    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className="main-layout">
                <div className="sidebar-layout">
                    <Sidebar />
                </div>
                <ToastContainer position="top-right" autoClose={4000} />

                <div className="component-layout">

                    <div className="search-popup">
                        <div className="search-input-container">
                            <input
                                type="text"
                                className="search-product-input"
                                placeholder="Search Product"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="search-button" onClick={handleSearch}>
                                <FaSearch />
                            </button>
                            <input
                                type="number"
                                className="min-price-input"
                                placeholder="Min Price"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                            <input
                                type="number"
                                className="max-price-input"
                                placeholder="Max Price"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                            <button className="search-button" onClick={handleSearch}>
                                <FaSearch />
                            </button>
                            <button className="search-button" onClick={handleReset}>
                                Reset
                            </button>
                        </div>
                    </div>



                    <div className="product-list">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div className="product-card" key={product.product_id}>
                                    {/* Image Section */}
                                    <div className="image-container">
                                        <img
                                            src={`${SERVER_API_URL}/${product?.product_thumnail_img}`}
                                            alt={product.product_title || 'Product'}
                                            className="product-image"
                                            onClick={() => openPopup(product)}
                                        />
                                    </div>
                                    {/* Details Section */}
                                    <div className="details-container">
                                        <h3>{product.product_title || 'N/A'}</h3>
                                        <p><strong>Price:</strong> ₹{product.product_price || 'N/A'}</p>
                                        <p><strong>Discount:</strong> {product.discount || 'N/A'}</p>
                                        <p><strong>Stock:</strong> {product.count_in_stock || 'N/A'}</p>
                                        <p><strong>Frame Type:</strong> {product.frem_type || 'N/A'}</p>
                                        <p><strong>Lens Type:</strong> {product.lens_type || 'N/A'}</p>
                                        <p><strong>Highlights:</strong> {product.highlights || 'N/A'}</p>
                                        <p><strong>Color:</strong></p>
                                        <div className="color-options">
                                            {(() => {
                                                try {
                                                    const colors = JSON.parse(product.color || '[]');
                                                    return Array.isArray(colors) && colors.length ? (
                                                        colors.map((colorObj, index) => {
                                                            const [colorName, colorCode] = Object.entries(colorObj)[0];
                                                            return (
                                                                <span
                                                                    key={index}
                                                                    title={colorName}
                                                                    style={{
                                                                        backgroundColor: colorCode,
                                                                        display: 'inline-block',
                                                                        width: '20px',
                                                                        height: '20px',
                                                                        borderRadius: '50%',
                                                                        margin: '0 5px',
                                                                        border: '1px solid #ddd',
                                                                    }}
                                                                ></span>
                                                            );
                                                        })
                                                    ) : (
                                                        <span>No colors available</span>
                                                    );
                                                } catch {
                                                    return <span>No colors available</span>;
                                                }
                                            })()}
                                        </div>
                                        <div className="action-buttons">
                                            <button
                                                className="edit-button"
                                                onClick={() => openEditPopup(product)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete-button"
                                                onClick={() => deleteProduct(product.product_id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            notFoundMessage === "" ? (
                                products.map((product) => (
                                    <div className="product-card" key={product.product_id}>
                                        {/* Image Section */}
                                        <div className="image-container">
                                            <img
                                                src={`${SERVER_API_URL}/${product?.product_thumnail_img}`}
                                                alt={product.product_title || 'Product'}
                                                className="product-image"
                                                onClick={() => openPopup(product)}
                                            />
                                        </div>
                                        {/* Details Section */}
                                        <div className="details-container">
                                            <h3>{product.product_title || 'N/A'}</h3>
                                            <p><strong>Price:</strong> ₹{product.product_price || 'N/A'}</p>
                                            <p><strong>Discount:</strong> {product.discount || 'N/A'}</p>
                                            <p><strong>Stock:</strong> {product.count_in_stock || 'N/A'}</p>
                                            <p><strong>Frame Type:</strong> {product.frem_type || 'N/A'}</p>
                                            <p><strong>Lens Type:</strong> {product.lens_type || 'N/A'}</p>
                                            <p><strong>Highlights:</strong> {product.highlights || 'N/A'}</p>
                                            
                                            <div className="action-buttons">
                                                <button
                                                    className="edit-button"
                                                    onClick={() => openEditPopup(product)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="delete-button"
                                                    onClick={() => deleteProduct(product.product_id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                               null
                            )
                        )}
                    </div>

                    {notFoundMessage ? (
                        <div className='not-found-container'>
                            <p className='not-found-massage'>{notFoundMessage}</p>
                        </div>
                    ) : (null)}

                </div>
            </div >

            {/* Popup Section */}
            {
                popupProduct && (
                    <div className="popup-overlay" onClick={closePopup}>
                        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                            <button className="close-btn" onClick={closePopup}>×</button>
                            <img
                                src={`${SERVER_API_URL}/${popupProduct?.product_thumnail_img}`}
                                alt={popupProduct.product_title || 'Product'}
                                className="popup-image"
                            />
                            <div className="popup-details">
                                <h3>{popupProduct.product_title || 'N/A'}</h3>
                                <p><strong>Price:</strong> ₹{popupProduct.product_price || 'N/A'}</p>
                                <p><strong>Discount:</strong> {popupProduct.discount || 'N/A'}</p>
                                <p><strong>Stock:</strong> {popupProduct.count_in_stock || 'N/A'}</p>
                                <p><strong>Frame Type:</strong> {popupProduct.frem_type || 'N/A'}</p>
                                <p><strong>Lens Type:</strong> {popupProduct.lens_type || 'N/A'}</p>
                                <p><strong>Highlights:</strong> {popupProduct.highlights || 'N/A'}</p>
                                <p><strong>Color:</strong>
                                    <div className="color-options">
                                        {(() => {
                                            try {
                                                const colors = JSON.parse(popupProduct.color || '[]');
                                                return Array.isArray(colors) && colors.length ? (
                                                    colors.map((colorObj, index) => {
                                                        const [colorName, colorCode] = Object.entries(colorObj)[0];
                                                        return (
                                                            <span
                                                                key={index}
                                                                title={colorName}
                                                                style={{
                                                                    backgroundColor: colorCode,
                                                                    display: 'inline-block',
                                                                    width: '20px',
                                                                    height: '20px',
                                                                    borderRadius: '50%',
                                                                    margin: '0 5px',
                                                                    border: '1px solid #ddd',
                                                                }}
                                                            ></span>
                                                        );
                                                    })
                                                ) : (
                                                    <span>No colors available</span>
                                                );
                                            } catch {
                                                return <span>No colors available</span>;
                                            }
                                        })()}
                                    </div>
                                </p>

                            </div>
                        </div>
                  </div>
                )
            }

            {
                editProduct && (
                    <div className="unique-overlay" onClick={closeEditPopup}>
                        <div className="unique-container" onClick={(e) => e.stopPropagation()}>
                            <button className="unique-close-btn" onClick={closeEditPopup}>×</button>
                            <h3 className="unique-title">Edit Product</h3>
                            <form className="unique-form" onSubmit={updateProduct}>
                                <div className="unique-form-group">
                                    <label htmlFor="productTitle" className="unique-label">Product Title:</label>
                                    <input
                                        type="text"
                                        id="productTitle"
                                        name="product_title"
                                        value={editData.product_title || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    />
                                </div>

                                <div className="unique-form-group">
                                    <label htmlFor="highlights" className="unique-label">Highlights:</label>
                                    <textarea
                                        id="highlights"
                                        name="highlights"
                                        value={editData.highlights || ''}
                                        onChange={handleInputChange}
                                        className="unique-textarea"
                                    ></textarea>
                                </div>

                                <div className="unique-form-group">
                                    <label htmlFor="productPrice" className="unique-label">Product Price:</label>
                                    <input
                                        type="number"
                                        id="productPrice"
                                        name="product_price"
                                        value={editData.product_price || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    />
                                </div>

                                <div className="unique-form-group">
                                    <label htmlFor="discount" className="unique-label">Discount:</label>
                                    <input
                                        type="number"
                                        id="discount"
                                        name="discount"
                                        value={editData.discount || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    />
                                </div>

                                <div className="unique-form-group">
                                    <label htmlFor="lensType" className="unique-label">Lens Type:</label>
                                    <select
                                        id="lensType"
                                        name="lens_type"
                                        value={editData.lens_type || ''}
                                        onChange={handleInputChange}
                                        className="unique-select"
                                    >
                                        <option value="">Select Lens Type</option>
                                        <option value="Aviator">Aviator</option>
                                        <option value="Cats Eye">Cats Eye</option>
                                        <option value="Rectangle">Rectangle</option>
                                        <option value="Round">Round</option>
                                        <option value="Square">Square</option>
                                        <option value="Wayfarer">Wayfarer</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Hexagonal">Hexagonal</option>
                                        <option value="Computer Glasses">Computer Glasses</option>
                                        <option value="Sunglasses">Sunglasses</option>
                                        <option value="Prescription">Prescription</option>
                                        <option value="Zero Power">Zero Power</option>
                                        <option value="Blinkers">Blinkers</option>
                                    </select>
                                </div>

                                <div className="unique-form-group">
                                    <label htmlFor="frameType" className="unique-label">Frame Type:</label>
                                    <select
                                        id="frameType"
                                        name="frame_type"
                                        value={editData.frame_type || ''}
                                        onChange={handleInputChange}
                                        className="unique-select"
                                    >
                                        <option value="">Select Frame Type</option>
                                        <option value="Full Rim Rectangle">Full Rim Rectangle</option>
                                        <option value="Lykos Eyewear">Lykos Eyewear</option>
                                        <option value="Rimless">Rimless</option>
                                        <option value="EyePoppin">EyePoppin</option>
                                    </select>
                                </div>

                                <div className="unique-form-group">
                                    <label htmlFor="gender" className="unique-label">Gender:</label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={editData.gender || ''}
                                        onChange={handleInputChange}
                                        className="unique-select"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Unisex">Unisex</option>
                                    </select>
                                </div>

                                <div className="unique-form-group">
                                    <label htmlFor="countInStock" className="unique-label">Count in Stock:</label>
                                    <input
                                        type="number"
                                        id="countInStock"
                                        name="count_in_stock"
                                        value={editData.count_in_stock || ''}
                                        onChange={handleInputChange}
                                        className="unique-input"
                                    />
                                </div>

                                {activebtn ? (
                                    <button type="submit" className="unique-btn">Update</button>
                                ) : (
                                    <button type="button" disabled className="unique-btn-disabled">
                                        Updating...
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                )
            }

        </>
    );
};

export default ManageImage;
