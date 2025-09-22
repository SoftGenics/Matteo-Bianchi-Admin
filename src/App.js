import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Videotest from './components/Test/index'
import Home from "./components/Home";
import Home2 from "./components/Home2";
import AddImages from "./components/AddImages";
// import AddVideos from "./components/AddVideos";
import ManageImage from "./components/ManageImage"
// import ManageVideo from "./components/ManageVideo"
import Contact from "./components/Contact"
import Banner from './components/Banner/banner'


import './App.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/cashfree/sale" element={<Home2 />} />
      <Route exact path="/add-images" element={<AddImages />} />
      {/* <Route exact path="/add-videos" element={<AddVideos />} /> */}
      <Route exact path="/manage-image" element={<ManageImage />} />
      <Route exact path="/banner" element={<Banner />} />
      {/* <Route exact path="/manage-video" element={<ManageVideo />} /> */}
      <Route exact path="/contact" element={<Contact />} />
    </Routes>
  </BrowserRouter>
);
export default App;
