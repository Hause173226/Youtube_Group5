import { BsClock, BsCollectionPlay } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import youtubeMusic from "../assets/youtube-music.svg";
import YoutubeKids from "../assets/youtube-kids.svg";

import {
  MenuUnfoldOutlined,
  FireOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import { AiOutlineLike, AiOutlineRight } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { GoHistory } from "react-icons/go";
import { GrTrophy } from "react-icons/gr";
import { HiOutlineMusicalNote } from "react-icons/hi2";
import { IoFlagOutline, IoHelpCircleOutline } from "react-icons/io5";
import { MdOutlineNewspaper } from "react-icons/md";
import { RiFeedbackLine } from "react-icons/ri";
import { SiYoutubegaming } from "react-icons/si";

export default function YoutubeSidebar() {
  return (
    <div className="fixed left-0 mt-[65px] h-[91%] w-[250px] overflow-auto overflow-x-hidden bg-white">
      <div className="w-[240px]">
        <div className="w-[200px] border-b-2 p-[12px]">
          <div
            role="button"
            className="flex h-[40px] w-[200px] items-center rounded-md p-[12px] hover:bg-gray-200"
          >
            <div className="flex h-[40px] w-[180px] items-center">
              <IoMdHome size={30} />
              <span className="pl-[19px]">Home</span>
            </div>
          </div>
          <div
            role="button"
            className="flex h-[40px] w-[200px] items-center rounded-md p-[12px] hover:bg-gray-200"
          >
            <div className="flex h-[40px] w-[180px] items-center">
              <SiYoutubeshorts
                size={30}
                className="fill-transparent stroke-[1.5] p-[3px]"
              />
              <span className="pl-[19px]">Shorts</span>
            </div>
          </div>
          <div
            role="button"
            className="flex h-[40px] w-[200px] items-center rounded-md p-[12px] hover:bg-gray-200"
          >
            <div className="flex h-[40px] w-[180px] items-center">
              <BsCollectionPlay size={24} />
              <span className="pl-[24px]">Subscriptions</span>
            </div>
          </div>
        </div>
        <div className="mt-3 border-b-2 px-[12px] pb-[12px]">
          <div
            role="button"
            className="flex h-[40px] w-[200px] items-center rounded-md p-[12px] hover:bg-gray-200"
          >
            <div className="flex h-[40px] w-[180px] items-center">
              <span className="mr-2 text-[17px] font-medium">You</span>
              <AiOutlineRight size={17} />
            </div>
          </div>
          <div
            role="button"
            className="flex h-[40px] w-[200px] items-center rounded-md p-[12px] hover:bg-gray-200"
          >
            <div className="flex h-[40px] w-[180px] items-center">
              <GoHistory size={24} />
              <span className="pl-[24px]">History</span>
            </div>
          </div>
          <div
            role="button"
            className="flex h-[40px] w-[200px] items-center rounded-md p-[12px] hover:bg-gray-200"
          >
            <div className="flex h-[40px] w-[180px] items-center">
              <MenuUnfoldOutlined style={{ fontSize: "24px" }} />
              <span className="pl-[24px]">Playlists</span>
            </div>
          </div>
          <div
            role="button"
            className="flex h-[40px] w-[200px] items-center rounded-md p-[12px] hover:bg-gray-200"
          >
            <div className="flex h-[40px] w-[180px] items-center">
              <BsClock style={{ fontSize: "24px" }} />
              <span className="pl-[24px]">Watch later</span>
            </div>
          </div>
          <div
            role="button"
            className="flex h-[40px] w-[200px] items-center rounded-md p-[12px] hover:bg-gray-200"
          >
            <div className="flex h-[40px] w-[180px] items-center">
              <AiOutlineLike style={{ fontSize: "24px" }} />
              <span className="pl-[24px]">Liked videos</span>
            </div>
          </div>
        </div>

        <div className="w-[240px]">
          <div className="w-[216px] border-b-2 p-[12px]">
            <div className="w-[192px] px-3 pb-[4px] pt-[6px] text-[17px] font-medium">
              Explore
            </div>
            <div
              role="button"
              className="flex h-[40px] w-[200px] items-center rounded-md p-[12px] hover:bg-gray-200"
            >
              <div className="flex h-[40px] w-[180px] items-center">
                <FireOutlined style={{ fontSize: "24px" }} />
                <span className="pl-[24px]">Trending</span>
              </div>
            </div>
            <div
              role="button"
              className="flex h-[40px] w-[200px] items-center rounded-md p-[12px] hover:bg-gray-200"
            >
              <div className="flex h-[40px] w-[180px] items-center">
                <HiOutlineMusicalNote size={24} />
                <span className="pl-[24px]">Music</span>
              </div>
            </div>
            <div
              role="button"
              className="flex h-[40px] w-[200px] items-center rounded-md p-[12px] hover:bg-gray-200"
            >
              <div className="flex h-[40px] w-[180px] items-center">
                <SiYoutubegaming size={24} className="" />
                <span className="pl-[24px]">Gaming</span>
              </div>
            </div>
            <div
              role="button"
              className="flex h-[40px] w-[200px] items-center rounded-md p-[12px] hover:bg-gray-200"
            >
              <div className="flex h-[40px] w-[180px] items-center">
                <MdOutlineNewspaper size={24} className="" />
                <span className="pl-[24px]">News</span>
              </div>
            </div>
            <div
              role="button"
              className="flex h-[40px] w-[200px] items-center rounded-md p-[12px] hover:bg-gray-200"
            >
              <div className="flex h-[40px] w-[180px] items-center">
                <GrTrophy size={24} className="" />
                <span className="pl-[24px]">Sport</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[240px]">
          <div className="w-[216px] border-b-2 p-[12px]">
            <div className="w-[192px] px-3 pb-[4px] pt-[6px] text-[17px] font-medium">
              More from Youtube
            </div>
            <div
              role="button"
              className="flex h-[40px] w-[200px] items-center rounded-md p-[12px] hover:bg-gray-200"
            >
              <div className="flex h-[40px] w-[180px] items-center">
                <YoutubeFilled style={{ fontSize: "24px", color: "red" }} />
                <span className="pl-[24px]">Youtube Premium</span>
              </div>
            </div>
            <div
              role="button"
              className="flex h-[40px] w-[200px] items-center rounded-md p-[12px] hover:bg-gray-200"
            >
              <div className="flex h-[40px] w-[180px] items-center">
                <img
                  src={youtubeMusic}
                  className="h-[24px] w-[24px] object-cover"
                />
                <span className="pl-[24px]">Youtube Music</span>
              </div>
            </div>
            <div
              role="button"
              className="flex h-[40px] w-[200px] items-center rounded-md p-[12px] hover:bg-gray-200"
            >
              <div className="flex h-[40px] w-[180px] items-center">
                <img src={YoutubeKids} className="h-[24px] w-[24px]" />
                <span className="pl-[24px]">Youtube kids</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[240px]">
          <div className="w-[216px] border-b-2 p-[12px]">
            <div
              role="button"
              className="flex h-[40px] w-[200px] items-center rounded-md p-[12px] hover:bg-gray-200"
            >
              <div className="flex h-[40px] w-[180px] items-center">
                <CiSettings size={28} />
                <span className="pl-[24px]">Settings</span>
              </div>
            </div>
            <div
              role="button"
              className="flex h-[40px] w-[200px] items-center rounded-md p-[12px] hover:bg-gray-200"
            >
              <div className="flex h-[40px] w-[180px] items-center">
                <IoFlagOutline size={24} className="" />
                <span className="pl-[24px]">Report History</span>
              </div>
            </div>
            <div
              role="button"
              className="flex h-[40px] w-[200px] items-center rounded-md p-[12px] hover:bg-gray-200"
            >
              <div className="flex h-[40px] w-[180px] items-center">
                <IoHelpCircleOutline size={28} />
                <span className="pl-[24px]">Help</span>
              </div>
            </div>
            <div
              role="button"
              className="flex h-[40px] w-[200px] items-center rounded-md p-[12px] hover:bg-gray-200"
            >
              <div className="flex h-[40px] w-[180px] items-center">
                <RiFeedbackLine size={26} />
                <span className="pl-[24px]">Send Feedback</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
