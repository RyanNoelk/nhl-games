// @ts-nocheck
import React, { useState } from 'react';
import { useScores } from '../hooks/useScoresHook.ts';
import { GameCard } from './gameCard/GameCard.tsx';
import { useFavoriteTeams } from '../hooks/useFavoriteTeams';
import { rankGames } from '../utils/gameRanking.ts';
import { Header } from './Header.tsx';
import { Container, Typography } from '@mui/material';
import type { NHLGameScore } from '../types/types.ts';

const getYesterday = (): string => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
};

export const Scores: React.FC = () => {
  // Get the date from URL or use today's date
  const [spoilerFree, setSpoilerFree] = useState(true);
  const { favoriteTeams, toggleFavorite, isFavorite } = useFavoriteTeams();
  const searchParams = new URLSearchParams(window.location.search);
  const urlDate = searchParams.get('date');
  const today = new Date().toISOString().split('T')[0];
  const yesterday = getYesterday();

  const { data, loading, error } = useScores({
    date: urlDate || yesterday,
  });

  const toggleSpoilerMode = () => {
    setSpoilerFree(!spoilerFree);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    const newUrl =
      newDate === yesterday
        ? window.location.pathname
        : `${window.location.pathname}?date=${newDate}`;

    window.history.pushState({}, '', newUrl);
    // Trigger a re-render
    window.dispatchEvent(new Event('popstate'));
  };

  const navigateDay = (offset: number) => {
    const currentDate = urlDate || yesterday;
    const currentDateObj = new Date(currentDate);
    currentDateObj.setDate(currentDateObj.getDate() + offset);
    const newDate = currentDateObj.toISOString().split('T')[0];

    if (newDate <= today) {
      const newUrl =
        newDate === yesterday
          ? window.location.pathname
          : `${window.location.pathname}?date=${newDate}`;

      window.history.pushState({}, '', newUrl);
      // Trigger a re-render
      window.dispatchEvent(new Event('popstate'));
    }
  };

  // Listen for browser navigation (back/forward buttons)
  React.useEffect(() => {
    const handlePopState = () => {
      // Force re-render
      setForceUpdate(prev => !prev);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Force update state to trigger re-renders when URL changes
  const [_, setForceUpdate] = React.useState(false);

  const getRankedGames = (games: NHLGameScore[]) => {
    return rankGames(games, favoriteTeams);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <Container maxWidth="md">
      <Header
        date={urlDate || yesterday}
        today={today}
        yesterday={yesterday}
        spoilerFree={spoilerFree}
        onDateChange={handleDateChange}
        onNavigateDay={navigateDay}
        onToggleSpoilerMode={toggleSpoilerMode}
      />

      <Typography variant="h4" component="h1" gutterBottom>
        NHL Scores for {data.currentDate}
      </Typography>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {getRankedGames(data.games).map(game => (
          <GameCard
            key={game.game.id}
            game={game}
            spoilerFree={spoilerFree}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </Container>
  );
};
