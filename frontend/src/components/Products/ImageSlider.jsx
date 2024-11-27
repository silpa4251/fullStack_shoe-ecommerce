
import Slider from "react-slick";
import offer from "../../assets/image2.jpg";
import newArrival from "../../assets/image1.jpeg";
import limited from "../../assets/image3.jpg";

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: true,
  };

  const slidesData = [
    {
      id: 1,
      image: offer,
      title: "Big Sale - Up to 50% Off",
      description: "Grab the best deals on our exclusive collection!",
    },
    {
      id: 2,
      image: newArrival,
      title: "New Arrivals",
      description: "Check out the latest shoes in our store!",
    },
    {
      id: 3,
      image: limited,
      title: "Limited Edition",
      description: "Don't miss out on our limited edition sneakers.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto mb-8  mt-4 px-4">
      <Slider {...settings}>
        {slidesData.map((slide) => (
          <div key={slide.id} className="relative h-[500px] md:h-[570px]">
            <div className="w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4">
              <h2 className="text-white text-3xl md:text-5xl font-bold">{slide.title}</h2>
              <p className="text-white text-md md:text-lg mt-2 max-w-lg">{slide.description}</p>
              <button className="mt-6 px-6 py-3 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400 transition duration-300" 
                onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider
