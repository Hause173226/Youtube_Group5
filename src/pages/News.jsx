import React, { useState, useEffect, useCallback, useRef } from "react";
import { Tabs } from "antd";
import { FaSpinner } from "react-icons/fa";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import VideoGrid from "../components/VideoGrid";
import { fetchPopularVideos, fetchVideosByCategory, useTopLiveGames } from "../utils/AxiosAPI";
import "./News.css";

const { TabPane } = Tabs;

function News() {
    const [videos, setVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("topstories");
    const [underlineStyle, setUnderlineStyle] = useState({});
    const observer = useRef();
    const loadingRef = useRef(null);
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const { games, loading: topLiveGamesLoading } = useTopLiveGames(apiKey);

    useEffect(() => {
        setActiveTab("topstories"); // Set initial active tab
    }, []); // Empty dependency array to run only on mount

    const fetchVideos = useCallback(async (pageToken = "", category = "") => {
        try {
            setLoading(true);
            let response;

            if (category) {
                response = await fetchVideosByCategory(category, pageToken);
            } else {
                response = await fetchPopularVideos(pageToken);
            }

            if (pageToken === "") {
                setVideos(response.items);
            } else {
                setVideos((prev) => [...prev, ...response.items]);
            }
            setNextPageToken(response.nextPageToken);
        } catch (error) {
            console.error("Error fetching trending videos:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Reset videos when changing tabs
        setVideos([]);
        setNextPageToken("");

        // Fetch videos based on active tab
        switch (activeTab) {
            case "topstories":
                fetchVideos("", "25"); // Music category ID
                break;
            case "sport":
                fetchVideos("", "17"); // Gaming category ID
                break;
            case "entertainment":
                fetchVideos("", "24"); // Film category ID
                break;
            case "business":
                fetchVideos("", "25"); // Film category ID
                break;
            case "technology":
                fetchVideos("", "28"); // Film category ID
                break;
            case "world":
                fetchVideos("", "25"); // Film category ID
                break;
            case "national":
                fetchVideos("", "25"); // Film category ID
                break;
            case "science":
                fetchVideos("", "28"); // Film category ID
                break;
            case "health":
                fetchVideos("", "25"); // Film category ID
                break;
            default:
                fetchVideos();
                break;
        }
    }, [activeTab, fetchVideos]);

    const lastVideoElementRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && nextPageToken) {
                    const category = {
                        topstories: "25",
                        sport: "17",
                        entertainment: "24",
                        business: "25",
                        technology: "28",
                        world: "25",
                        national: "25",
                        science: "28",
                        health: "25",
                    }[activeTab];
                    fetchVideos(nextPageToken, category);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, nextPageToken, fetchVideos, activeTab]
    );

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="app">
            <Header onMenuClick={toggleSidebar} />
            <div className="main-content">
                <Sidebar isOpen={sidebarOpen} />
                <div
                    className={`content ${!sidebarOpen ? "sidebar-closed" : ""
                        }`}
                >
                    <div className="trending-container">
                        <div className="trending-header">
                            <div className="trending-icon-title">
                                <h1 style={{ marginLeft: '50px' }}>News</h1>
                            </div>
                            <Tabs
                                activeKey={activeTab}
                                onChange={setActiveTab}
                                className="trending-tabs"
                            >
                                <TabPane tab="Top stories" key="topstories" />
                                <TabPane tab="Sport" key="sport" />
                                <TabPane
                                    tab="Entertainment"
                                    key="entertainment"
                                />
                                <TabPane tab="Business" key="business" />
                                <TabPane tab="Technology" key="technology" />
                                <TabPane tab="World" key="world" />
                                <TabPane tab="National" key="national" />
                                <TabPane tab="Science" key="science" />
                                <TabPane tab="Health" key="health" />
                            </Tabs>
                        </div>
                        {/* Render videos in chunks of 4 */}
                        {Array.from({ length: Math.ceil(videos.length / 4) }).map((_, index) => {
                            const chunk = videos.slice(index * 4, index * 4 + 4); // Get the next 4 videos
                            return (
                                <div key={index}>
                                    {index === 1 && <h1>Live now: News</h1>}
                                    {index === 2 && <h1>Recommended</h1>}
                                    {index === 3 && <h1>For you</h1>}
                                    <VideoGrid
                                        videos={chunk} // Pass the chunk of 4 videos
                                        lastVideoElementRef={lastVideoElementRef}
                                    />
                                    {index < Math.ceil(videos.length / 4) - 1 && <hr />} {/* Add <hr> except after the last chunk */}
                                </div>
                            );
                        })}
                        {/* Add additional divs for more video chunks if needed */}
                        {videos.length > 8 && (
                            <div>
                                <VideoGrid
                                    videos={videos.slice(8, 12)} // Next 4 videos
                                    lastVideoElementRef={lastVideoElementRef}
                                />
                                <hr />
                            </div>
                        )}
                        {videos.length > 12 && (
                            <div>
                                <VideoGrid
                                    videos={videos.slice(12, 16)} // Next 4 videos
                                    lastVideoElementRef={lastVideoElementRef}
                                />
                                <hr />
                            </div>
                        )}
                        {loading && (
                            <div className="loading-spinner" ref={loadingRef}>
                                <FaSpinner size={24} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;
