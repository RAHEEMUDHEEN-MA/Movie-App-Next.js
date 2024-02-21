import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="text-center font-light text-textColour pt-5 text-[13px] md:text-[16px]">
      @ raheemudheen | Lorem, ipsum.2024
      <Link href={"https://github.com/RAHEEMUDHEEN-MA"}>
        <p className="text-[15px] hover:text-red-700 ">Check my Github</p>
      </Link>
    </div>
  );
};

export default Footer;
