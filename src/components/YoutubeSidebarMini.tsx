import { BsCollectionPlay } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";

export default function YoutubeSidebarMini() {
  return (
    <div className="fixed left-0 mt-[65px] h-[90%] w-[200px] overflow-auto overflow-x-hidden">
      <div className="w-[200px] p-[0px]">
        <div
          role="button"
          className="flex h-[60px] w-[90px] items-center rounded-md p-[10px] hover:bg-gray-200"
        >
          <div className="flex h-[60px] w-[60px] flex-col items-center justify-center">
            <IoMdHome size={26} />
            <span className="text-[12px]">Home</span>
          </div>
        </div>
        <div
          role="button"
          className="flex h-[60px] w-[90px] items-center rounded-md p-[10px] hover:bg-gray-200"
        >
          <div className="flex h-[60px] w-[60px] flex-col items-center justify-center">
            <SiYoutubeshorts size={22} />
            <span className="text-[12px]">Shorts</span>
          </div>
        </div>
        <div
          role="button"
          className="flex h-[60px] w-[90px] items-center rounded-md p-[10px] hover:bg-gray-200"
        >
          <div className="flex h-[60px] w-[60px] flex-col items-center justify-center">
            <BsCollectionPlay size={22} />
            <span className="text-[12px]">Subscriptions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
