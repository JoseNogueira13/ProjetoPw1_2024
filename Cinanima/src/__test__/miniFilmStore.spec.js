import { useMiniFilmStore } from '@/stores/moviesStore';
import { useUserStore } from '@/stores/userStore';
import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as API from '../API/api';

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

vi.mock('../API/api', () => ({
  get: vi.fn(),
}));

describe('miniFilmStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  // CHECK INITIAL STATE
  it('should initialize with default values', () => {
    const miniFilmStore = useMiniFilmStore();
    expect(miniFilmStore.miniFilms).toEqual([]);
    expect(miniFilmStore.loading).toBe(false);
    expect(miniFilmStore.error).toBeNull();
    expect(miniFilmStore.currentMovie).toBeNull();
    expect(miniFilmStore.comments).toEqual({});
    expect(miniFilmStore.likes).toEqual({});
  });

  // CHECK fetchMiniFilms
  it('should fetch and store mini films correctly', async () => {
    const miniFilmStore = useMiniFilmStore();
    const mockResponse = {
      results: [
        {
          id: 1,
          title: 'Short Film 1',
          overview: 'Description of short film 1',
          poster_path: '/path/to/poster1.jpg',
        },
        {
          id: 2,
          title: 'Short Film 2',
          overview: 'Description of short film 2',
          poster_path: '/path/to/poster2.jpg',
        },
      ],
    };

    API.get.mockResolvedValueOnce(mockResponse);

    await miniFilmStore.fetchMiniFilms();

    expect(miniFilmStore.miniFilms).toEqual([
      {
        id: 1,
        title: 'Short Film 1',
        description: 'Description of short film 1',
        image: 'https://image.tmdb.org/t/p/w500/path/to/poster1.jpg',
      },
      {
        id: 2,
        title: 'Short Film 2',
        description: 'Description of short film 2',
        image: 'https://image.tmdb.org/t/p/w500/path/to/poster2.jpg',
      },
    ]);
    expect(miniFilmStore.loading).toBe(false);
    expect(miniFilmStore.error).toBeNull();
  });

  it('should handle errors when fetching mini films', async () => {
    const miniFilmStore = useMiniFilmStore();

    API.get.mockRejectedValueOnce(new Error('API Error'));

    await miniFilmStore.fetchMiniFilms();

    expect(miniFilmStore.miniFilms).toEqual([]);
    expect(miniFilmStore.loading).toBe(false);
    expect(miniFilmStore.error).toBe('API Error');
  });

  // CHECK fetchMovieDetails
  it('should fetch and store movie details', async () => {
    const miniFilmStore = useMiniFilmStore();

    const mockMovieResponse = {
      id: 1,
      title: 'Short Film 1',
      overview: 'Description of short film 1',
      poster_path: '/path/to/poster1.jpg',
      release_date: '2025-01-01',
      vote_average: 8.5,
    };

    const mockCreditsResponse = {
      crew: [
        { id: 101, name: 'Director Name', job: 'Director' },
      ],
      cast: [
        { id: 201, name: 'Actor 1' },
        { id: 202, name: 'Actor 2' },
      ],
    };

    API.get
      .mockResolvedValueOnce(mockMovieResponse)
      .mockResolvedValueOnce(mockCreditsResponse);

    await miniFilmStore.fetchMovieDetails(1);

    expect(miniFilmStore.currentMovie).toEqual({
      id: 1,
      title: 'Short Film 1',
      description: 'Description of short film 1',
      image: 'https://image.tmdb.org/t/p/w500/path/to/poster1.jpg',
      releaseDate: '2025-01-01',
      rating: 8.5,
      likes: 0,
      director: { id: 101, name: 'Director Name', job: 'Director' },
      cast: [
        { id: 201, name: 'Actor 1' },
        { id: 202, name: 'Actor 2' },
      ],
    });
  });

  it('should handle errors when fetching movie details', async () => {
    const miniFilmStore = useMiniFilmStore();

    API.get.mockRejectedValueOnce(new Error('Movie Details Error'));

    await miniFilmStore.fetchMovieDetails(1);

    expect(miniFilmStore.currentMovie).toBeNull();
    expect(miniFilmStore.error).toBe('Movie Details Error');
  });

  // CHECK ADD, REMOVE, AND EDIT FILMS
  it('should add a film', () => {
    const miniFilmStore = useMiniFilmStore();

    const newFilm = {
      idFilm: 3,
      title: 'New Film',
      description: 'Description of the new film',
    };

    miniFilmStore.addFilm(newFilm);

    expect(miniFilmStore.miniFilms).toContainEqual(newFilm);
  });

  it('should remove a film', () => {
    const miniFilmStore = useMiniFilmStore();

    miniFilmStore.miniFilms = [
      { idFilm: 1, title: 'Film 1' },
      { idFilm: 2, title: 'Film 2' },
    ];

    miniFilmStore.removeFilm(1);

    expect(miniFilmStore.miniFilms).toEqual([{ idFilm: 2, title: 'Film 2' }]);
  });

  it('should edit a film', () => {
    const miniFilmStore = useMiniFilmStore();

    miniFilmStore.miniFilms = [
      { idFilm: 1, title: 'Film 1', description: 'Description 1' },
    ];

    const updatedFilm = { idFilm: 1, title: 'Updated Film 1', description: 'Updated Description' };

    miniFilmStore.editFilm(updatedFilm);

    expect(miniFilmStore.miniFilms).toContainEqual(updatedFilm);
  });

  it('should increase likes for a movie when user is logged in', () => {
    const miniFilmStore = useMiniFilmStore();
    const userStore = useUserStore();

    // Mock user and film data
    userStore.user = { name: 'Test User', likedMovies: [] };
    miniFilmStore.miniFilms = [{ id: 1, title: 'Test Film', likes: 0 }];

    miniFilmStore.likeMovie(1);

    // Verify the movie has been liked
    expect(miniFilmStore.miniFilms[0].likes).toBe(1);
    expect(userStore.user.likedMovies).toContain(1);
    expect(localStorage.getItem('currentUser')).toContain('1');
  });

  it('should not allow liking a movie if the user is not logged in', () => {
    const miniFilmStore = useMiniFilmStore();
    const userStore = useUserStore();

    // No user logged in
    userStore.user = null;
    miniFilmStore.miniFilms = [{ id: 1, title: 'Test Film', likes: 0 }];

    miniFilmStore.likeMovie(1);

    // Verify the likes remain unchanged
    expect(miniFilmStore.miniFilms[0].likes).toBe(0);
  });

  it('should not allow liking a movie more than once by the same user', () => {
    const miniFilmStore = useMiniFilmStore();
    const userStore = useUserStore();

    // Mock user and film data
    userStore.user = { name: 'Test User', likedMovies: [1] };
    miniFilmStore.miniFilms = [{ id: 1, title: 'Test Film', likes: 1 }];

    miniFilmStore.likeMovie(1);

    // Verify the likes remain unchanged
    expect(miniFilmStore.miniFilms[0].likes).toBe(1);
    expect(userStore.user.likedMovies).toContain(1);
  });

  it('should not like a movie that does not exist', () => {
    const miniFilmStore = useMiniFilmStore();
    const userStore = useUserStore();

    // Mock user data
    userStore.user = { name: 'Test User', likedMovies: [] };
    miniFilmStore.miniFilms = [{ id: 1, title: 'Test Film', likes: 0 }];

    miniFilmStore.likeMovie(999);

    // Verify no changes are made
    expect(miniFilmStore.miniFilms[0].likes).toBe(0);
    expect(userStore.user.likedMovies).not.toContain(999);
  });


  // CHECK COMMENTS
  it('should add a comment to a movie', () => {
    const miniFilmStore = useMiniFilmStore();

    miniFilmStore.addComment(1, 'Great movie!');

    expect(miniFilmStore.comments[1]).toContain('Great movie!');
    expect(localStorage.getItem('movieComments')).toContain('Great movie!');
  });
});
