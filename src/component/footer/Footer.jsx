import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Social Icons
import { Link } from 'react-router-dom';
import "./footer.css";

const Footer = () => {
  return <>

<footer class="bg-black text-white pt-5 pb-4" id='footter'>
    <div class="container text-center text-md-left">
        <div class="row">

        <div class="row mt-3">
            <div class="col-md-12 text-center">
                <p>&copy; 2024 AKM Code جميع الحقوق محفوظة لشركة </p>
                <p>تم الإنشاء بواسطة AKM Code</p>
            </div>
        </div>
    </div>
    </div>

</footer>

  </>
};

export default Footer;
