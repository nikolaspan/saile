import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [auth, setAuth] = useState({ token: '', role: '' });

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('authToken='));
    const role = document.cookie.split('; ').find(row => row.startsWith('userRole='));
    setAuth({
      token: token?.split('=')[1] || '',
      role: role?.split('=')[1] || '',
    });
  }, []);

  return auth;
};
