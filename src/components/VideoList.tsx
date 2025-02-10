import React from "react";
import { Video } from "../types/YouTubeTypes";
import { BiDotsVerticalRounded } from "react-icons/bi";

interface VideoListProps {
  videos: Video[];
  channelAvatars: { [key: string]: string };
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + "...";
  }
  return text;
};

const VideoList: React.FC<VideoListProps> = ({ videos, channelAvatars }) => {
  return (
    <div className="ml-[247px] mt-[80px] grid w-[82%] grid-cols-1 gap-5 p-2 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <div role="button" className="h-[380px] rounded-xl p-3" key={video.id}>
          <img
            src={video.snippet.thumbnails.high.url}
            alt={video.snippet.title}
            className="h-2/3 w-full rounded-xl transition-all duration-300 hover:rounded-none"
          />
          <div className="mt-3 flex w-full justify-start">
            <img
              src={channelAvatars[video.snippet.channelId] || ""}
              alt={video.snippet.channelTitle}
              className="mr-3 h-10 w-10 rounded-full"
            />
            <div>
              <div className="flex items-center">
                <h3 role="button" className="w-full text-lg font-semibold">
                  {truncateText(video.snippet.title, 45)}
                </h3>
              </div>
              <div role="button" className="text-gray-600 hover:font-medium">
                {video.snippet.channelTitle}
              </div>
              <p className="text-gray-800">
                Views: {video.statistics.viewCount}
              </p>
            </div>
            <div className="ml-auto w-[25px]">
              <BiDotsVerticalRounded
                size={24}
                role="button"
                className="h-[40px] w-[40px] rounded-full p-2 hover:bg-gray-100 active:bg-gray-200"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
