import { useState} from "react";
import { Link } from "react-router-dom";
import png from "../../images/favicon.png";


const Header = () =>{
  
    const [btn,setbtn]=useState("Login");
    const [searchText,setSearchText]=useState("");
    return(
     <div className="flex justify-between h-20 px-6 mt-10 text-2xl shadow-md" >
        <div className="w-16 h-16">
            <img src={png} alt="logo"/>
        </div>
     
        <div className="nav-item">
         <ul className="flex gap-8">
         <li className="active">  <Link to="/" className="link" >Home</Link></li>
           <li> <Link to="/profile" className="link">Profile</Link></li>
           <li> <Link to="/wishlist" className="link">Wishlist</Link></li>
           <li> <Link to="/login" className="link">Bag</Link></li>
            <li><Link to="/login"><button className="login-btn" onClick={()=>{
                setbtn("Logout");
            }}>{btn}</button></Link></li>
         </ul>
        </div>
      
     </div>
    );
};

export default Header;