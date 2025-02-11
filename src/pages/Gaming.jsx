import React, { useState, useEffect, useCallback, useRef } from "react";
import { Tabs } from "antd";
import { FaSpinner } from "react-icons/fa";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import VideoGrid from "../components/VideoGrid";
import { fetchPopularVideos, fetchVideosByCategory } from "../utils/AxiosAPI";
import "./Gaming.css";

const { TabPane } = Tabs;

function Gaming() {
    const [videos, setVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("now");
    const observer = useRef();
    const loadingRef = useRef(null);

    useEffect(() => {
        setActiveTab("featured");
    });

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
            case "featured":
                fetchVideos("", "20");
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
                        featured: "20",
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
                    className={`content ${
                        !sidebarOpen ? "sidebar-closed" : ""
                    }`}
                >
                    <div className="trending-container">
                        <div className="trending-header">
                            <div className="trending-icon-title">
                                <div className="trending-icon">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm71j8c0igEWdNwutZAJdVqW0nO4qTDGWfLg&s"
                                        alt=""
                                    />
                                </div>
                                <h1>Gaming</h1>
                            </div>
                            <Tabs
                                activeKey={activeTab}
                                onChange={setActiveTab}
                                className="trending-tabs"
                            >
                                <TabPane tab="Featured" key="featured" />
                            </Tabs>
                        </div>

                        <VideoGrid
                            videos={videos}
                            lastVideoElementRef={lastVideoElementRef}
                        />
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

export default Gaming;
