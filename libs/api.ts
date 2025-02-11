export const fetcher = async (url: string, options = {}) => {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };
  