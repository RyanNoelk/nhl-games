// @ts-nocheck
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Grid,
  Avatar,
  useTheme,
  Chip,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import type { RankingResult } from '../../types/types.ts';
import { GameCardHeader } from './GameCardHeader.tsx';
import { AirplaneTicket, Home } from '@mui/icons-material';

interface GameCardProps {
  game: RankingResult;
  spoilerFree: boolean;
  isFavorite: (teamName: string) => boolean;
  onToggleFavorite: (teamName: string) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  spoilerFree,
  isFavorite,
  onToggleFavorite,
}) => {
  const theme = useTheme();
  const [showScore, setShowScore] = useState(false);
  const { game: gameData, score } = game;
  const { homeTeam, awayTeam, venue, startTimeUTC } = gameData;

  const reveal = spoilerFree ? showScore : true;

  const handleScoreToggle = () => {
    setShowScore(prev => !prev);
  };

  const renderTeamRow = (team: typeof homeTeam | typeof awayTeam, isHome: boolean) => (
    <Grid container alignItems="center" spacing={2} sx={{ my: 1 }}>
      <Grid item xs={1}>
        <IconButton
          size="small"
          onClick={e => {
            e.stopPropagation();
            onToggleFavorite(team.abbrev);
          }}
          sx={{ color: isFavorite(team.abbrev) ? 'warning.main' : 'action.disabled' }}
        >
          {isFavorite(team.abbrev) ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      </Grid>

      <Grid item xs={2}>
        <Avatar
          src={team.logo}
          alt={`${team.name.default} logo`}
          variant="square"
          sx={{ width: 32, height: 32 }}
        />
      </Grid>

      <Grid item xs={6}>
        <Typography variant="body1" component="span">
          <Chip
            icon={isHome ? <Home /> : <AirplaneTicket />}
            size="small"
            sx={{
              height: 20,
              '& .MuiChip-label': {
                px: 0.5,
                fontSize: '0.675rem',
              },
              backgroundColor: theme.palette.grey[100],
              color: theme.palette.text.secondary,
            }}
          />
        </Typography>
        <Typography variant="body1" component="span" sx={{ marginLeft: 1 }}>
          {team.name.default}
        </Typography>
      </Grid>

      <Grid item xs={3}>
        <Typography variant="h6" component="div" align="right" sx={{ fontWeight: 'bold' }}>
          {reveal ? team.score : '-'}
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <Card
      onClick={spoilerFree ? handleScoreToggle : undefined}
      sx={{
        position: 'relative',
        borderRadius: 2,
        cursor: spoilerFree ? 'pointer' : 'default',
        '&:hover': {
          boxShadow: theme.shadows[4],
        },
        transition: 'box-shadow 0.3s ease-in-out',
      }}
    >
      <CardContent>
        <GameCardHeader startTimeUTC={startTimeUTC} venue={venue} />

        <Box sx={{ mt: 2 }}>
          {renderTeamRow(awayTeam, false)}
          {renderTeamRow(homeTeam, true)}
        </Box>

        {spoilerFree && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography color="text.secondary" variant="body2">
              {showScore ? 'Click to hide score' : 'Click to reveal score'}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
