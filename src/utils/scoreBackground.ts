// components/ScoreBackground/utils.ts
export const calculateBackgroundColor = (score: number): string => {
  // No score = no background
  console.log(score);
  if (score === 0) {
    return 'transparent';
  }

  // Calculate color intensity based on score
  const baseColor = 'rgba(100, 108, 255, ';
  const maxOpacity = 0.3;

  // 150 is the maximum possible score (50 + 50 + 50)
  const intensity = Math.min(score / 150, 1) * maxOpacity;

  return `${baseColor}${intensity})`;
};
