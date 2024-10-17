import React from 'react'
import img from "../../assits/WhatsApp Image 2024-10-17 at 01.35.40_d6fc2040.jpg"
export default function About() {
  return<>
  
  <div className="container my-5 d-flex align-items-center justify-content-center">
    <div className="row align-items-center justify-content-center">
    <div className="col-md-6">
          <img src={img} className=' helicopter' alt="" />
        </div>
      <div className="col-md-6 about d-flex align-items-center justify-content-center">

        <div>
        
        <h1 className='text-end fw-bolder fs-2'> من نحن - <span className='text-danger'>هليكوبتر</span></h1>
        <p className='text-end fs-3 helicopter-text'>هليكوبتر هي خدمة توصيل متكاملة تهدف إلى تسهيل حياتكم وتلبية جميع احتياجاتكم المنزلية. نحن نوفر توصيل سريع وموثوق للمخبوزات، البقالة، العطارة، الأدوية من الصيدليات، وكل مستلزمات المنزل الأخرى. مهما كان طلبك، سواءً كان طعامًا، مشروبات، أو حتى منتجات صحية، هليكوبتر هنا لخدمتك.

نسعى في هليكوبتر لتوفير تجربة تسوق مريحة وسهلة من خلال تقديم مجموعة متنوعة من المنتجات بجودة عالية وسرعة في التوصيل، مما يتيح لك التركيز على ما يهمك في حياتك اليومية.</p>
        </div>

        </div>
    </div>
  </div>

  </>
}
