// components/GameCard.tsx
import React, { useState } from 'react';
import type { NHLGameScore } from '../types/types.ts';

interface GameCardProps {
  game: NHLGameScore;
  spoilerFree: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ game, spoilerFree }) => {
  const [showScore, setShowScore] = useState(false);

  const toggleScore = () => {
    setShowScore(prev => !prev);
  };

  const reveal = spoilerFree ? showScore : true;

  return (
    <div
      className="game-card"
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '15px',
        margin: '10px 0',
        backgroundColor: '#f8f8f8',
        cursor: spoilerFree ? 'pointer' : 'default',
      }}
      onClick={spoilerFree ? toggleScore : undefined}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 'bold' }}>
            {game.awayTeam.name.default} @ {game.homeTeam.name.default}
          </div>
          {reveal ? (
            <div>
              {game.awayTeam.score} - {game.homeTeam.score}
            </div>
          ) : (
            <div style={{ color: '#666' }}>Click to reveal score</div>
          )}
        </div>
        <div style={{ color: '#666' }}>{game.gameState}</div>
      </div>
    </div>
  );
};
