import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaThumbsUp } from "react-icons/fa";
import "./VideoTrending.css";

function VideoTrending({ videos, lastVideoElementRef }) {
    const navigate = useNavigate();

    const formatViews = (views) => {
        if (views >= 1000000) {
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

    const handleVideoClick = (videoId) => {
        navigate(`/watch/${videoId}`);
    };

    return (
        <div className="video-grid-1">
            {videos.map((video, index) => {
                const isLastElement = index === videos.length - 1;
                // Tạo unique key bằng cách kết hợp videoId với index
                const uniqueKey = `${video.id.videoId || video.id}_${index}`;
                return (
                    <div
                        ref={isLastElement ? lastVideoElementRef : null}
                        key={uniqueKey}
                        className="video-card-1"
                        onClick={() =>
                            handleVideoClick(video.id.videoId || video.id)
                        }
                    >
                        <div className="thumbnail-1">
                            <img
                                src={video.snippet.thumbnails.medium.url}
                                alt={video.snippet.title}
                            />
                            <div className="video-duration-1">
                                {formatDuration(video.contentDetails?.duration)}
                            </div>
                        </div>
                        <div className="video-info-1">
                            <h3>{video.snippet.title}</h3>
                            <p className="channel-name-1">
                                {video.snippet.channelTitle}
                            </p>
                            <div className="video-stats-1">
                                {video.statistics && (
                                    <>
                                        <span>
                                            <FaEye />
                                            {formatViews(
                                                video.statistics.viewCount
                                            )}{" "}
                                            views
                                        </span>
                                        <span style={{ margin: "0 8px" }}>
                                            •
                                        </span>
                                        <span>
                                            <FaThumbsUp />
                                            {formatViews(
                                                video.statistics.likeCount
                                            )}
                                        </span>
                                        <span style={{ margin: "0 8px" }}>
                                            •
                                        </span>
                                    </>
                                )}
                                <span>
                                    {formatDate(video.snippet.publishedAt)}
                                </span>
                            </div>
                            <p className="video-description-1">
                                {video.snippet.description.length > 100
                                    ? video.snippet.description.substring(
                                          0,
                                          180
                                      ) + "..."
                                    : video.snippet.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default VideoTrending;
