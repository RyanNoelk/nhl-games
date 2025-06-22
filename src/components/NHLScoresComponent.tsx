// components/NHLScoresComponent.tsx
import React, { useState } from 'react';
import { useNHLScores } from '../hooks/getGames/useNHLScoresHook.ts';
import { GameCard } from './GameCard.tsx';

const getYesterday = (): string => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
};

export const NHLScores: React.FC = () => {
  // Get the date from URL or use today's date
  const [spoilerFree, setSpoilerFree] = useState(true);
  const searchParams = new URLSearchParams(window.location.search);
  const urlDate = searchParams.get('date');
  const today = new Date().toISOString().split('T')[0];
  const yesterday = getYesterday();

  const { data, loading, error } = useNHLScores({
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
    <div>
      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={() => navigateDay(-1)} style={{ padding: '5px 10px' }}>
            Previous Day
          </button>

          <input type="date" value={urlDate || yesterday} onChange={handleDateChange} max={today} />

          <button
            onClick={() => navigateDay(1)}
            disabled={(urlDate || yesterday) === today}
            style={{ padding: '5px 10px' }}
          >
            Next Day
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input type="checkbox" checked={spoilerFree} onChange={toggleSpoilerMode} />
            Spoiler-Free Mode
          </label>
        </div>
      </div>

      <h2>NHL Scores for {data.currentDate}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {data.games.map(game => (
          <GameCard key={game.id} game={game} spoilerFree={spoilerFree} />
        ))}
      </div>
    </div>
  );
};
