import React from "react";
import { BsBoxSeam, BsTruck } from "react-icons/bs";
import ExploreBanner from "./ExploreBanner";
import NewlyPosted from "./NewlyPosted";
import AllProducts from "./AllProducts";
import search from '../../../src/assets/img/search.png';
import camera from '../../../src/assets/img/camera.png';

const ExplorePage = () => {
  return (
    <div className="bg-[#E8F5E9] min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ExploreBanner />

        <div className="mt-6 mb-10 w-full flex justify-center">
          <div className="w-full max-w-5xl bg-[#E8F5E9] rounded-full flex items-center h-14 px-6 drop-shadow-md">
            <img src={search} alt="Tìm kiếm" className="w-5 h-5 flex-shrink-0" />
            <input
              type="text"
              placeholder="Nhập đồ mà bạn muốn tìm kiếm...."
              className="flex-grow bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-700 px-3 text-base font-[Montserrat]"
            />
            <img src={camera} alt="Camera" className="w-5 h-5 flex-shrink-0" />
          </div>
        </div>
      </div>

      <div >
        <NewlyPosted />
         <AllProducts />
      </div>
    </div>
  );
};


export default ExplorePage;
