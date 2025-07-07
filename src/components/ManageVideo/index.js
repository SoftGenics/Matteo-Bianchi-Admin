import schoollogo2 from '../../Assest/schoollogo2.png'

import Header from '../Header'
import Sidebar from '../Sidebar'

import './index.css'

const ManageVideo = () => {

    const EditImage = () => {
        alert("EditImage")
    }

    const DeleteImage = () => {
        alert("DeleteImage")
    }

    return (
        <>
            <Header />
            <div className='main-layout'>
                <div className='sidebar-layout'>
                    <Sidebar />
                </div>
                <div className='component-layout'>
                    <div style={{ overflowX: "scroll", height: "85vh", width: "100%" }}>
                        <div className="wrapper">

                            <div className="table">

                                <div className="row header">
                                    <div className="cell mang-heigth">
                                        Video
                                    </div>
                                    <div className="cell mang-heigth">
                                        Name
                                    </div>
                                    <div className="cell mang-heigth">
                                        Place
                                    </div>
                                    <div className="cell mang-heigth">
                                        Manage
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="cell" data-title="Name">
                                        <img src={schoollogo2} className="image-style" alt="pic-style" />
                                    </div>
                                    <div className="cell" data-title="Age">
                                        Softgenics
                                    </div>
                                    <div className="cell" data-title="Occupation">
                                        Freelance Web Developer
                                    </div>
                                    <div className="cell" data-title="Location">
                                        <button className="edit" onClick={() => EditImage()}>Edit</button>
                                        <button className="delete" onClick={() => DeleteImage()}>Delete</button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="cell" data-title="Name">
                                        <img src={schoollogo2} className="image-style" alt="pic-style" />
                                    </div>
                                    <div className="cell" data-title="Age">
                                        Softgenics
                                    </div>
                                    <div className="cell" data-title="Occupation">
                                        Project Manager
                                    </div>
                                    <div className="cell" data-title="Location">
                                        <button className="edit" onClick={() => EditImage()}>Edit</button>
                                        <button className="delete" onClick={() => DeleteImage()}>Delete</button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="cell" data-title="Name">
                                        <img src={schoollogo2} className="image-style" alt="pic-style" />
                                    </div>
                                    <div className="cell" data-title="Age">
                                        Softgenics
                                    </div>
                                    <div className="cell" data-title="Occupation">
                                        UX Architect & Designer
                                    </div>
                                    <div className="cell" data-title="Location">
                                        <button className="edit" onClick={() => EditImage()}>Edit</button>
                                        <button className="delete" onClick={() => DeleteImage()}>Delete</button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="cell" data-title="Name">
                                        <img src={schoollogo2} className="image-style" alt="pic-style" />
                                    </div>
                                    <div className="cell" data-title="Age">
                                        Softgenics
                                    </div>
                                    <div className="cell" data-title="Occupation">
                                        Front-End Developer
                                    </div>
                                    <div className="cell" data-title="Location">
                                        <button className="edit" onClick={() => EditImage()}>Edit</button>
                                        <button className="delete" onClick={() => DeleteImage()}>Delete</button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="cell" data-title="Name">
                                        <img src={schoollogo2} className="image-style" alt="pic-style" />
                                    </div>
                                    <div className="cell" data-title="Age">
                                        Softgenics
                                    </div>
                                    <div className="cell" data-title="Occupation">
                                        Front-End Developer
                                    </div>
                                    <div className="cell" data-title="Location">
                                        <button className="edit" onClick={() => EditImage()}>Edit</button>
                                        <button className="delete" onClick={() => DeleteImage()}>Delete</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ManageVideo