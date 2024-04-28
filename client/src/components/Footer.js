const Footer = () => {
  return (
    <div className="bg-[#FAFBFC] sm:px-28 px-10">
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4  text-sm py-4">
        <div className="flex flex-col">
          <h2 className="font-bold">ONLINE SHOPPING</h2>
          <div className="flex flex-col mt-10 gap-y-1 text-xs">
            <a href="">Men</a>
            <a href="">Women</a>
            <a href="">Kids</a>
            <a href="">Home & Living</a>
            <a href="">Beauty</a>
            <a href="">Gift Cards</a>
            <a href="">Myntra Insider</a>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold">ONLINE SHOPPING</h2>
          <div className="flex flex-col mt-10 gap-y-1 text-xs">
            <a href="">Men</a>
            <a href="">Women</a>
            <a href="">Kids</a>
            <a href="">Home & Living</a>
            <a href="">Beauty</a>
            <a href="">Gift Cards</a>
            <a href="">Myntra Insider</a>
          </div>
        </div>

        <div className=" flex-col flex">
          <h2 className="font-bold text-nowrap">
            EXPERIENCE MYNTRA APP ON MOBILE
          </h2>
          <div className="flex mt-10">
            <img
              src="https://constant.myntassets.com/web/assets/img/80cc455a-92d2-4b5c-a038-7da0d92af33f1539674178924-google_play.png"
              alt="playstore_logo"
              className="h-12"
            />
            <img
              src="https://constant.myntassets.com/web/assets/img/bc5e11ad-0250-420a-ac71-115a57ca35d51539674178941-apple_store.png"
              alt="applestore_logo"
              className="h-12"
            />
          </div>
          <div className="mt-6">
            <h2>KEEP IN TOUCH</h2>
            <div className="flex mt-3 gap-x-4">
              <img
                src="https://constant.myntassets.com/web/assets/img/d2bec182-bef5-4fab-ade0-034d21ec82e31574604275433-fb.png"
                alt="fb"
                className="h-5"
              />
              <img
                src="https://constant.myntassets.com/web/assets/img/d2bec182-bef5-4fab-ade0-034d21ec82e31574604275433-fb.png"
                alt="fb"
                className="h-5"
              />
              <img
                src="https://constant.myntassets.com/web/assets/img/a7e3c86e-566a-44a6-a733-179389dd87111574604275355-yt.png"
                alt="fb"
                className="h-5"
              />
              <img
                src="https://constant.myntassets.com/web/assets/img/a7e3c86e-566a-44a6-a733-179389dd87111574604275355-yt.png"
                alt="fb"
                className="h-5"
              />
            </div>
          </div>
        </div>

        {/* mobile only */}
        <div className="sm:hidden">
          {" "}
          <div className="flex gap-x-2">
            <img
              src="https://constant.myntassets.com/web/assets/img/6c3306ca-1efa-4a27-8769-3b69d16948741574602902452-original.png"
              alt="logo"
              className="h-12"
            />
            <h2 className="text-base text-start">
              <span className="font-bold">100% ORIGINAL</span> for
              <br />
              all products at myntra.com
            </h2>
          </div>
          <div className="flex items-center gap-x-2">
            <img
              src="https://assets.myntassets.com/assets/images/retaillabs/2023/5/22/becb1b16-86cc-4e78-bdc7-7801c17947831684737106127-Return-Window-image.png"
              alt="logo"
              className="h-14"
            />
            <h2 className="text-sm text-start">
              <span className="font-bold">Return within 14days</span> of
              <br />
              receiving your order
            </h2>
          </div>
        </div>

        <div className="flex-col col-span-3 hidden sm:flex w-full col-end-8 gap-y-5">
          <div className="flex gap-x-2">
            <img
              src="https://constant.myntassets.com/web/assets/img/6c3306ca-1efa-4a27-8769-3b69d16948741574602902452-original.png"
              alt="logo"
              className="h-12"
            />
            <h2 className="text-base text-start">
              <span className="font-bold">100% ORIGINAL</span> for
              <br />
              all products at myntra.com
            </h2>
          </div>
          <div className="flex items-center gap-x-2">
            <img
              src="https://assets.myntassets.com/assets/images/retaillabs/2023/5/22/becb1b16-86cc-4e78-bdc7-7801c17947831684737106127-Return-Window-image.png"
              alt="logo"
              className="h-14"
            />
            <h2 className="text-sm text-start">
              <span className="font-bold">Return within 14days</span> of
              <br />
              receiving your order
            </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <h2 className="font-bold">ONLINE SHOPPING</h2>
        <div className="flex flex-wrap gap-x-2 text-xs my-4">
          {categories.map((e) => (
            <a href={e} key={e}>
              {e} |
            </a>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <h2>© 2024 www.myntra.com. All rights reserved.</h2>
      </div>
    </div>
  );
};

export default Footer;
