import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'animate.css'; 

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
            src="https://i.ibb.co.com/2SGbVqN/4.jpg"
            alt="image 1"
            className="w-full lg:h-[350px] object-cover"
          />
        </div>
        <div className="lg:w-8/12 mx-auto object-cover animate__animated animate__fadeIn">
          <img
            src="https://i.ibb.co.com/QpCcNxF/3.jpg"
            alt="image 2"
            className="w-full lg:h-[350px] object-cover"
          />
        </div>
        <div className="lg:w-8/12 mx-auto object-cover animate__animated animate__fadeIn">
          <img
            src="https://i.ibb.co.com/gy0fpVG/2.jpg"
            alt="image 3"
            className="w-full lg:h-[350px] object-cover"
          />
        </div>
        <div className="lg:w-8/12 mx-auto object-cover animate__animated animate__fadeIn">
          <img
            src="https://i.ibb.co.com/3C7Jfr1/1.jpg "
            alt="image 4"
            className="w-full lg:h-[350px] object-cover"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;