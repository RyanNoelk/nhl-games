// components/GameCard.tsx
import React, { useState } from 'react';
import type { NHLGameScore } from '../types/types.ts';
import TeamLogo from "./TeamLogo.tsx";

interface GameCardProps {
  game: NHLGameScore;
  spoilerFree: boolean;
  isFavorite: (teamId: string) => boolean;
  onToggleFavorite: (teamId: string) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  spoilerFree,
  isFavorite,
  onToggleFavorite
}) => {
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
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={() => onToggleFavorite(game.homeTeam.abbrev)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.5rem'
              }}
            >
              {isFavorite(game.homeTeam.abbrev) ? '⭐' : '☆'}
            </button>
            <TeamLogo team={game.homeTeam.abbrev} />
            {game.homeTeam.name.default}
          </div>

          <div>vs</div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={() => onToggleFavorite(game.awayTeam.abbrev)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.5rem'
              }}
            >
              {isFavorite(game.awayTeam.abbrev) ? '⭐' : '☆'}
            </button>
            <TeamLogo team={game.awayTeam.abbrev} />
            {game.awayTeam.name.default}
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
