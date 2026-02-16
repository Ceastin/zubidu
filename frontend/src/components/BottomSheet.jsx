import React from 'react';

const BottomSheet = ({ timeLeft }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bottom-sheet">
      <div className="button">engagement</div>
      <div className="button">response</div>
      <div className="button">question</div>
      <div className="timer">
        ⏳ {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default BottomSheet;