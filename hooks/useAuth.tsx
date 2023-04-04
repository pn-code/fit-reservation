import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface User {
  email: string;
}

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('jwt');

    if (token) {
      fetch('/api/users/me')
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setIsLoading(false);
        })
        .catch(() => {
          Cookies.remove('jwt');
          router.replace('/login');
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const isAuthenticated = !!user;

  return { isAuthenticated, user, isLoading };
};
