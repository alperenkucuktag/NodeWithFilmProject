import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className='flex justify-between items-center px-5 border-b'>
      <Link to={"/"}>
        <div className='flex items-center'>
          <img src='/movo.gif' width={80} alt='' />
          <span className='font-bold text-2xl max-sm:hidden'>Movies</span>
        </div>
      </Link>
      <Link
        to={"/create"}
        className='border rounded-full py-1 px-5 hover:bg-black hover:text-white  transition'
      >
        Film Oluştur
      </Link>
    </header>
  );
};

export default Header;
