export const setCookie = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  };
  
  export const deleteCookie = (name: string) => {
    document.cookie = `${name}=; Max-Age=0; path=/`;
  };
  