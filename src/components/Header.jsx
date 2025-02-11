import React, { useState } from 'react';
import { 
  FaBars, 
  FaYoutube, 
  FaSearch, 
  FaVideo, 
  FaBell, 
  FaUser,
  FaMicrophone
} from 'react-icons/fa';
import './Header.css';
import { Link } from 'react-router-dom';

function Header({ onMenuClick, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <FaBars />
        </button>

        <Link to={"/"}>
        <div className="logo">
          <FaYoutube className="youtube-icon" />
          <span>YouTube</span>
        </div>
        </Link>


        
      </div>

      <form className="search-bar" onSubmit={handleSubmit}>
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearchTerm('')}
            >
              ✕
            </button>
          )}
        </div>
        <button type="submit" className="search-btn">
          <FaSearch />
        </button>
        <button type="button" className="voice-search-btn">
          <FaMicrophone />
        </button>
      </form>

      <div className="header-right">
        <button className="icon-btn">
          <FaVideo />
        </button>
        <button className="icon-btn">
          <FaBell />
        </button>
        <button className="icon-btn">
          <FaUser />
        </button>
      </div>
    </header>
  );
}

export default Header;