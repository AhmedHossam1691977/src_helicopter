import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./minSlider.css"


export default function   MinSlider() {

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return <>
  
  <Carousel responsive={responsive}
  className='w-100 position-relative my-5 Carousel'
  swipeable={true}
  draggable={true}
  showDots={true}
  ssr={true}
  infinite={true}
  autoPlay={true}  
  autoPlaySpeed={5000}
  customLeftArrow={<></>}  
  customRightArrow={<></>}  
  >
  <div className='bg-black slider'>
    <div className='d-flex align-items-center justify-content-between px-5'>
        <p className='text-light fs-1 fw-bold slider-text'>
        Up to 10% <br/> off Voucher
        </p>
    <img src="https://s3-alpha-sig.figma.com/img/70a5/cb9d/c35ceb717964142f88d228ac751bd812?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gIdlBYrN7~QIDbgdj~T~cUSEgzDbXXJBvT0klTlAWrz15CSIkYVBR5QoYvjV6uQlh3XHxZVmclGVfhparxVFoIgqI2IxCEO9ygR7deQGd-vkCyggMxSoc0ryrqppVENtQyTmOBHTlbgwcKqMsntgCer0zaQsr0eqg2SR105lDQdUfw8gX33rgo9ITvqKjagPrfHhqf3HrnLili~PIP4lbTftcHeBQQ1lEny8zMTuSuaa915bpb5lo8SiBfh8T40UHwogoKCylCTvtIV8dVck2hT6ecFYq2TaAZ9wiJnagrGSAby24eQcVAdfExmeaut-mf1~9RFkF1QRvun4Se-zgQ__" className='w-25 cursor-pointer slider-img' alt="" />
    </div>
</div>


<div className='bg-black slider'>
    <div className='d-flex align-items-center justify-content-between px-5'>
        <p className='text-light fs-1 fw-bold slider-text'>
        Up to 10% <br/> off Voucher
        </p>
    <img src="https://s3-alpha-sig.figma.com/img/70a5/cb9d/c35ceb717964142f88d228ac751bd812?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gIdlBYrN7~QIDbgdj~T~cUSEgzDbXXJBvT0klTlAWrz15CSIkYVBR5QoYvjV6uQlh3XHxZVmclGVfhparxVFoIgqI2IxCEO9ygR7deQGd-vkCyggMxSoc0ryrqppVENtQyTmOBHTlbgwcKqMsntgCer0zaQsr0eqg2SR105lDQdUfw8gX33rgo9ITvqKjagPrfHhqf3HrnLili~PIP4lbTftcHeBQQ1lEny8zMTuSuaa915bpb5lo8SiBfh8T40UHwogoKCylCTvtIV8dVck2hT6ecFYq2TaAZ9wiJnagrGSAby24eQcVAdfExmeaut-mf1~9RFkF1QRvun4Se-zgQ__" className='w-25 cursor-pointer slider-img' alt="" />
    </div>
</div>
</Carousel>
  

  </>
}
