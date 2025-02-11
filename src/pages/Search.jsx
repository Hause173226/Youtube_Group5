import { Button, Card, Avatar, Spin } from "antd";
import { PlusCircleOutlined, BellOutlined } from "@ant-design/icons";
import TuneIcon from "@mui/icons-material/Tune";
import Header from "../components/Header";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

import Sidebar from "../components/Sidebar";
import "./Search.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchVideos } from "../utils/AxiosAPI";

function Search() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // Lấy từ khóa từ URL

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      searchVideos(query)
        .then((data) => {
          setVideos(data.items || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setLoading(false);
        });
    }
  }, [query]);

  const formatViews = (views) => {
    if (views >= 1000000000) {
      return `${(views / 1000000000).toFixed(1)}T`;
    } else if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views;
  };

  const formatDate = (date) => {
    const now = new Date();
    const videoDate = new Date(date);
    const diffTime = Math.abs(now - videoDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const formatDuration = (duration) => {
    if (!duration) return "0:00";
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return "0:00";

    const hours = (match[1] || "").replace("H", "");
    const minutes = (match[2] || "").replace("M", "");
    const seconds = (match[3] || "").replace("S", "");

    let result = "";
    if (hours) result += `${hours}:`;
    if (minutes || hours) {
      result += `${minutes || "0"}:`;
    } else {
      result += "0:";
    }
    result += seconds.padStart(2, "0");
    return result;
  };

  return (
    <>
      <Header onMenuClick={toggleSidebar} />
      <div className="search-container">
        <Sidebar isOpen={sidebarOpen} />
        <div className="searchpage">
          <div className="filter">
            <TuneIcon className="filterIcon" />
            <h2 className="filterHeading">FILTER</h2>
          </div>

          {loading ? (
            <div className="loading">
              <Spin size="large" />
            </div>
          ) : (
            <div className="videoTitleWrapper">



 <div className="channelTitle">
      <div className="titleLeft">
        <img
          className="channelImg"
          src="https://tse1.mm.bing.net/th?id=OIP.4xbApGqpQRahcTn42z_UEAHaHa&pid=Api&P=0&h=180"
          alt=""
        />
      </div>
      <div className="titleMiddle">
        <p className="channelName">Hung Do</p>
        <p>188 Subcsribers &bull; 12 Videos</p>
      </div>

      <div className="titleRight">
        <button className="subscribe">SUBSCRIBED</button>
        <CircleNotificationsIcon className="bellIcon" />
      </div>
    </div>



              {videos.length > 0 ? (
                videos.map((video, index) => (
                  <Card
                    key={index}
                    className="video-Title"
                    hoverable
                    cover={
                      <img
                        className="img-title"
                        src={video.snippet.thumbnails.medium.url}
                        alt={video.snippet.title}
                      />
                    }
                  >
                    <div className="duration"> {formatDuration(video.contentDetails.duration)}</div>

                    <div className="title_data">
                      <div className="title_div">
                        {video.snippet.title}
                        <Button shape="circle" icon={<PlusCircleOutlined />} />
                      </div>
                      <p className="views">
                        {formatViews(video.statistics.viewCount)} views &bull;{" "}
                        {formatDate(video.snippet.publishedAt)}
                      </p>
                      <div className="data">
                        <Avatar src={video.snippet.thumbnails.default.url} />
                        <p>{video.snippet.channelTitle}</p>
                      </div>
                      <p className="desc">{video.snippet.description}</p>
                    </div>
                  </Card>
                ))
              ) : (
                <p>No results found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
// {formatDuration(video.contentDetails.duration)}
