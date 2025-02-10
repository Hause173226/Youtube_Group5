import React from "react";
import { Video } from "../types/YouTubeTypes";

interface SearchResultsProps {
  videos: Video[]; // Mảng chứa danh sách video
}

const SearchVideoResults: React.FC<SearchResultsProps> = ({ videos }) => {
  if (videos.length === 0) {
    return (
      <div className="mt-4 text-center text-gray-500">
        Không tìm thấy kết quả nào.
      </div>
    );
  }

  return (
    <div className="ml-[240px] mt-[60px] grid grid-cols-1 gap-4 p-4">
      {videos.map((video) => (
        <div
          role="button"
          className="flex h-[330px] items-start rounded-xl bg-white p-4 transition-all duration-300 hover:shadow-lg"
          key={video.id}
        >
          {/* Video Thumbnail */}
          <img
            src={video.snippet.thumbnails.high.url}
            alt={video.snippet.title}
            className="mb-3 h-[300px] w-[450px] shrink-0 rounded-xl object-cover transition-all duration-300 hover:rounded-none"
          />

          {/* Video Details */}
          <div className="ml-5 flex flex-col">
            <div className="flex items-start space-x-3">
              {/* Channel Avatar */}

              <div>
                {/* Video Title */}
                <h3
                  role="button"
                  className="line-clamp-2 text-lg font-semibold text-gray-800"
                >
                  {video.snippet.title}
                </h3>
                {/* Channel Name */}
                <p className="text-sm text-gray-600">
                  {video.snippet.channelTitle}
                </p>
                <div className="mt-2 text-sm text-gray-500">
                  <p>
                    {new Date(video.snippet.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Video Stats */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchVideoResults;
