export const formatDate = (dateString: string, format: string): string => {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getUTCFullYear();

  const monthShort = date.toLocaleString('en-US', { month: 'short' });
  // const monthFull = date.toLocaleString('en-US', { month: 'long' });

  return (
    {
      'YYYY-MM-DD': `${year}-${month}-${day}`,
      'MM/DD/YYYY': `${month}/${day}/${year}`,
      'DD/MM/YYYY': `${day}/${month}/${year}`,
      'YYYY/MM/DD': `${year}/${month}/${day}`,
      'DD Mon YYYY': `${day} ${monthShort} ${year}`,
      'MMM DD, YYYY': `${monthShort} ${day}, ${year}`,
    }[format] ||
    (() => {
      throw new Error('Unsupported date format');
    })()
  );
};
