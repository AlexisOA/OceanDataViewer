import React, {useEffect, useState} from 'react';
import { getDatafromChooseForm, getDataToForm, getImageFromLocalFile } from '../../../services/ThreddsService';
import '../fixedobs/FixedObsPlots.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const FixedObsPlots = ({url}) => {
    const [plot, setPlot] = useState(null);
    const [graphic, setGraphic] = useState(null);
    const [isShown, setIsShown] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const lat_lon = ["LATITUDE", "LONGITUDE"];

    useEffect(() => {
        console.log("en el useeffect")
        if(url != null){
            console.log("en el if")
            obtainDataForm(url)
        }
    }, [url]);

    const obtainPlot = (url, dataForm) => {
        getImageFromLocalFile(url)
            .then((response) => {
                if(response.status === 200){
                    console.log(response.data)
                    setGraphic(response.data);
                }
            })
            .catch((error) => alert(`Error loading graphics: ${error}`))

        // getDatafromChooseForm(dataForm)
        // .then((response) => {
        //     if(response.status === 200){
        //         console.log(response.data)
        //     }
        // })
        // .catch((error) => alert(`Error loading graphics: ${error}`))
            
        
    }

    const obtainPlot2 = (dataForm) => {
        getDatafromChooseForm(dataForm)
        .then((response) => {
            if(response.status === 200){
                console.log(response.data)
                setGraphic(response.data);
            }
        })
        .catch((error) => alert(`Error loading graphics: ${error}`))
            
        
    }

    const obtainDataForm = (url) => {
        getDataToForm(url)
        .then((response) => {
            if(response.status === 200){
                console.log(response.data[0])
                setPlot(response.data);
            }
        })
        .catch((error) => alert(`Error loading graphics: ${error}`))
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let dataForm = {};
        Array.from(event.target.elements).forEach((element) => {
            if(element.tagName === "SELECT"){
                dataForm[element.name] = element.value
            }
        })
        dataForm["URL"] = plot[0].url
        dataForm["NAME"] = plot[0].name
        console.log(dataForm)
        // obtainPlot(plot[0].url, dataForm);
        obtainPlot2(dataForm);

    }
    const ImageModal = (urlImage) => {
        setImageUrl(urlImage)
        setModalShow(true);
        setIsShown(true);       
    }

    return (
        <div>
        {
            plot != null ?
            (
                <div className="container">
                    <div className="row">
                        <div className="gallery col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h4 className="gallery-title mt-4">{plot[0].name}</h4>
                        </div>
                        <div className='mb-5' align='center'>
                            <form onSubmit={handleSubmit}>
                                <div className="d-inline-flex p-3 bg-secondary text-white">
                                    
                                    {
                                        plot.map((dataProps, index) => (
                                            dataProps.dimensions.map((dims, idx) => (
                                                <div className="p-2" key={idx}>
                                                    <label>
                                                        {dims}: 
                                                        <select name={dims}>
                                                        {/* {
                                                            dataProps.coords[idx][dims].length > 1 ?
                                                            <option  value="All">All</option>
                                                            :
                                                            null
                                                        } */}
                                                        
                                                            {
                                                                dataProps.coords[idx][dims].map((dataOption, idx_data) => (
                                                                    <option key={idx_data} value={dataOption}>
                                                                        {dataOption}
                                                                    </option>
                                                                ))
                                                            }
                                                        </select>
                                                    </label>
                                                </div>
                                            ))
                                        ))
                                    }
                                    <button type="submit">Generate Plot</button>
                                </div>
                        
                            </form>

                        </div>
                    </div>
                </div>
            )
            :
            null

            
        }
        {
            graphic != null ?
            (   <div className='container'>

                    <div className='row'>
                        <div className="wrapper">
                            {
                                graphic.map((image_b64, idx_data) => (
                                    <div key={idx_data} className='border border-dark'>
                                    <button onClick={() => ImageModal(image_b64)} style={{border: "none"}}><img  src={`data:image/png;base64,${image_b64}`} alt=""/></button>
                                    
                                    </div>
                                ))
                            }
                            
                            {
                                        isShown ?
                                        <Modal
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                            aria-labelledby="contained-modal-title-vcenter"
                                            centered
                                            >
                                            <Modal.Header closeButton>
                                                <Modal.Title id="contained-modal-title-vcenter">
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <img className='image_style' src={`data:image/png;base64,${imageUrl}`} alt=""/>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button onClick={() => setModalShow(false)}>Close</Button>
                                            </Modal.Footer>
                                        </Modal>
                                        :
                                        null
                                    }
                        </div>
                    </div>

                </div>
                
            )
            :
            null 
        }
        </div>


        
    );
}

export default FixedObsPlots;
