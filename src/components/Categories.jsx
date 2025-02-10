import React, { useRef } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './Categories.css';

const categories = [
  { id: '0', name: 'All' },
  { id: '20', name: 'Gaming' },
  { id: '17', name: 'Sports' },
  { id: '10', name: 'Music' },
  { id: '24', name: 'Entertainment' },
  { id: '25', name: 'News' },
  { id: '28', name: 'Science & Tech' },
  { id: '1', name: 'Film & Animation' },
  { id: '2', name: 'Autos & Vehicles' },
  { id: '15', name: 'Pets & Animals' },
  { id: '26', name: 'How-to & Style' },
  { id: '19', name: 'Travel & Events' },
];

function Categories({ expan , selectedCategory, onCategorySelect }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;

      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`categories-container  ${!expan ? 'sidebar-closed' : ''} `} >
      <div className="scroll-fade-left" />
      <button 
        className="scroll-button left" 
        onClick={() => scroll('left')}
        type="button"
      >
        <LeftOutlined />
      </button>
      <div className={`categories-scroll  ${!expan ? 'sidebar-closed' : ''}`} ref={scrollContainerRef}>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-chip ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategorySelect(category.id)}
            type="button"
          >
            {category.name}
          </button>
        ))}
      </div>
      <button 
        className="scroll-button right" 
        onClick={() => scroll('right')}
        type="button"
      >
        <RightOutlined />
      </button>
      <div className="scroll-fade-right" />
    </div>
  );
}

export default Categories;