import React, { useState } from 'react';

import Header from '../Header'
import Sidebar from '../Sidebar'

import './index.css'

const Home = () => {
    const [videoFile, setVideoFile] = useState(null);
    const [place, setPlace] = useState('');
    const [Activebtn, setActivebtn] = useState(true)

    const handleVideoChange = (event) => {
        const file = event.target.files[0];
        setVideoFile(file);
    };

    const handlePlaceChange = (event) => {
        setPlace(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setActivebtn(false);
    
        // Handle form submission, e.g., upload the image to a server
        console.log("Video uploaded:", videoFile);
        console.log("Place:", place);

        const formData = new FormData();
        formData.append('videoFile', videoFile)
        formData.append('Place', place);
    
        setTimeout(() => {
            // After 2 seconds, reset the form and re-enable the submit button
            setPlace('');
            setVideoFile(null);
            setActivebtn(true);
        }, 2000);
    };

    return (
        <>
            <Header />
            <div className='main-layout'>
                <div className='sidebar-layout'>
                    <Sidebar />
                </div>
                <div className='component-layout'>
                    <div className="home-dashbord-container">
                        <div className="form-container">
                            <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                    <label htmlFor="videoUpload">Upload Video:</label>
                                    <input
                                        type="file"
                                        id="videoUpload"
                                        accept="video/*"
                                        onChange={handleVideoChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="placeInput">Place:</label>
                                    <input
                                        type="text"
                                        id="placeInput"
                                        value={place}
                                        onChange={handlePlaceChange}
                                        placeholder="Enter place"
                                        required
                                    />
                                </div>

                                {Activebtn? <button type="submit">Submit</button>: <button type="button">Submit...</button>}
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home
