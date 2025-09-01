import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { SERVER_API_URL } from '../../server/server';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';

const Home = () => {
    const [productAllImg, setProductAllImg] = useState(null);
    const [productThumbnailImg, setProductThumbnailImg] = useState(null);
    const [productVideo, setProductVideo] = useState(null);
    const [productVideoThumbnail, setProductVideoThumbnail] = useState(null);
    const [productTitle, setProductTitle] = useState('');
    const [highlights, setHighlights] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [lensType, setLensType] = useState('');
    const [frameType, setFrameType] = useState('');
    const [gender, setGender] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [frameColor, setFrameColor] = useState('');
    const [lenshColor, setLenshColor] = useState('');
    const [frameDescription, setFrameDescription] = useState('');
    const [lensInformation, setLensInformation] = useState('');
    const [frameMaterial, setFrameMaterial] = useState('');

    const [activebtn, setActivebtn] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setActivebtn(false);

        // Log all the form values for debugging
        console.log('Form Data:', {
            productAllImg,
            productThumbnailImg,
            productVideo,
            productVideoThumbnail,
            productTitle,
            highlights,
            productPrice,
            discount,
            lensType,
            frameType,
            gender,
            countInStock,
            frameColor,
            lenshColor,
            frameDescription,
            lensInformation,
            frameMaterial
        });

        // const colorData = JSON.stringify([{ [colorName]: colorCode }]);

        const formData = new FormData();
        if (productAllImg) {
            Array.from(productAllImg).forEach((file) => {
                formData.append('product_all_img', file);
            });
        }
        
        formData.append('product_thumnail_img', productThumbnailImg);
        formData.append('product_title', productTitle);
        formData.append('video_url', productVideo);
        formData.append('video_thumbnail', productVideoThumbnail);
        formData.append('highlights', highlights);
        formData.append('product_price', productPrice);
        formData.append('discount', discount);
        formData.append('frem_type', lensType);
        formData.append('frame_shape', frameType);
        formData.append('gender', gender);
        formData.append('count_in_stock', countInStock);
        formData.append('frameColor', frameColor);
        formData.append('lenshColor', lenshColor);
        formData.append('frameDescription', frameDescription);
        formData.append('lensInformation', lensInformation);
        formData.append('frameMaterial', frameMaterial);

        try {
            const response = await fetch(`${SERVER_API_URL}/product`, {
                method: 'POST',
                body: formData,
            });

            // Log the full response for debugging
            console.log('Response Status:', response.status);
            const responseText = await response.text();  // Get the response text
            console.log('Response Text:', responseText);

            if (response.ok) {
                toast.success('Product added successfully!');
                setProductAllImg(null);
                setProductThumbnailImg(null);
                setProductVideo(null);
                setProductVideoThumbnail(null);
                setProductTitle('');
                setHighlights('');
                setProductPrice('');
                setDiscount('');
                setLensType('');
                setFrameType('');
                setGender('');
                setCountInStock('');
                setFrameColor('');
                setLenshColor('');
                setFrameDescription('');
                setLensInformation('');
                setFrameMaterial('');
            } else {
                toast.error(`Failed to add product: ${responseText}`);
            }
        } catch (error) {
            toast.error('Something went wrong while submitting the form.');
        } finally {
            setActivebtn(true);
        }
    };


    return (
        <>
            <Header />
            <div className="main-layout">
                <div className="sidebar-layout">
                    <Sidebar />
                </div>

                <ToastContainer position="top-right" autoClose={4000} />
                <div className="component-layout">
                    <div className="home-dashbord-container">
                        <div className="form-container">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="productAllImg">Upload All Product Images:</label>
                                    <input
                                        type="file"
                                        id="productAllImg"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => setProductAllImg(e.target.files)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="productThumbnailImg">Upload Thumbnail Image:</label>
                                    <input
                                        type="file"
                                        id="productThumbnailImg"
                                        accept="image/*"
                                        onChange={(e) => setProductThumbnailImg(e.target.files[0])}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="productVideo">Upload Product Video:</label>
                                    <input
                                        type="file"
                                        id="productVideo"
                                        accept="video/*"
                                        onChange={(e) => setProductVideo(e.target.files[0])}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="productVideoThumbnail">Upload Video Thumbnail:</label>
                                    <input
                                        type="file"
                                        id="productVideoThumbnail"
                                        accept="image/*"
                                        onChange={(e) => setProductVideoThumbnail(e.target.files[0])}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="productTitle">Product Title:</label>
                                    <input
                                        type="text"
                                        id="productTitle"
                                        value={productTitle}
                                        onChange={(e) => setProductTitle(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="highlights">Highlights:</label>
                                    <textarea
                                        id="highlights"
                                        value={highlights}
                                        onChange={(e) => setHighlights(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="productPrice">Product Price:</label>
                                    <input
                                        type="number"
                                        id="productPrice"
                                        value={productPrice}
                                        onChange={(e) => setProductPrice(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="discount">Discount:</label>
                                    <input
                                        type="number"
                                        id="discount"
                                        value={discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lensType">Lens Type:</label>
                                    <select
                                        id="lensType"
                                        value={lensType}
                                        onChange={(e) => setLensType(e.target.value)}
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

                                <div className="form-group">
                                    <label htmlFor="frameType">Frame Shape:</label>
                                    <select
                                        id="frameType"
                                        value={frameType}
                                        onChange={(e) => setFrameType(e.target.value)}
                                    >
                                        <option value="">Select Frame Type</option>
                                        <option value="Full Rim Rectangle">Full Rim Rectangle</option>
                                        <option value="Lykos Eyewear">Lykos Eyewear</option>
                                        <option value="Rimless">Rimless</option>
                                        <option value="EyePoppin">EyePoppin</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="gender">Gender:</label>
                                    <select
                                        id="gender"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="For Men">For Men</option>
                                        <option value="For Women">For Women</option>
                                        <option value="For Kids">For Kids</option>
                                        <option value="Unisex">Unisex</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="countInStock">Count in Stock:</label>
                                    <input
                                        type="number"
                                        id="countInStock"
                                        value={countInStock}
                                        onChange={(e) => setCountInStock(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="frameColor">Frame Color:</label>
                                    <select
                                        id="frameColor"
                                        value={frameColor}
                                        onChange={(e) => setFrameColor(e.target.value)}
                                    >
                                        <option value="">Select Frame Color</option>
                                        <option value="Black">Black</option>
                                        <option value="Gold">Gold</option>
                                        <option value="Brown">Brown</option>
                                        <option value="Blue">Blue</option>
                                        <option value="Silver">Silver</option>
                                        <option value="Transparent">Transparent</option>
                                        <option value="Green">Green</option>
                                        <option value="Grey">Grey</option>
                                        <option value="Pink">Pink</option>
                                        <option value="Red">Red</option>
                                        <option value="White">White</option>
                                        <option value="Purple">Purple</option>
                                        <option value="Orange">Orange</option>
                                    </select>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="lenshColor">Lens Color:</label>
                                    <select
                                        id="lenshColor"
                                        value={lenshColor}
                                        onChange={(e) => setLenshColor(e.target.value)}
                                    >
                                        <option value="">Select Lens Color</option>
                                        <option value="Blue">Blue</option>
                                        <option value="Green">Green</option>
                                        <option value="Yellow">Yellow</option>
                                        <option value="Transparent">Transparent</option>
                                        <option value="Pink">Pink</option>
                                        <option value="Brown">Brown</option>
                                        <option value="Grey">Grey</option>
                                        <option value="Black">Black</option>
                                        <option value="Red">Red</option>
                                        <option value="Violet">Violet</option>
                                        <option value="White">White</option>
                                    </select>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="frameDescription">Frame Description:</label>
                                    <textarea
                                        id="frameDescription"
                                        value={frameDescription}
                                        onChange={(e) => setFrameDescription(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lensInformation">Lens Information:</label>
                                    <textarea
                                        id="lensInformation"
                                        value={lensInformation}
                                        onChange={(e) => setLensInformation(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="frameMaterial">Frame Material:</label>
                                    <input
                                        type="text"
                                        id="frameMaterial"
                                        value={frameMaterial}
                                        onChange={(e) => setFrameMaterial(e.target.value)}
                                    />
                                </div>


                                {activebtn ? (
                                    <button type="submit">Submit</button>
                                ) : (
                                    <button type="button" disabled>
                                        Submitting...
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
