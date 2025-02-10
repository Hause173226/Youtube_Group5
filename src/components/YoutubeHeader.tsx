import { AiOutlineMenu } from "react-icons/ai";
import youtubeHeader from "../assets/youtube_logo.jpg";
import avt from "../assets/avt2.png";
import { CiSearch } from "react-icons/ci";
import { PiMicrophoneFill } from "react-icons/pi";
import { TfiPlus } from "react-icons/tfi";
import { IoNotificationsOutline } from "react-icons/io5";
import { useState } from "react";

const YoutubeHeader: React.FC<{
  setChangeSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  onSearch: (query: string) => void; // Định nghĩa chính xác kiểu cho onSearch
}> = ({ setChangeSidebar, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query); // Gửi query về component cha
    }
  };

  const handleSidebarToggle = () => {
    setChangeSidebar((prev) => !prev); // Toggle sidebar
  };

  return (
    <div className="flex items-center justify-between px-4">
      <div className="flex items-center">
        <div
          role="button"
          className="flex h-[40px] w-[40px] items-center justify-center rounded-full hover:bg-gray-200 active:bg-gray-300"
          onClick={handleSidebarToggle}
        >
          <AiOutlineMenu size={22} />
        </div>
        <div role="button" className="oject-cover ml-2">
          <img
            src={youtubeHeader}
            alt="youtube logo"
            className="h-[66px] w-[128px]"
          />
        </div>
      </div>
      <div className="flex h-[40px] w-[732px] items-center">
        <form
          className="ml-8 flex items-center pl-4 pr-1"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="h-[40px] w-[536px] rounded-l-3xl border border-gray-300 pl-[16px] pr-[4px]"
          />
          <button
            type="submit"
            className="flex h-[40px] w-[64px] items-center justify-center rounded-r-3xl border border-gray-300 bg-gray-50 hover:bg-gray-200"
            onClick={handleSubmit}
          >
            <CiSearch size={24} />
          </button>
        </form>
        <div
          role="button"
          className="ml-3 flex h-[40px] w-[40px] items-center justify-center rounded-3xl bg-gray-100 hover:bg-gray-200"
        >
          <PiMicrophoneFill size={20} />
        </div>
      </div>
      <div className="flex h-[40px] w-[225px] items-center justify-center">
        <div
          role="button"
          className="flex h-[36px] w-[97.19px] items-center rounded-3xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300"
        >
          <TfiPlus size={28} className="pl-2" />
          <span className="ml-2 font-medium">Create</span>
        </div>
        <div
          role="button"
          className="ml-3 flex h-[40px] w-[40px] items-center justify-center rounded-full hover:bg-gray-200 active:bg-gray-300"
        >
          <IoNotificationsOutline size={24} />
        </div>
        <div className="ml-3" role="button">
          <img
            src={avt}
            alt="avatar"
            className="ml-3 h-[30px] w-[30px] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default YoutubeHeader;
