import { useNavigate } from 'react-router-dom';
import { 
  FaHome, FaHistory, FaYoutube, FaClock, FaThumbsUp, 
  FaPlayCircle, FaGamepad, FaNewspaper, FaTrophy, FaLightbulb,
  FaMusic, FaFilm, FaBroadcastTower, FaFire, FaShoppingBag
} from 'react-icons/fa';
import './Sidebar.css';

function Sidebar({ isOpen }) {
  const navigate = useNavigate();

  const mainMenu = [
    { icon: <FaHome />, label: 'Home', path: '/' },
    { icon: <FaYoutube />, label: 'Shorts' },
    { icon: <FaYoutube />, label: 'Subscriptions' }
  ];

  const libraryMenu = [
    { icon: <FaPlayCircle />, label: 'Library' },
    { icon: <FaHistory />, label: 'History' },
    { icon: <FaClock />, label: 'Watch Later' },
    { icon: <FaThumbsUp />, label: 'Liked Videos' }
  ];

  const subscriptionsMenu = [
    { icon: <FaYoutube />, label: 'Music Channel', subscribers: '2.1M' },
    { icon: <FaYoutube />, label: 'Gaming Channel', subscribers: '1.5M' },
    { icon: <FaYoutube />, label: 'Tech Channel', subscribers: '850K' },
    { icon: <FaYoutube />, label: 'Food Channel', subscribers: '3.2M' }
  ];

  const exploreMenu = [
    { icon: <FaFire />, label: 'Trending', path: '/trending' },
    { icon: <FaMusic />, label: 'Music', path: '/music' },
    { icon: <FaGamepad />, label: 'Gaming', path: '/gaming' },
    { icon: <FaNewspaper />, label: 'News', path: '/news' },
    { icon: <FaTrophy />, label: 'Sports', path: '/sports' },
    { icon: <FaLightbulb />, label: 'Learning' },
    { icon: <FaFilm />, label: 'Movies' },
    { icon: <FaBroadcastTower />, label: 'Live' },
    { icon: <FaShoppingBag />, label: 'Shopping' }
  ];

  const handleItemClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className={`sidebar ${!isOpen ? 'closed' : ''}`}>
      <div className="sidebar-section">
        {mainMenu.map((item, index) => (
          <div 
            key={index} 
            className="sidebar-item"
            onClick={() => handleItemClick(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-section">
        {libraryMenu.map((item, index) => (
          <div 
            key={index} 
            className="sidebar-item"
            onClick={() => handleItemClick(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">Subscriptions</h3>
        {subscriptionsMenu.map((item, index) => (
          <div 
            key={index} 
            className="sidebar-item"
            onClick={() => handleItemClick(item.path)}
          >
            {item.icon}
            <div className="subscription-info">
              <span>{item.label}</span>
              <span className="subscribers">{item.subscribers}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">Explore</h3>
        {exploreMenu.map((item, index) => (
          <div 
            key={index} 
            className="sidebar-item"
            onClick={() => handleItemClick(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;