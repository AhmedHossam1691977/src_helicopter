import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Social Icons
import { Link } from 'react-router-dom';
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section subscribe">
          <h3>هليكوبتر</h3>
          <p>اشترك</p>
        </div>
        
        <div className="footer-section support">
          <h4>الدعم</h4>
          <p>111 بيجوي ساراني، دكا،<br />DH 1515، بنجلاديش.</p>
          <p>helicopter@gmail.com</p>
          <p>+201026731634</p>
        </div>

        <div className="footer-section account">
          <h4>الحساب</h4>
          <p><Link className='text-white' to={"setting"}>حسابي</Link></p>
          <p className='text-white'> <Link className='text-white' to={"login"}>تسجيل الدخول</Link> /  <Link to={"signup"} className='text-white'>التسجيل</Link></p>
          <p><Link className='text-white' to={"cart"}>عربة التسوق</Link></p>
          <p><Link className='text-white' to={"whichlist"}>قائمة الأمنيات</Link></p>
        </div>

        <div className="footer-section quick-links">
          <h4>روابط سريعة</h4>
          <p>سياسة الخصوصية</p>
          <p>شروط الاستخدام</p>
          <p>الأسئلة المتكررة</p>
          <p><Link className='text-white' to={"contact"}>اتصل بنا</Link></p>
        </div>

        <div className="footer-section download-app">
          <h4>قريباً</h4>
          <p>وفر 3$ مع التطبيق للمستخدمين الجدد فقط</p>
          <div className="qr-codes">
            {/* <img src="google-play-qr.png" alt="Google Play QR" />
            <img src="app-store-qr.png" alt="App Store QR" /> */}
          </div>
          <div className="social-icons d-flex align-items-center justify-content-center">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedinIn />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; حقوق الطبع محفوظة لشركة Rimel 2024. جميع الحقوق محفوظة</p>
        <p>&copy; تم الإنشاء بواسطة AKM Code</p>
      </div>
    </footer>
  );
};

export default Footer;
