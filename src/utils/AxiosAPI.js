import axios from "axios";
import { useEffect, useState } from "react";

const API_KEY = "AIzaSyD6pcgd6LI0HmBnvp8VDZvpM4xEIPqG4vE ";
const MAX_RESULTS = 12;

const youtubeApi = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    key: API_KEY,
  },
});

const fetchPopularVideos = async (pageToken = "") => {
  try {
    const response = await youtubeApi.get("/videos", {
      params: {
        part: "snippet,statistics,contentDetails",
        chart: "mostPopular",
        maxResults: MAX_RESULTS,
        pageToken,
        regionCode: "US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popular videos:", error);
    throw error;
  }
};

const searchVideos = async (query, pageToken = "") => {
  try {
    const searchResponse = await youtubeApi.get("/search", {
      params: {
        part: "snippet",
        maxResults: MAX_RESULTS,
        q: query,
        type: "video",
        pageToken,
      },
    });

    const videoIds = searchResponse.data.items
      .map((item) => item.id.videoId)
      .join(",");
    const videoResponse = await youtubeApi.get("/videos", {
      params: {
        part: "snippet,statistics,contentDetails",
        id: videoIds,
      },
    });

    return {
      items: videoResponse.data.items,
      nextPageToken: searchResponse.data.nextPageToken,
    };
  } catch (error) {
    console.error("Error searching videos:", error);
    throw error;
  }
};

const fetchVideosByCategory = async (categoryId, pageToken = "") => {
  try {
    const response = await youtubeApi.get("/videos", {
      params: {
        part: "snippet,statistics,contentDetails",
        chart: "mostPopular",
        maxResults: MAX_RESULTS,
        pageToken,
        videoCategoryId: categoryId,
        regionCode: "US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching videos by category:", error);
    throw error;
  }
};

const fetchVideoDetails = async (videoId) => {
  try {
    const [videoResponse, commentsResponse] = await Promise.all([
      youtubeApi.get("/videos", {
        params: {
          part: "snippet,statistics,contentDetails",
          id: videoId,
        },
      }),
      youtubeApi.get("/commentThreads", {
        params: {
          part: "snippet,replies",
          videoId: videoId,
          maxResults: 20,
          order: "relevance",
        },
      }),
    ]);

    const channelId = videoResponse.data.items[0].snippet.channelId;
    const channelResponse = await youtubeApi.get("/channels", {
      params: {
        part: "snippet,statistics",
        id: channelId,
      },
    });

    return {
      videoDetails: videoResponse.data.items[0],
      comments: commentsResponse.data.items,
      channelDetails: channelResponse.data.items[0],
    };
  } catch (error) {
    console.error("Error fetching video details:", error);
    throw error;
  }
};

const fetchRelatedVideos = async (videoId) => {
  try {
    const relatedResponse = await youtubeApi.get("/search", {
      params: {
        part: "snippet",
        relatedToVideoId: videoId,
        type: "video",
        maxResults: 15,
      },
    });

    const videoIds = relatedResponse.data.items
      .map((item) => item.id.videoId)
      .join(",");
    const videoResponse = await youtubeApi.get("/videos", {
      params: {
        part: "snippet,statistics,contentDetails",
        id: videoIds,
      },
    });

    return videoResponse.data.items;
  } catch (error) {
    console.error("Error fetching related videos:", error);
    throw error;
  }
};

export const useTopLiveGames = (apiKey) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopLiveGames = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveBroadcastContent&chart=mostPopular&regionCode=US&videoCategoryId=20&key=${apiKey}`
        );
        const data = await response.json();
        setGames(data.items);
      } catch (error) {
        console.error("Error fetching top live games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopLiveGames();
  }, [apiKey]);

  return { games, loading };
};
const fetchShortsVideos = async (pageToken = "") => {
  try {
    const searchResponse = await youtubeApi.get("/search", {
      params: {
        part: "snippet",
        maxResults: MAX_RESULTS,
        q: "", // Không cần từ khóa, chỉ lọc theo thời lượng
        type: "video",
        videoDuration: "short", // Chỉ lấy video có thời lượng dưới 60 giây
        pageToken,
      },
    });

    const videoIds = searchResponse.data.items
      .map((item) => item.id.videoId)
      .join(",");

    const videoResponse = await youtubeApi.get("/videos", {
      params: {
        part: "snippet,statistics,contentDetails",
        id: videoIds,
      },
    });

    return {
      items: videoResponse.data.items,
      nextPageToken: searchResponse.data.nextPageToken,
    };
  } catch (error) {
    console.error("Error fetching Shorts videos:", error);
    throw error;
  }
};


export {
  fetchPopularVideos,
  searchVideos,
  fetchVideosByCategory,
  fetchVideoDetails,
  fetchRelatedVideos,
  fetchShortsVideos,
};