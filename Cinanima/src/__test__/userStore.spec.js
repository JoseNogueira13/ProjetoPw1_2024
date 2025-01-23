import { useUserStore } from '@/stores/userStore';
import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('userStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  // CHECK INITIAL STATE
  it('should initialize with default values', () => {
    const userStore = useUserStore();
    expect(userStore.isUserAuthenticated).toBe(false);
    expect(userStore.user).toBeNull();
    expect(userStore.users).toHaveLength(2);
  });

  // CHECK LOGIN FUNCTIONALITY
  it('should login a user with correct credentials', () => {
    const userStore = useUserStore();
    userStore.login('user@email.com', 'user123');

    expect(userStore.isUserAuthenticated).toBe(true);
    expect(userStore.user).toBeTruthy();
    expect(userStore.user.email).toBe('user@email.com');
  });

  it('should throw an error for incorrect login credentials', () => {
    const userStore = useUserStore();
    expect(() => {
      userStore.login('wrong@email.com', 'wrongpassword');
    }).toThrowError('User invalid!');
  });

  // CHECK REGISTRATION
  it('should register a new user successfully', () => {
    const userStore = useUserStore();
  
    userStore.register('New User', 'newuser@gmail.com', 'newpass123', 'newpass123');
  
    const newUser = userStore.users.find(user => user.email === 'newuser@gmail.com');
    expect(newUser).toBeTruthy();
    expect(newUser.name).toBe('New User');
    expect(newUser.email).toBe('newuser@gmail.com');
    expect(newUser.password).toBe('newpass123');
    expect(newUser.information).toEqual([null]);
    expect(newUser.roles).toEqual(['user']);
    expect(newUser.ticketType).toEqual([]);
    expect(newUser.calendar).toEqual([]);
    expect(newUser.likedMovies).toEqual([]);
  });
  

  it('should throw an error when registering with an existing email', () => {
    const userStore = useUserStore();
  
    expect(() => {
      userStore.register('Duplicate User', 'user@email.com', 'pass123', 'pass123');
    }).toThrowError('Email already in use.');
  });
  
  

  // CHECK LOGOUT FUNCTIONALITY
  it('should logout the user', () => {
    const userStore = useUserStore();
    userStore.login('user@email.com', 'user123');
    userStore.logout();

    expect(userStore.isUserAuthenticated).toBe(false);
    expect(userStore.user).toBeNull();
  });

  // CHECK CALENDAR OPERATIONS
  it('should add a film to the calendar', () => {
    const userStore = useUserStore();
    userStore.login('user@email.com', 'user123');

    const film = { id: 1, title: 'Sonic 3' };
    userStore.addToCalendar(film);

    expect(userStore.getUserCalendar).toContainEqual({ filmId: film, seen: false });
  });

  it('should not add a duplicate film to the calendar', () => {
    const userStore = useUserStore();
    userStore.login('user@email.com', 'user123');

    const film = { id: 1, title: 'Sonic 3' };
    userStore.addToCalendar(film);
    userStore.addToCalendar(film);

    expect(userStore.getUserCalendar.length).toBe(1);
  });

  it('should remove a film from the calendar', () => {
    const userStore = useUserStore();
    userStore.login('user@email.com', 'user123');

    const film = { id: 1, title: 'Sonic 3' };
    userStore.addToCalendar(film);
    userStore.removeFromCalendar(film.id);

    expect(userStore.getUserCalendar).not.toContainEqual({ filmId: film, seen: false });
  });

  it('should mark a film as seen in the calendar', () => {
    const userStore = useUserStore();
    userStore.login('user@email.com', 'user123');

    const film = { id: 1, title: 'Sonic 3' };
    userStore.addToCalendar(film);
    userStore.markFilmAsSeen(film.id);

    const updatedFilm = userStore.getUserCalendar.find(item => item.filmId.id === film.id);
    expect(updatedFilm.seen).toBe(true);
  });

  it('should do nothing if marking a non-existent film as seen', () => {
    const userStore = useUserStore();
    userStore.login('user@email.com', 'user123');

    userStore.markFilmAsSeen(999);
    expect(userStore.getUserCalendar.length).toBe(0);
  });
});
