import Button from '../../components/Button';

const ProductCard = (props) => {
  const { sdata } = props;
  const { mainImage, description, price } = sdata;

  return (
    <div className="group m-10 mb-24 flex h-96 w-72 flex-wrap justify-center  rounded-md ">
      <div id="one" className="items-center duration-700 hover:scale-110">
        <div className=" relative flex flex-col ">
          <div className=" relative right-11 top-28 float-left ml-3 flex h-11 w-11 flex-col items-center justify-center  rounded-full opacity-0 transition-all duration-300 hover:bg-black group-hover:right-0 group-hover:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute z-50 h-6 w-9 text-black transition-all duration-300 hover:text-white"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>

          <div className="relative right-11 top-28 float-left ml-3 flex h-11 w-11  flex-col items-center justify-center rounded-full opacity-0 transition-all duration-500 hover:bg-black group-hover:right-0  group-hover:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute z-50 h-6 w-9 text-black transition-all duration-300 hover:text-white"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
        </div>
        <img
          className="h-96 w-72 object-contain hover:border-2 hover:border-solid hover:border-gray-600"
          alt="cardImg"
          src={mainImage.url}
        />

        <Button
          type="button"
          className="relative bottom-0 right-11 m-auto flex w-96 scale-50 items-center justify-center rounded-lg px-10 py-8 text-center  text-xl text-white opacity-0 transition-all duration-500 hover:bg-orange-600 group-hover:bottom-24 group-hover:opacity-100"
        >
          Add To Cart
        </Button>
      </div>

      <div>
        <div className="relative bottom-20 right-8 m-auto">
          <h3 className="w-64">
            {description} - {price}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
