// components/ScoreBackground/ScoreBackground.tsx
import React from 'react';
import type {ScoreBackgroundProps} from "../types/types.ts";
import {calculateBackgroundColor} from "../utils/scoreBackground.ts";

export const ScoreBackground: React.FC<ScoreBackgroundProps> = ({
  score,
  children,
  className,
  style
}) => {
  const backgroundColor = calculateBackgroundColor(score);

  return (
    <div
      className={className}
      style={{
        ...style,
        backgroundColor,
        transition: 'background-color 0.3s ease',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc'
      }}
    >
      {score}
      {children}
    </div>
  );
};