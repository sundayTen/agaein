import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

const parseJSON = <T>(value: string | null): T | undefined => {
    try {
        return value === 'undefined' ? undefined : JSON.parse(value ?? '');
    } catch (error) {
        console.log('parsing error on', { value });
        return undefined;
    }
};

const useLocalStorage = <T>(key: string, initialValue: T): [T, SetValue<T>] => {
    const isWindowNotExist = () => {
        return typeof window === 'undefined';
    };

    const readValue = (): T => {
        if (isWindowNotExist()) {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? (parseJSON(item) as T) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key “${key}”:`, error);
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState<T>(readValue);

    const setValue: SetValue<T> = (value) => {
        if (isWindowNotExist()) {
            console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`);
        }

        try {
            const newValue = value instanceof Function ? value(storedValue) : value;
            window.localStorage.setItem(key, JSON.stringify(newValue));
            setStoredValue(newValue);
            window.dispatchEvent(new Event('local-storage'));
        } catch (error) {
            console.warn(`Error setting localStorage key “${key}”:`, error);
        }
    };

    useEffect(() => {
        setStoredValue(readValue());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            setStoredValue(readValue());
        };
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('local-storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('local-storage', handleStorageChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [storedValue, setValue];
};

export default useLocalStorage;
