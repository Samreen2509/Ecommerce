import img from "../../images/favicon.png";

const Footer = () => {
  const firstCol = ["About us", "Contact", "Agency", "Contact", "Agency"];
  const secondCol = [
    "Animated videos",
    "Website design",
    "Illustration",
    "Social Media",
    "Brochure",
    "Logo",
  ];

  return (
    <>
      <div className="grid grid-cols-1 grid-rows-2 border-t-2 bg-gradient-to-b from-white to-blue-200 px-10 py-8 sm:h-[400px] sm:grid-cols-5 sm:grid-rows-1 sm:px-20 ">
        <div className="col-span-2 flex flex-col items-start justify-start">
          <div className="flex items-center space-x-1 text-[#B91708]">
            {/* <h2 className="text-2xl font-extrabold">LOGO</h2> */}
            <img src={img} className="h-24 object-cover" />
          </div>
          <p className="mt-2 text-xl">
            Reach us Monday {"-"}
            Friday from 9 am to 6 pm
          </p>
          <p className="text-sm">+1 001 234 5678</p>
          <div className="mt-4 flex gap-x-4 sm:mt-6">
            <div className="h-8 w-8 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="blue"
              >
                <path d="M194.4 211.7a53.3 53.3 0 1 0 59.3 88.7 53.3 53.3 0 1 0 -59.3-88.7zm142.3-68.4c-5.2-5.2-11.5-9.3-18.4-12c-18.1-7.1-57.6-6.8-83.1-6.5c-4.1 0-7.9 .1-11.2 .1c-3.3 0-7.2 0-11.4-.1c-25.5-.3-64.8-.7-82.9 6.5c-6.9 2.7-13.1 6.8-18.4 12s-9.3 11.5-12 18.4c-7.1 18.1-6.7 57.7-6.5 83.2c0 4.1 .1 7.9 .1 11.1s0 7-.1 11.1c-.2 25.5-.6 65.1 6.5 83.2c2.7 6.9 6.8 13.1 12 18.4s11.5 9.3 18.4 12c18.1 7.1 57.6 6.8 83.1 6.5c4.1 0 7.9-.1 11.2-.1c3.3 0 7.2 0 11.4 .1c25.5 .3 64.8 .7 82.9-6.5c6.9-2.7 13.1-6.8 18.4-12s9.3-11.5 12-18.4c7.2-18 6.8-57.4 6.5-83c0-4.2-.1-8.1-.1-11.4s0-7.1 .1-11.4c.3-25.5 .7-64.9-6.5-83l0 0c-2.7-6.9-6.8-13.1-12-18.4zm-67.1 44.5A82 82 0 1 1 178.4 324.2a82 82 0 1 1 91.1-136.4zm29.2-1.3c-3.1-2.1-5.6-5.1-7.1-8.6s-1.8-7.3-1.1-11.1s2.6-7.1 5.2-9.8s6.1-4.5 9.8-5.2s7.6-.4 11.1 1.1s6.5 3.9 8.6 7s3.2 6.8 3.2 10.6c0 2.5-.5 5-1.4 7.3s-2.4 4.4-4.1 6.2s-3.9 3.2-6.2 4.2s-4.8 1.5-7.3 1.5l0 0c-3.8 0-7.5-1.1-10.6-3.2zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM357 389c-18.7 18.7-41.4 24.6-67 25.9c-26.4 1.5-105.6 1.5-132 0c-25.6-1.3-48.3-7.2-67-25.9s-24.6-41.4-25.8-67c-1.5-26.4-1.5-105.6 0-132c1.3-25.6 7.1-48.3 25.8-67s41.5-24.6 67-25.8c26.4-1.5 105.6-1.5 132 0c25.6 1.3 48.3 7.1 67 25.8s24.6 41.4 25.8 67c1.5 26.3 1.5 105.4 0 131.9c-1.3 25.6-7.1 48.3-25.8 67z" />
              </svg>
            </div>
            <div className="h-8 w-8  cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="blue"
                viewBox="0 0 448 512"
              >
                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-bold">COMPANY</h2>
          <div className="mt-4 flex flex-col gap-y-3 sm:mt-12">
            {firstCol.map((item, index) => (
              <a
                key={index}
                className="transition duration-150 hover:font-bold hover:text-blue-500"
                href={"#"}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="">
          <h2 className="font-bold">Services</h2>
          <div className="mt-4 flex flex-col gap-y-3 sm:mt-12">
            {secondCol.map((service, index) => (
              <a
                className="transition duration-150 hover:font-bold hover:text-blue-500"
                key={index}
                href={"#"}
              >
                {service}
              </a>
            ))}
          </div>
        </div>
        {/* Contact US */}
        <div>
          <h2 className="font-bold">Newsletter</h2>
          <div className="mt-4 flex items-center justify-center sm:mt-12">
            <div className="grid w-80 grid-rows-4 gap-4">
              <input
                type="text"
                className="h-10 w-full rounded border bg-white p-2 text-sm"
                placeholder="Enter your email"
              />
              <button className="rounded bg-[#FD5E57] text-gray-50 hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600">
                Subscribe to the newsletter
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-9 w-full items-center justify-center bg-blue-500 text-white">
        <h2 cla>Copyright 2021 Hublet By Qodex</h2>
      </div>
    </>
  );
};

export default Footer;
