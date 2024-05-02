import React from "react";
import png from "../../images/favicon.png";
import { Link } from "react-router-dom";
const RegistrationPage = () => {
  return (
        <div className="flex flex-wrap my-4 w-full px-4">
          <div className="w-full px-4 ">
            <div className="relative mx-auto max-w-[525px] border-solid border-2  rounded-lg bg-white px-10 py-16 text-center sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16">
                <Link to="/" className="mx-auto inline-block max-w-[160px]"><img src={png}/></Link>
              </div>
              <form>
                <InputBox type="text" name="name" placeholder="Full name" />
                <InputBox type="email" name="email" placeholder="Email" />
                <InputBox type="password" name="password" placeholder="Password" />
                <div className="mb-10">
                  <input type="submit" value="Register" className="w-full rounded-md  px-5 py-3 bg-slate-600 font-medium text-white transition hover:bg-opacity-90"/>
                </div>
              </form>
            </div>
          </div>
        </div>
  );
};
export default RegistrationPage;

const InputBox = ({ type, placeholder, name }) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="w-full rounded-md border bg-transparent px-5 py-3 text-base outline-none focus-visible:shadow-none"
      />
    </div>
  );
};
