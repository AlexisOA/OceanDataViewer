import React, {useState} from "react";
import NavigationMenu from '../Home/Navigation/NavigationMenu'
import point_on_map from '../../assets/images/point_on_map.png'
import point_ed from '../../assets/images/point_ed.png'
import platform from '../../assets/images/platform.jpg'
import {FaPhoneAlt,FaMailBulk, FaMapMarkerAlt, FaRegCalendarCheck, FaFax } from 'react-icons/fa';
import Footer from "../Footer/Footer";
import Carousel from 'react-bootstrap/Carousel';
const Contact = () => {

    return(
            <div>
                <NavigationMenu/>
                    <div className="container mt-5" style={{ width:'200vh' }}>
                        <div className="row">
                            <div className="col-6" >
                                <div className="row" >
                                    <img style={{borderRadius:'10%' }} src={point_ed} alt="whereisPlocan" />
                                </div>

                                <div className="row mt-5 mx-1 align-items-center justify-content-center align-self-center">
                                    <div className="row "><h4 style={{fontFamily:'sans-serif'}}>Contact details</h4></div>
                                    <div className="row "><p style={{fontFamily:'sans-serif'}} className="mx-2"><FaMapMarkerAlt/> Carretera de Taliarte, s/n. 35200 Telde – Gran Canaria, Canary Islands, Spain. </p></div>
                                    <div className="row"><p style={{fontFamily:'sans-serif'}} className="mx-2"><FaPhoneAlt/> Phone: (+34) 928 13 44 14</p></div>
                                    <div className="row"><p style={{fontFamily:'sans-serif'}} className="mx-2"><FaFax/> Fax: (+34) 925 13 30 32</p></div>
                                    <div className="row"><p style={{fontFamily:'sans-serif'}} className="mx-2"><FaRegCalendarCheck/> Opening times & support: Monday – Friday / 9am – 3pm</p></div>
                                       
                                </div>
                            </div>

                            <div className="col-6 align-items-center justify-content-center align-self-center" >
                                <div className="row mt-4 align-items-center justify-content-center align-self-center">
                                    <h4 style={{fontFamily:'sans-serif'}}>Arrival</h4>
                                    <p style={{fontFamily:'Helvetica'}}>PLOCAN is located 20 kilometres south of the city of Las Palmas de Gran Canaria, and 8 kilometres north of Gran Canaria Airport, on the Carretera de Taliarte s/n, next to the Taliarte lighthouse and dock.</p>
                                </div>

                                <div className="row mt-3 mb-3 align-items-center justify-content-center">
                                    <img style={{borderRadius:'2%' }} src={platform} alt="platform image" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
            </div>
            
        
    )
}
export default Contact