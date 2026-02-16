import React from 'react';

const Header = () => {
  return (
    <div className="header-container">
      <div className="logo-group">
        <img src="/zubi-exited-begin.gif" className="elephant-gif" alt="Zubi Elephant" />
        <h1 className="heading">zubi</h1>
      </div>
      <div className="tagline-container">
        <p className="tag-line">
          Let's have some <span id="hey">fun!</span>
        </p>
      </div>
      <div className="banner-in-image"></div>
    </div>
  );
};

export default Header;