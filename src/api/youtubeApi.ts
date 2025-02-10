import axios from "axios";
import { Video } from "../types/YouTubeTypes";

const API_KEY = "AIzaSyBDVfuFt_KJiPcU1MVCcJJn1_WIT0K3_lY";
const VIDEO_API_URL = "https://www.googleapis.com/youtube/v3/videos";
const CHANNEL_API_URL = "https://www.googleapis.com/youtube/v3/channels";
const SEARCH_API_URL = "https://www.googleapis.com/youtube/v3/search";

// Lấy danh sách video phổ biến
export const fetchVideos = async (): Promise<Video[]> => {
  const response = await axios.get(VIDEO_API_URL, {
    params: {
      part: "snippet,statistics",
      chart: "mostPopular",
      regionCode: "VN",
      maxResults: 20,
      key: API_KEY,
    },
  });
  return response.data.items;
};

// Lấy ảnh đại diện của các kênh
export const fetchChannelAvatars = async (
  channelIds: string[],
): Promise<{
  [key: string]: string;
}> => {
  const response = await axios.get(CHANNEL_API_URL, {
    params: {
      part: "snippet",
      id: channelIds.join(","),
      key: API_KEY,
    },
  });

  const avatars: { [key: string]: string } = {};
  response.data.items.forEach((channel: any) => {
    avatars[channel.id] = channel.snippet.thumbnails.default.url;
  });

  return avatars;
};

export const searchVideos = async (query: string): Promise<Video[]> => {
  const response = await axios.get(SEARCH_API_URL, {
    params: {
      part: "snippet",
      q: query,
      type: "video",
      maxResults: 20,
      key: API_KEY,
    },
  });

  return response.data.items.map((item: any) => ({
    ...item,
    id: item.id.videoId, // Chuyển ID sang dạng phù hợp
  }));
};
