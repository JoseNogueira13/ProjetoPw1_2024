import { useUserStore } from '@/stores/userStore';
import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';

// Mock localStorage
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

  // CHECK THE INITIAL STATE OF THE STORE
  it('should initialize with default values', () => {
    const userStore = useUserStore();
    expect(userStore.user).toBeNull();
    expect(userStore.token).toBeNull();
    expect(userStore.isAuthenticated).toBeFalsy();
  });

  // CHECK IF A USER WITH CORRECT CREDENTIALS CAN LOGIN
  it('should login a user with correct credentials', () => {
    const userStore = useUserStore();
    userStore.login({ email: 'user@gmail.com', password: 'user123' });

    expect(userStore.user).toBeTruthy();
    expect(userStore.token).toBeTruthy();
    expect(localStorage.getItem('currentUser')).toBeTruthy();
    expect(localStorage.getItem('token')).toBeTruthy();
  });

  // CHECK IF A USER WITH INCORRECT CREDENCIALS IS REJECTED
  it('should throw an error for incorrect login credentials', () => {
    const userStore = useUserStore();

    expect(() => {
      userStore.login({ email: 'wrong@gmail.com', password: 'wrong123' });
    }).toThrowError('Invalid email or password.');
  });

  // CHECK IF A NEW USER CAN BE REGISTERED
  it('should register a new user successfully', () => {
    const userStore = useUserStore();
    userStore.register({ name: 'New User', email: 'newuser@gmail.com', password: 'newpass123' });

    const newUser = userStore.users.find(user => user.email === 'newuser@gmail.com');
    expect(newUser).toBeTruthy();
    expect(newUser.email).toBe('newuser@gmail.com');
  });

  // CHECK IF A USER IS REGISTERING WITH AN EXISTING EMAIL
  it('should throw an error when registering with an existing email', () => {
    const userStore = useUserStore();

    expect(() => {
      userStore.register({ name: 'Existing User', email: 'user@gmail.com', password: 'user123' });
    }).toThrowError('Email already in use.');
  });

  // CHECK IF A USER CAN LOGOUT
  it('should logout the user and clear localStorage', () => {
    const userStore = useUserStore();
    userStore.login({ email: 'user@gmail.com', password: 'user123' });
    userStore.logout();

    expect(userStore.user).toBeNull();
    expect(userStore.token).toBeNull();
    expect(localStorage.getItem('currentUser')).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });

  // CHECK IF THE TOKEN IS A VALID ONE
  it('should verify a valid token', () => {
    const userStore = useUserStore();
    userStore.login({ email: 'user@gmail.com', password: 'user123' });

    const decodedToken = userStore.verifyToken();
    expect(decodedToken).toBeTruthy();
    expect(decodedToken.email).toBe('user@gmail.com');
  });

  // CHECK IF THE TOKEN IS EXPIRED
  it('should throw an error for an expired token', () => {
    const userStore = useUserStore();
    userStore.token = 'expired.token.value';
    
    expect(() => {
      userStore.verifyToken();
    }).toThrowError('Token expired or invalid. Please log in again.');
  });

  // CHECK IF A USER CAN ADD A FILM TO THE CALENDAR
  it('should add a film to the calendar', () => {
    const userStore = useUserStore();
    userStore.login({ email: 'user@gmail.com', password: 'user123' });

    const film = { id: 1, title: 'Sonic the Hedgehog 7' };
    userStore.addToCalendar(film);

    expect(userStore.user.calendar).toContainEqual({ filmId: film, seen: false });
    expect(localStorage.getItem('currentUser')).toContain(film.id);
  });

  // CHECK IF A FILM IS ALREADY IN THE CALENDAR
  it('should not add a film if already in the calendar', () => {
    const userStore = useUserStore();
    userStore.login({ email: 'user@gmail.com', password: 'user123' });

    const film = { id: 1, title: 'Sonic the Hedgehog 7' };
    userStore.addToCalendar(film);
    userStore.addToCalendar(film);

    expect(userStore.user.calendar.length).toBe(1);
  });

  // CHECK IF A FILM CAN BE REMOVED FROM THE CALENDAR
  it('should remove a film from the calendar', () => {
    const userStore = useUserStore();
    userStore.login({ email: 'user@gmail.com', password: 'user123' });

    const film = { id: 1, title: 'Sonic the Hedgehog 7' };
    userStore.addToCalendar(film);
    userStore.removeFromCalendar(film.id);

    expect(userStore.user.calendar).not.toContainEqual({ filmId: film, seen: false });
  });
});
