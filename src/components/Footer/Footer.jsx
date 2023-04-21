import React from 'react';
import { FaTwitter, FaInstagram, FaFacebook, FaPhoneAlt,FaMailBulk, FaLinkedin, FaYoutube  } from 'react-icons/fa';
import '../Footer/Footer.css';
import logofull from '../../assets/images/plocan_full.png'
import {useNavigate} from 'react-router-dom';
const Footer = () => {
    const navigate = useNavigate();

    const redirectToPath = (path) => {
      navigate(path)
    }

    return (
      
        <footer className="text-center text-lg-center" style={{ backgroundColor: '#00649c' }}>
          <div className="container p-3">
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <img src={logofull} alt="" className=' mt-5'/>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h6 className="text-uppercase mb-4">Quick links</h6>
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="/" className="text-dark" >Home</a>
                  </li>
                  <li>
                    <a href="/fixedobs" className="text-dark">Fixed Observatories</a>
                  </li>
                  <li>
                    <a href="/gliders" className="text-dark">Autonomous Systems</a>
                  </li>
                  <li>
                    <a href="http://obsplatforms.plocan.eu/" className="text-dark" target={"_blank"}>Data Portal</a>
                  </li>
                  <li>
                    <a href="http://data.plocan.eu/thredds/PLOCAN-Observatory_Data-Policy_v2.pdf" className="text-dark" target={"_blank"}>Data Policy</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h6 className="text-uppercase mb-4">Contact</h6>
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-dark"><FaPhoneAlt /> (+34) 928134414</a>
                  </li>
                  <li>
                    <a href="#!" className="text-dark"><FaMailBulk /> observatory@plocan.eu</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <h6 className="text-uppercase mb-4">Social networks</h6>
                <div className='row d-flex flex-row'>
                    <ul className="list-unstyled d-flex flex-row justify-content-center">
                    <li className='mx-3'>
                        <a href="https://www.facebook.com/plocan" className="text-dark"><FaFacebook /></a>
                    </li>
                    <li className='mx-3'>
                        <a href="https://twitter.com/plocan?t=Ko2nfLz0liLcvWTA4MMtgQ&s=08" className="text-dark" target={"_blank"}><FaTwitter /></a>
                    </li>
                    <li className='mx-3'>
                        <a href="https://instagram.com/laplocan?igshid=YmMyMTA2M2Y=" className="text-dark" target={"_blank"}><FaInstagram /></a>
                    </li>
                    <li className='mx-3'>
                        <a href="https://www.linkedin.com/company/plocan/" className="text-dark" target={"_blank"}><FaLinkedin /></a>
                    </li>
                    <li className='mx-3'>
                        <a href="https://youtube.com/@plocanplataforma" className="text-dark" target={"_blank"}><FaYoutube /></a>
                    </li>
                    </ul>
                </div>
                
              </div>
            </div>
          </div>
          <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', color: 'black'}}>
            &copy; 2023 Plataforma Oceánica de Canarias. PLOCAN.
          </div>
    </footer>
    );
}

export default Footer;
