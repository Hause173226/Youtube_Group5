import { Routes, Route, useNavigate } from "react-router-dom";
import YoutubeHeader from "./components/YoutubeHeader";
import YoutubeSidebar from "./components/YoutubeSidebar";
import YoutubeSidebarMini from "./components/YoutubeSidebarMini";
import VideoList from "./components/VideoList";
import SearchVideoResults from "./components/SearchVideoResults";
import { Video } from "./types/YouTubeTypes";
import { useEffect, useState } from "react";
import {
  fetchVideos,
  fetchChannelAvatars,
  searchVideos,
} from "./api/youtubeApi";

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [channelAvatars, setChannelAvatars] = useState<{
    [key: string]: string;
  }>({});
  const [changeSidebar, setChangeSidebar] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load videos on app mount
  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      try {
        const videoData = await fetchVideos();
        setVideos(videoData);

        const channelIds = videoData.map(
          (video: Video) => video.snippet.channelId,
        );
        const avatars = await fetchChannelAvatars(channelIds);
        setChannelAvatars(avatars);

        setError(null);
      } catch (err) {
        setError("Failed to fetch videos. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadVideos();
  }, []);

  // Handle search functionality
  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const searchResults = await searchVideos(query);
      setVideos(searchResults);

      const channelIds = searchResults.map(
        (video: Video) => video.snippet.channelId,
      );
      const avatars = await fetchChannelAvatars(channelIds);
      setChannelAvatars(avatars);

      setError(null);
      navigate("/search"); // Navigate to the search results page
    } catch (err) {
      setError("Failed to search videos. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen">
      {/* Fixed header */}
      <div className="fixed top-0 z-50 w-full bg-white">
        <YoutubeHeader
          setChangeSidebar={setChangeSidebar}
          onSearch={handleSearch}
        />
      </div>

      {/* Main layout */}
      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        {changeSidebar ? <YoutubeSidebar /> : <YoutubeSidebarMini />}

        <div className="flex-1">
          {/* Loading or error state */}
          {isLoading ? (
            <div className="flex w-full items-center justify-center">
              <p>Loading...</p>
            </div>
          ) : error ? (
            <div className="flex w-full items-center justify-center text-red-500">
              <p>{error}</p>
            </div>
          ) : (
            // Routes for the main content
            <Routes>
              <Route
                path="/"
                element={
                  <VideoList videos={videos} channelAvatars={channelAvatars} />
                }
              />
              <Route
                path="/search"
                element={<SearchVideoResults videos={videos} />}
              />
            </Routes>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
