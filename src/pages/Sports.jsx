import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaSpinner } from "react-icons/fa";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import VideoGrid from "../components/VideoGrid";
import { fetchVideosByCategory } from "../utils/AxiosAPI";
import "./Sports.css";

function Sports() {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [mostPopularVideo, setMostPopularVideo] = useState(null);
  const observer = useRef();

  // Fetch videos with pagination
  const fetchVideos = useCallback(
    async (pageToken = "") => {
      try {
        setLoading(true);
        const response = await fetchVideosByCategory("17", pageToken);

        // Filter out Shorts (duration <= 60 seconds or vertical aspect ratio)
        const filteredVideos = response.items.filter((video) => {
          const duration = video.contentDetails?.duration;
          const thumbnails = video.snippet?.thumbnails?.medium;
          if (duration && thumbnails) {
            const match = duration.match(/PT(\d+)S/);
            const aspectRatio = thumbnails.width / thumbnails.height;


            if ((match && parseInt(match[1]) <= 60) || aspectRatio <= 1) {
              return false;
            }
          }
          return true;
        });

        if (pageToken === "") {
          setVideos(filteredVideos);


          setMostPopularVideo(filteredVideos[0]);
        } else {
          setVideos((prev) => [...prev, ...filteredVideos]);
        }

        setNextPageToken(response.nextPageToken);
      } catch (error) {
        console.error("Error fetching sports videos:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    setVideos([]);
    setNextPageToken("");
    fetchVideos();
  }, [fetchVideos]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  const lastVideoElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextPageToken) {
          fetchVideos(nextPageToken);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, nextPageToken, fetchVideos]
  );

  return (
    <div className="app">
      <Header onMenuClick={toggleSidebar} />
      <div className="main-content">
        <Sidebar isOpen={sidebarOpen} />
        <div className={`content ${!sidebarOpen ? "sidebar-closed" : ""}`}>

          {/* Hero Section */}
          {mostPopularVideo && (
            <div className="hero">
              <div className="hero-info">
                <p className="channel">
                  {mostPopularVideo.snippet.channelTitle} •{" "}
                  {parseInt(mostPopularVideo.statistics.viewCount).toLocaleString()} views •{" "}
                  {new Date(mostPopularVideo.snippet.publishedAt).toDateString()}
                </p>
                <h2>{mostPopularVideo.snippet.title}</h2>
              </div>
              <div className="hero-video">
                <iframe
                  src={`https://www.youtube.com/embed/${mostPopularVideo.id}?autoplay=1&mute=1&loop=1&controls=0&iv_load_policy=3&disablekb=1&showinfo=0&playsinline=1&enablejsapi=1&playlist=${mostPopularVideo.id}`}
                  title={mostPopularVideo.snippet.title}
                  frameBorder="0"
                  allow="autoplay; encrypted-media; accelerometer; clipboard-write; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
            </div>
          )}

          {/* Video Grid Section */}
          <div className="trending-container">
            <div className="trending-header">
              <div className="trending-icon-title">
                <div className="trending-icon">
                  <img

                    className="sports-icon"
                    src="https://yt3.googleusercontent.com/RV7Xjtmnl7ld6OERcxfHRePw3dfRRAcD5_OyEZHiBIA6DBkQwiL0WjHV4nQDrVwOknlJTTbRfQ=s176-c-k-c0x00ffffff-no-rj-mo"
                    alt="Sports Icon"
                  />
                </div>
                <h1>Sports</h1>
                <span className="subscribe-button">Subscribe</span>
              </div>
            </div>

            <VideoGrid videos={videos} lastVideoElementRef={lastVideoElementRef} />
            {loading && (
              <div className="loading-spinner">
                <FaSpinner size={24} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sports;