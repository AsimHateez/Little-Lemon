import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const PROFILE_KEY = '@little_lemon/profile';

export const EMPTY_PROFILE = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  notifications: {
    orderStatuses: true,
    passwordChanges: true,
    specialOffers: true,
    newsletter: true,
  },
};

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    AsyncStorage.getItem(PROFILE_KEY)
      .then((stored) => {
        if (!cancelled) {
          setProfile(stored ? JSON.parse(stored) : null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setProfile(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const saveProfile = useCallback(async (nextProfile) => {
    const mergedProfile = {
      ...EMPTY_PROFILE,
      ...nextProfile,
      notifications: {
        ...EMPTY_PROFILE.notifications,
        ...nextProfile.notifications,
      },
    };

    setProfile(mergedProfile);
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(mergedProfile));
  }, []);

  const logOut = useCallback(async () => {
    setProfile(null);
    await AsyncStorage.removeItem(PROFILE_KEY);
  }, []);

  const value = useMemo(
    () => ({ profile, isLoading, saveProfile, logOut }),
    [profile, isLoading, saveProfile, logOut]
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile must be used inside a ProfileProvider');
  }

  return context;
}
