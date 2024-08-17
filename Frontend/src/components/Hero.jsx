import React, { useState, useEffect } from "react";

const Hero = () => {
  // Arka plan resimlerini tanımlıyoruz
  const backgrounds = [
    "bg-inception",
    "bg-interstellar",
    "bg-lotr",
    "bg-joker",
    "bg-matrix",
  ];

  // Başlangıçta ilk arka plan resmini kullanıyoruz
  const [currentBackground, setCurrentBackground] = useState(0);

  // useEffect hook'u ile arka plan resimlerini değiştirmek için bir interval ayarlıyoruz
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground(
        (prevBackground) => (prevBackground + 1) % backgrounds.length
      );
    }, 15000); // Her 15 saniyede bir arka plan resmini değiştir

    return () => clearInterval(interval); // Bileşen unmount olduğunda interval'i temizle
  }, []);

  return (
    <div className='relative overflow-hidden p-20 py-20 lg:px-10 bg-cover bg-center text-white'>
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out ${backgrounds[currentBackground]} animate-zoom-slide`}
      />
      <h1 className='relative text-4xl md:text-5xl font-bold z-10'>
        Hoşgeldin
      </h1>
      <h2 className='relative text-2xl md:text-3xl font-semibold z-10'>
        100+ den Fazla Film Burda
      </h2>
      <div className='relative rounded-full flex mt-5 overflow-hidden z-10'>
        <input
          className='w-full p-2 rounded-full text-gray-600 px-4 border-none focus:outline-none'
          placeholder='Ara....'
          type='text'
        />
        <button className='absolute end-0 bg-blue-900 h-full w-20 font-semibold hover:bg-slate-800 transition'>
          Ara
        </button>
      </div>
    </div>
  );
};

export default Hero;
