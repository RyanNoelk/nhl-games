// @ts-nocheck
import React from 'react';
import {
  IconButton,
  TextField,
  FormControlLabel,
  Switch,
  Typography,
  Paper,
  Stack,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface HeaderProps {
  date: string;
  today: string;
  yesterday: string;
  spoilerFree: boolean;
  onDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNavigateDay: (offset: number) => void;
  onToggleSpoilerMode: () => void;
}

const StyledDateTextField = styled(TextField)(({ theme }) => ({
  width: '150px',
  '& input': {
    padding: theme.spacing(1),
  },
}));

export const Header: React.FC<HeaderProps> = ({
  date,
  today,
  spoilerFree,
  onDateChange,
  onNavigateDay,
  onToggleSpoilerMode,
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 2,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={() => onNavigateDay(-1)} aria-label="Previous day">
            <ChevronLeft />
          </IconButton>

          <StyledDateTextField
            type="date"
            value={date}
            onChange={onDateChange}
            inputProps={{
              max: today,
            }}
            size="small"
          />

          <IconButton
            onClick={() => onNavigateDay(1)}
            disabled={date === today}
            aria-label="Next day"
          >
            <ChevronRight />
          </IconButton>
        </Stack>

        <FormControlLabel
          control={<Switch checked={spoilerFree} onChange={onToggleSpoilerMode} color="primary" />}
          label={
            <Typography variant="body2" color="text.secondary">
              Spoiler-Free Mode
            </Typography>
          }
          sx={{ mr: 0 }}
        />
      </Stack>
    </Paper>
  );
};
