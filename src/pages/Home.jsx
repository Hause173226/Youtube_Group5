import { useState, useEffect, useCallback, useRef } from 'react';
import { FaSpinner } from 'react-icons/fa';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VideoGrid from '../components/VideoGrid';
import Categories from '../components/Categories';
import { fetchPopularVideos, searchVideos, fetchVideosByCategory } from '../utils/AxiosAPI';

function Home() {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('0');
  const observer = useRef();
  const loadingRef = useRef(null);

  const fetchVideos = useCallback(async (pageToken = '') => {
    try {
      setLoading(true);
      let response;
  
      if (searchQuery) {
        console.log(`Calling API: searchVideos("${searchQuery}", pageToken: "${pageToken}")`);
        response = await searchVideos(searchQuery, pageToken);
      } else {
        if (selectedCategory === '0') {
          console.log(`Calling API: fetchPopularVideos(pageToken: "${pageToken}")`);
          response = await fetchPopularVideos(pageToken);
        } else {
          console.log(`Calling API: fetchVideosByCategory(categoryId: "${selectedCategory}", pageToken: "${pageToken}")`);
          response = await fetchVideosByCategory(selectedCategory, pageToken);
        }
      }
  
      if (pageToken === '') {
        setVideos(response.items);
      } else {
        setVideos(prev => [...prev, ...response.items]);
      }
      setNextPageToken(response.nextPageToken);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory]);
  

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(!!query);
    setSelectedCategory('0');
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
    setIsSearching(false);
  };

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
      <Header onMenuClick={toggleSidebar} onSearch={handleSearch} />
      <div className="main-content">
        <Sidebar isOpen={sidebarOpen} />
        <div className={`content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
          {isSearching && (
            <div className="search-results-header">
              <h2>Search Results for {searchQuery}</h2>
            </div>
          )}
          <Categories 
            expan={sidebarOpen}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
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
  );
}

export default Home;