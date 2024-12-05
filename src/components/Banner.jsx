import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'animate.css'; 
import pic1 from "../assets/1.jpg"
import pic2 from "../assets/2.jpg"
import pic3 from "../assets/3.jpg"

const Banner = () => {
  return (
    <div className="w-full mx-auto my-10">
      <Carousel
        infiniteLoop
        useKeyboardArrows
        autoPlay={false}
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        dynamicHeight={false}
        swipeable
        emulateTouch
        interval={3000}
        transitionTime={500}
        thumbWidth={80}
        stopOnHover
        renderArrowPrev={(clickHandler) => (
          <button
            className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-lg z-10 animate__animated animate__fadeInLeft"
            onClick={clickHandler}
          >
            &lt;
          </button>
        )}
        renderArrowNext={(clickHandler) => (
          <button
            className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-lg z-10 animate__animated animate__fadeInRight"
            onClick={clickHandler}
          >
            &gt;
          </button>
        )}

      >
       
        <div className="lg:w-8/12 mx-auto object-cover animate__animated animate__fadeIn">
          <img
            src={pic1}
            alt="image 1"
            className="w-full lg:h-[350px] object-cover"
          />
        </div>
        <div className="lg:w-8/12 mx-auto object-cover animate__animated animate__fadeIn">
          <img
            src={pic2}
            alt="image 2"
            className="w-full lg:h-[350px] object-cover"
          />
        </div>
        <div className="lg:w-8/12 mx-auto object-cover animate__animated animate__fadeIn">
          <img
            src={pic3}
            alt="image 3"
            className="w-full lg:h-[350px] object-cover"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;