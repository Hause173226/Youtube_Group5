<<<<<<< Updated upstream
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Tabs } from 'antd';
import { FaSpinner } from 'react-icons/fa';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VideoGrid from '../components/VideoGrid';
import { fetchPopularVideos, fetchVideosByCategory } from '../utils/AxiosAPI';
import './Gaming.css';
=======
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Tabs } from "antd";
import { FaSpinner } from "react-icons/fa";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import VideoGrid from "../components/VideoGrid";
import { fetchPopularVideos, fetchVideosByCategory, useTopLiveGames } from "../utils/AxiosAPI";
import "./Gaming.css";
>>>>>>> Stashed changes

const { TabPane } = Tabs;

function Gaming() {
<<<<<<< Updated upstream
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('now');
  const observer = useRef();
  const loadingRef = useRef(null);
=======
    const [videos, setVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("now");
    const observer = useRef();
    const loadingRef = useRef(null);
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const { games, loading: topLiveGamesLoading } = useTopLiveGames(apiKey);
>>>>>>> Stashed changes

  const fetchVideos = useCallback(async (pageToken = '', category = '') => {
    try {
      setLoading(true);
      let response;
      
      if (category) {
        response = await fetchVideosByCategory(category, pageToken);
      } else {
        response = await fetchPopularVideos(pageToken);
      }
      
      if (pageToken === '') {
        setVideos(response.items);
      } else {
        setVideos(prev => [...prev, ...response.items]);
      }
      setNextPageToken(response.nextPageToken);
    } catch (error) {
      console.error('Error fetching trending videos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Reset videos when changing tabs
    setVideos([]);
    setNextPageToken('');

    // Fetch videos based on active tab
    switch (activeTab) {
      case 'featured':
        fetchVideos('', '20');
        break; 
      default:
        fetchVideos();
        break;
    }
  }, [activeTab, fetchVideos]);

  const lastVideoElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && nextPageToken) {
        const category = {
          featured: '20',
        }[activeTab];
        fetchVideos(nextPageToken, category);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, nextPageToken, fetchVideos, activeTab]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

 

<<<<<<< Updated upstream
  return (
    <div className="app">
      <Header onMenuClick={toggleSidebar} />
      <div className="main-content">
        <Sidebar isOpen={sidebarOpen} />
        <div className={`content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
          <div className="trending-container">
            <div className="trending-header">
              <div className="trending-icon-title">
                <div className="trending-icon">
                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm71j8c0igEWdNwutZAJdVqW0nO4qTDGWfLg&s" alt="" />
=======
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
                    className={`content ${!sidebarOpen ? "sidebar-closed" : ""
                        }`}
                >
                    <div className="trending-container">
                        <div className="trending-header">
                            <div className="trending-icon-title">
                                <div className="trending-icon">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVd8iYaLQ6n9hqCJ6lecCOhzMLtF1T3mxXzA&s"
                                        alt=""
                                    />
                                </div>
                                <h1 style={{ marginLeft: '50px' }}>Gaming</h1>
                            </div>
                            <Tabs
                                activeKey={activeTab}
                                onChange={setActiveTab}
                                className="trending-tabs"
                            >
                                <TabPane tab="Featured" key="featured" />
                            </Tabs>
                        </div>
                        {/* Render videos in chunks of 4 */}
                        {Array.from({ length: Math.ceil(videos.length / 4) }).map((_, index) => {
                            const chunk = videos.slice(index * 4, index * 4 + 4); // Get the next 4 videos
                            return (
                                <div key={index}>
                                    {index === 1 && <h1>Top live games</h1>}
                                    {index === 2 && <h1>Recommended</h1>}
                                    {index === 3 && <h1>Trending videos</h1>}
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
>>>>>>> Stashed changes
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