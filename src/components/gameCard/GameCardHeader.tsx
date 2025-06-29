// @ts-nocheck
import React from 'react';
import { Box, Typography } from '@mui/material';
import { getTimezoneAbbr } from '../../utils/timezoneMap.ts';

interface GameCardHeaderProps {
  startTimeUTC: string;
  venue: {
    default: string;
  };
}

export const GameCardHeader: React.FC<GameCardHeaderProps> = ({ startTimeUTC, venue }) => {
  const date = new Date(startTimeUTC);

  // Format local time
  const localTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Format EST time
  const estTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/New_York',
  });

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography variant="subtitle2" color="text.secondary">
        {estTime} EST / {localTime} {getTimezoneAbbr(date)}
      </Typography>
    </Box>
  );
};
