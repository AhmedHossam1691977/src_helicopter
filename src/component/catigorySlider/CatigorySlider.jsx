import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import "./CatigorySlider.css"
export default function CatigorySlider() {

    const baseUrl = "https://final-pro-api-j1v7.onrender.com";
    const [allCatigory, setAllCatigory] = useState([]);

    useEffect(() => {
        catigory();
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    async function catigory() {
        const { data } = await axios.get(`${baseUrl}/api/v1/categories`);
        setAllCatigory(data.categories);
    }

    return (
        <>
            <div className="container" id="CatigorySlider">
                <div className="row">
                    <div className="col-12">
                        <h4 className="d-flex justify-content-end fs-2 fw-bolder text-danger underline">الاقسام</h4>
                    </div>

                    <div className="col-12 position-relative">
                        <Carousel
                            responsive={responsive}
                            className='w-100 position-relative my-5 '
                            swipeable={true}
                            draggable={true}
                            showDots={true}
                            ssr={true}
                            infinite={true}
                            autoPlay={false}
                            autoPlaySpeed={false}
                            // customLeftArrow={<></>}
                            // customRightArrow={<></>}
                        >
                            {allCatigory.map((elm) => (
                                <div key={elm._id} className='card mx-2'>
                                    <Link to={`productOfCatigory/${elm._id}`} className=" d-flex align-items-center justify-content-center ">
                                        <div className='cardBody'>
                                            <img src={elm.image} className='w-100 cursor-pointer' alt={elm.name} />
                                            <p className='text-danger fs-5 fw-bold p-3 text-center'>{elm.name}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </>
    );
}
