import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  LikeOutlined,
  DislikeOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  UserOutlined,
  SortAscendingOutlined
} from '@ant-design/icons';
import Header from '../components/Header';
import './VideoDetail.css';
import CategoryDetail from '../components/categoryDetail/CategoryDetail';

// Mock data for related videos
const mockRelatedVideos = [
  {
    id: "video-1",
    title: "Exploring the Universe: A Deep Dive",
    channelTitle: "Space Channel",
    views: 543210,
    publishedAt: "2023-10-10T12:00:00Z",
    thumbnail: "https://picsum.photos/320/180?random=1",
    duration: "12:45"
  },
  {
    id: "video-2",
    title: "Top 10 Coding Tips for Beginners",
    channelTitle: "Code Master",
    views: 985623,
    publishedAt: "2024-01-05T09:30:00Z",
    thumbnail: "https://picsum.photos/320/180?random=2",
    duration: "08:30"
  },
  {
    id: "video-3",
    title: "The Secrets of the Ocean Depths",
    channelTitle: "Nature Explorer",
    views: 678432,
    publishedAt: "2023-08-22T16:45:00Z",
    thumbnail: "https://picsum.photos/320/180?random=3",
    duration: "15:20"
  },
  {
    id: "video-4",
    title: "Mastering React in 30 Days",
    channelTitle: "Web Dev Hub",
    views: 834762,
    publishedAt: "2024-02-01T14:10:00Z",
    thumbnail: "https://picsum.photos/320/180?random=4",
    duration: "22:15"
  },
  {
    id: "video-5",
    title: "World's Best Street Food to Try",
    channelTitle: "Foodie Travels",
    views: 732541,
    publishedAt: "2023-06-18T20:25:00Z",
    thumbnail: "https://picsum.photos/320/180?random=5",
    duration: "10:05"
  },
  {
    id: "video-6",
    title: "AI vs Human Creativity: The Future",
    channelTitle: "Tech Talk",
    views: 905324,
    publishedAt: "2023-12-15T11:00:00Z",
    thumbnail: "https://picsum.photos/320/180?random=6",
    duration: "18:50"
  },
  {
    id: "video-7",
    title: "Ultimate Travel Guide to Japan",
    channelTitle: "GlobeTrotter",
    views: 628975,
    publishedAt: "2023-09-30T17:55:00Z",
    thumbnail: "https://picsum.photos/320/180?random=7",
    duration: "14:10"
  },
  {
    id: "video-8",
    title: "How to Build a PC in 2024",
    channelTitle: "Tech Builders",
    views: 782341,
    publishedAt: "2024-01-20T13:45:00Z",
    thumbnail: "https://picsum.photos/320/180?random=8",
    duration: "19:30"
  },
  {
    id: "video-9",
    title: "The Evolution of Music Genres",
    channelTitle: "Music World",
    views: 456213,
    publishedAt: "2023-07-12T15:20:00Z",
    thumbnail: "https://picsum.photos/320/180?random=9",
    duration: "11:40"
  },
  {
    id: "video-10",
    title: "Fitness Routine for a Healthy Life",
    channelTitle: "Health & Wellness",
    views: 523784,
    publishedAt: "2024-02-03T10:30:00Z",
    thumbnail: "https://picsum.photos/320/180?random=10",
    duration: "07:55"
  }
];

// Mock data for comments
const mockComments = [
  {
    id: 1,
    author: 'John Doe',
    avatar: 'https://picsum.photos/40/40?random=1',
    content: 'This is an amazing video! Thanks for sharing.',
    likes: 245,
    timestamp: '2 days ago',
  },
  {
    id: 2,
    author: 'Jane Smith',
    avatar: 'https://picsum.photos/40/40?random=2',
    content: 'Very informative content. Looking forward to more videos like this!',
    likes: 123,
    timestamp: '1 day ago',
  },
];

function VideoDetail() {
  const { videoId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('0');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(mockComments);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatDate = (date) => {
    const now = new Date();
    const videoDate = new Date(date);
    const diffTime = Math.abs(now - videoDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  // const handleCommentSubmit = () => {
  //   if (!commentText.trim()) return;

  //   const newComment = {
  //     id: comments.length + 1,
  //     author: 'Current User',
  //     avatar: 'https://picsum.photos/40/40?random=current',
  //     content: commentText,
  //     likes: 0,
  //     timestamp: 'Just now',
  //   };

  //   setComments([newComment, ...comments]);
  //   setCommentText('');
  // };

  return (
    <div className="app">
      <Header />
      <div className="video-detail-container">
        <div className="video-main">
          <div className="video-player">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="video-info">
            <h1 className="video-title">Video Title Goes Here - This is a Sample Title</h1>
            
            <div className="video-actions-container">
              <div className="channel-info">
                <img 
                  src="https://picsum.photos/40/40?random=channel" 
                  alt="Channel" 
                  className="channel-avatar"
                />
                <div className="channel-details">
                  <div className="channel-name">Channel Name</div>
                  <div className="subscriber-count">1.2M subscribers</div>
                </div>
                <button
                  className={`subscribe-button ${isSubscribed ? 'subscribed' : ''}`}
                  onClick={() => setIsSubscribed(!isSubscribed)}
                >
                  {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </button>
              </div>
              
              <div className="video-actions">
                <div className="main-actions">
                  <button className="action-button like-button">
                    <LikeOutlined />
                    123K
                  </button>
                  <button className="action-button dislike-button">
                    <DislikeOutlined />
                  </button>
                </div>
                <button className="action-button share-button">
                  <ShareAltOutlined />
                  Share
                </button>
                <button className="action-button download-button">
                  <DownloadOutlined />
                  Download
                </button>
                <button className="action-button more-button">
                  <EllipsisOutlined />
                </button>
              </div>
            </div>
            
            <div className="video-description">
              <div className="video-stats">
                100K views • {formatDate(new Date().toISOString())}
              </div>
              <p className="description-text">
                This is a sample video description. It can contain multiple lines of text
                and will show details about the video content. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua.
              </p>
            </div>
          </div>



          <div className="comments-section">
            <div className="comments-header">
              <span className="comments-count">{comments.length} Comments</span>
              <div className="comments-sort">
                <SortAscendingOutlined />
                <span>Sort by</span>
              </div>
            </div>

            <div className="comment-input-container">
              <img 
                src="https://picsum.photos/40/40?random=current" 
                alt="Current user" 
                className="avatar"
              />
              <div className="comment-input-wrapper">
                <textarea
                  className="comment-input"
                  placeholder="Add a comment..."
                  // value={commentText}
                  // onChange={(e) => setCommentText(e.target.value)}
                  rows={1}
                />
                <div className="comment-actions">
                  <button 
                    className="comment-button cancel"
                    // onClick={() => setCommentText('')}
                  >
                    Cancel
                  </button>
                  <button
                    className="comment-button submit"
                    // disabled={!commentText.trim()}
                    // onClick={handleCommentSubmit}
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>

            <div className="comment-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <img 
                    src={comment.avatar} 
                    alt={comment.author} 
                    className="avatar"
                  />
                  <div>
                    <div className="comment-header">
                      <span className="comment-author">{comment.author}</span>
                      <span className="comment-date">{comment.timestamp}</span>
                    </div>
                    <p className="comment-text">{comment.content}</p>
                    <div className="comment-actions-buttons">
                      <button className="comment-action-button">
                        <LikeOutlined />
                        {comment.likes}
                      </button>
                      <button className="comment-action-button">
                        <DislikeOutlined />
                      </button>
                      <button className="comment-action-button">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="related-videos">
          <CategoryDetail 
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
          <div className="related-videos-list">
            {mockRelatedVideos.map((video) => (
              <div key={video.id} className="related-video-item">
                <div className="related-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="video-duration">{video.duration}</div>
                </div>
                <div className="related-info">
                  <h3 className="video-title">{video.title}</h3>
                  <div className="channel-name">{video.channelTitle}</div>
                  <div className="video-stats">
                    {formatNumber(video.views)} views • {formatDate(video.publishedAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoDetail;