import React from "react";
import { CiImageOff } from "react-icons/ci";

const CardSkeleton = ({ error }: { error?: boolean }) => {
  return (
    <div
      className={` h-[450px] md:h-[335px] w-[100%] grid place-items-centre bg-primary "
      }`}
    >
        
        {error && <CiImageOff size={55}/>}
    </div>
  );
};

export default CardSkeleton;
