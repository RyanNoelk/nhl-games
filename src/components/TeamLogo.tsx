import React from 'react';

interface TeamLogoProps {
  team: string; // team abbreviation
  size?: number;
}

const TeamLogo: React.FC<TeamLogoProps> = ({ team, size = 50 }) => {
  return (
    <img
      src={`https://assets.nhle.com/logos/nhl/svg/${team}_light.svg`}
      alt={`${team} logo`}
      width={size}
      height={size}
      style={{ objectFit: 'contain' }}
    />
  );
};

export default TeamLogo;
