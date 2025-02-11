import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaSpinner } from "react-icons/fa";
import { Tabs } from "antd";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import VideoGrid from "../components/VideoGrid";
import { fetchVideosByCategory } from "../utils/AxiosAPI";
import "./Music.css";

const { TabPane } = Tabs;

function Music() {
    const [videos, setVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("music");
    const [mostPopularVideo, setMostPopularVideo] = useState(null);
    const observer = useRef();

    // Fetch videos with pagination
    const fetchVideos = useCallback(
        async (pageToken = "", category = "10") => {
            try {
                setLoading(true);
                const response = await fetchVideosByCategory(category, pageToken);

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
                console.error("Error fetching music videos:", error);
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
                    fetchVideos(nextPageToken, activeTab);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, nextPageToken, fetchVideos, activeTab]
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
                            <div className="hero">
                                <div className="hero-info">
                                    <p className="channel">
                                        Tên kênh • 1,000,000 views • {new Date().toDateString()}
                                    </p>
                                    <h2>Anitta - ROMEO (Official Video)</h2>
                                </div>
                                <div className="hero-video">
                                    <iframe
                                        src="https://www.youtube.com/embed/JD_W6dLHPW8?autoplay=1&mute=1&loop=1&controls=0&iv_load_policy=3&disablekb=1&showinfo=0&playsinline=1&enablejsapi=1&playlist=JD_W6dLHPW8"
                                        title="Nhúng Video YouTube"
                                        frameBorder="0"
                                        allow="autoplay; encrypted-media; accelerometer; clipboard-write; gyroscope; picture-in-picture; web-share"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tabs for Categories */}
                    <Tabs
                        activeKey={activeTab}
                        onChange={(key) => {
                            setActiveTab(key);
                            fetchVideos("", key); // Fetch videos based on the selected tab
                        }}
                        className="trending-tabs2"
                    >
                        <TabPane tab="Home" key="10" />
                        <TabPane tab="Posts" key="10" />
                    </Tabs>

                    {/* Video Grid Section */}
                    <div className="trending-container">
                        <div className="trending-header">
                            <div className="trending-icon-title">
                                <div className="trending-icon">
                                    <img
                                        src="https://png.pngtree.com/png-clipart/20250107/original/pngtree-red-musical-note-icon-png-image_19987220.png"
                                        alt="Sports Icon"
                                    />
                                </div>
                                <h1 style={{ marginLeft: '50px' }}>Music</h1>
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

export default Music;
