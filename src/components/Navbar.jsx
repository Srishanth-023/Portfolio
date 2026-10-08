import { NavLink } from "react-router-dom";

import { logo } from "../assets/images";

import { personalInfo } from "../constants";

const Navbar = () => {
  return (
    <header className='header'>
      <NavLink to='/' className="cube-container mt-2 shadow-md">
        <div className="cube">
          <div className="cube-face cube-front">S</div>
          <div className="cube-face cube-back">S</div>
          <div className="cube-face cube-right">S</div>
          <div className="cube-face cube-left">S</div>
          <div className="cube-face cube-top">S</div>
          <div className="cube-face cube-bottom">S</div>
        </div>
      </NavLink>
      <nav className='flex text-lg gap-7 font-medium'>
        <NavLink to='/about' className={({ isActive }) => isActive ? "text-blue-600" : "text-black" }>
          About
        </NavLink>
        <NavLink to='/projects' className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}>
          Projects
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
