// Helper function to get timezone abbreviation
export const getTimezoneAbbr = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    timeZoneName: 'long',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  const longTZ =
    new Intl.DateTimeFormat('en-US', options)
      .formatToParts(date)
      .find(part => part.type === 'timeZoneName')?.value || '';

  // Map of common timezone names to their abbreviations
  const tzMap: { [key: string]: string } = {
    // North America
    'Pacific Standard Time': 'PST',
    'Pacific Daylight Time': 'PDT',
    'Mountain Standard Time': 'MST',
    'Mountain Daylight Time': 'MDT',
    'Central Standard Time': 'CST',
    'Central Daylight Time': 'CDT',
    'Eastern Standard Time': 'EST',
    'Eastern Daylight Time': 'EDT',
    'Alaska Standard Time': 'AKST',
    'Alaska Daylight Time': 'AKDT',
    'Hawaii-Aleutian Standard Time': 'HST',
    // Europe
    'Central European Standard Time': 'CET',
    'Central European Summer Time': 'CEST',
    'British Summer Time': 'BST',
    'Western European Summer Time': 'WEST',
    'Western European Standard Time': 'WET',
    'Eastern European Standard Time': 'EET',
    'Eastern European Summer Time': 'EEST',
    // Alternative names
    'Central Europe Standard Time': 'CET',
    'Central Europe Summer Time': 'CEST',
    'Romance Standard Time': 'CET',
    'Romance Daylight Time': 'CEST',
    'GMT+1': 'CET',
    'GMT+2': 'CEST',
  };

  return tzMap[longTZ] || longTZ;
};
