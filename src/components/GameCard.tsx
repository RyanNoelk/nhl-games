// components/GameCard.tsx
import React, { useState } from 'react';
import type { RankingResult } from '../types/types.ts';
import TeamLogo from './TeamLogo.tsx';
import { ScoreBackground } from './ScoreBackground.tsx';

interface GameCardProps {
  game: RankingResult;
  spoilerFree: boolean;
  isFavorite: (teamId: string) => boolean;
  onToggleFavorite: (teamId: string) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  spoilerFree,
  isFavorite,
  onToggleFavorite,
}) => {
  const [showScore, setShowScore] = useState(false);
  const toggleScore = () => {
    setShowScore(prev => !prev);
  };

  const reveal = spoilerFree ? showScore : true;
  return (
    <ScoreBackground
      score={game.score}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}
    >
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
                onClick={() => onToggleFavorite(game.game.awayTeam.abbrev)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                }}
              >
                {isFavorite(game.game.awayTeam.abbrev) ? '⭐' : '☆'}
              </button>
              <TeamLogo team={game.game.awayTeam.abbrev} />
              {game.game.awayTeam.name.default}
            </div>

            <div>at</div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button
                onClick={() => onToggleFavorite(game.game.homeTeam.abbrev)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                }}
              >
                {isFavorite(game.game.homeTeam.abbrev) ? '⭐' : '☆'}
              </button>
              <TeamLogo team={game.game.homeTeam.abbrev} />
              {game.game.homeTeam.name.default}
            </div>

            {reveal ? (
              <div>
                {game.game.awayTeam.name.default} {game.game.awayTeam.score} -{' '}
                {game.game.homeTeam.score} {game.game.homeTeam.name.default}
              </div>
            ) : (
              <div style={{ color: '#666' }}>Click to reveal score</div>
            )}
          </div>
          <div style={{ color: '#666' }}>{game.game.gameState}</div>
        </div>
      </div>
    </ScoreBackground>
  );
};
