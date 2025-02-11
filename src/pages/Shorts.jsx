import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Tabs } from 'antd';
import { FaSpinner, FaThumbsUp, FaThumbsDown, FaComment } from 'react-icons/fa';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { fetchShortsVideos } from '../utils/AxiosAPI'; // Import API fetch
import './Shorts.css';

const { TabPane } = Tabs;

function Shorts() {
    const [videos, setVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('trending');
    const observer = useRef();
    const loadingRef = useRef(null);

    // Gọi API để lấy video Shorts
    const fetchVideos = useCallback(async (pageToken = '') => {
        try {
            setLoading(true);
            const response = await fetchShortsVideos(pageToken);

            if (pageToken === '') {
                setVideos(response.items);
            } else {
                setVideos(prev => [...prev, ...response.items]);
            }
            setNextPageToken(response.nextPageToken);
        } catch (error) {
            console.error('Error fetching Shorts videos:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        setVideos([]); // Reset danh sách video khi đổi tab
        setNextPageToken('');
        fetchVideos(); // Fetch video Shorts khi load trang
    }, [activeTab, fetchVideos]);

    // Xử lý Infinite Scroll
    const lastVideoElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && nextPageToken) {
                fetchVideos(nextPageToken);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, nextPageToken, fetchVideos]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="app">
            <Header onMenuClick={toggleSidebar} />
            <div className="main-content">
                <Sidebar isOpen={sidebarOpen} />
                <div className={`content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
                    <div className="trending-container">
                        <div className="short-trending-content">
                            {videos.map((video, index) => (
                                <div key={video.id} ref={index === videos.length - 1 ? lastVideoElementRef : null} className="trending-video">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${video.id.videoId || video.id}`}
                                        frameBorder="0"
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                        title={video.snippet.title}
                                    ></iframe>

                                    <div className="video-actions">
                                        <div className="action-item">
                                            <FaThumbsUp className="icon" />
                                            <span>{video.statistics?.likeCount || 0}</span>
                                        </div>
                                        <div className="action-item">
                                            <FaThumbsDown className="icon" />
                                            <span>{video.statistics?.dislikeCount || ""}</span>
                                        </div>
                                        <div className="action-item">
                                            <FaComment className="icon" />
                                            <span>{video.statistics?.commentCount || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

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

export default Shorts;
