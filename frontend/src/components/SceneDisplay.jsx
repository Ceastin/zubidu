import React from 'react';
import ZubiUltraBanner from './HyperZubi'; // Adjust path if needed

const SceneDisplay = ({ frameImage }) => {
  return (
    <>
      <div className="zubi-container">
        <ZubiUltraBanner />
      </div>
      <div className="image-frame">
        {frameImage && <img src={frameImage} alt="Zubi Scene" className="frame-image" />}
      </div>
    </>
  );
};

export default SceneDisplay;