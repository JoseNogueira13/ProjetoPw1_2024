import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useMiniFilmStore } from "@/stores/moviesStore";
import * as API from "@/API/api";

describe("MiniFilm Store", () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useMiniFilmStore();

    localStorage.clear();
    vi.spyOn(window.localStorage.__proto__, "setItem").mockImplementation(() => {});
    vi.spyOn(window.localStorage.__proto__, "getItem").mockImplementation(() => null);
  });

  // CHECK THE INITIAL STATE OF THE STORE
  it("initializes with default state", () => {
    expect(store.miniFilms).toEqual([]);
    expect(store.loading).toBe(false);
    expect(store.error).toBe(null);
    expect(store.currentMovie).toBe(null);
    expect(store.comments).toEqual({});
    expect(store.likes).toEqual({});
  });

  // CHECK THE FETCHMINIFILMS METHOD
  it("fetches mini films and updates state", async () => {
    const mockResponse = {
      results: [
        { id: 1, title: "Movie 1", overview: "Description 1", poster_path: "/path1.jpg" },
        { id: 2, title: "Movie 2", overview: "Description 2", poster_path: "/path2.jpg" },
      ],
    };
    vi.spyOn(API, "get").mockResolvedValue(mockResponse);

    await store.fetchMiniFilms();

    expect(store.miniFilms).toEqual([
      {
        id: 1,
        title: "Movie 1",
        description: "Description 1",
        image: "https://image.tmdb.org/t/p/w500/path1.jpg",
      },
      {
        id: 2,
        title: "Movie 2",
        description: "Description 2",
        image: "https://image.tmdb.org/t/p/w500/path2.jpg",
      },
    ]);
    expect(store.loading).toBe(false);
    expect(store.error).toBe(null);
  });

  // CHECK THE FETCHMOVIEDETAILS METHOD
  it("fetches movie details and updates currentMovie state", async () => {
    const mockResponse = {
      id: 1,
      title: "Movie 1",
      overview: "Description 1",
      poster_path: "/path1.jpg",
      release_date: "2023-01-01",
      vote_average: 8.5,
    };
    vi.spyOn(API, "get").mockResolvedValue(mockResponse);

    await store.fetchMovieDetails(1);

    expect(store.currentMovie).toEqual({
      id: 1,
      title: "Movie 1",
      description: "Description 1",
      image: "https://image.tmdb.org/t/p/w500/path1.jpg",
      releaseDate: "2023-01-01",
      rating: 8.5,
      likes: 0,
    });
    expect(store.loading).toBe(false);
    expect(store.error).toBe(null);
  });

});
