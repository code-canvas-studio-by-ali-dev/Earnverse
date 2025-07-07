import React, { FC } from "react";

interface AdplaceholderProps {
  className: string;
}

const Adplaceholder: FC<AdplaceholderProps> = ({ className = "size-full" }) => {
  return (
    <div
      className={`flex justify-center items-center bg-gray-600 rounded shadow-md ${className}`}
    >
      <p className="text-white text-sm md:text-base font-medium">AD</p>
    </div>
  );
};

export default Adplaceholder;
