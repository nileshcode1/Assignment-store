import { describe, it, expect, beforeEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer, {
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
  toggleFavorite,
} from "../favoritesSlice";
import { mockProducts } from "../../../test/utils";

describe("favoritesSlice", () => {
  let store: ReturnType<
    typeof configureStore<{ favorites: ReturnType<typeof favoritesReducer> }>
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        favorites: favoritesReducer,
      },
    });
  });

  describe("reducers", () => {
    it("should add product to favorites", () => {
      const product = mockProducts[0];
      store.dispatch(addToFavorites(product));

      const state = store.getState().favorites;
      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual(product);
    });

    it("should not add duplicate products to favorites", () => {
      const product = mockProducts[0];
      store.dispatch(addToFavorites(product));
      store.dispatch(addToFavorites(product));

      const state = store.getState().favorites;
      expect(state.items).toHaveLength(1);
    });

    it("should remove product from favorites", () => {
      const product = mockProducts[0];
      store.dispatch(addToFavorites(product));
      store.dispatch(removeFromFavorites(product.id));

      const state = store.getState().favorites;
      expect(state.items).toHaveLength(0);
    });

    it("should clear all favorites", () => {
      store.dispatch(addToFavorites(mockProducts[0]));
      store.dispatch(addToFavorites(mockProducts[1]));
      store.dispatch(clearFavorites());

      const state = store.getState().favorites;
      expect(state.items).toHaveLength(0);
    });

    it("should toggle favorite - add when not present", () => {
      const product = mockProducts[0];
      store.dispatch(toggleFavorite(product));

      const state = store.getState().favorites;
      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual(product);
    });

    it("should toggle favorite - remove when present", () => {
      const product = mockProducts[0];
      store.dispatch(addToFavorites(product));
      store.dispatch(toggleFavorite(product));

      const state = store.getState().favorites;
      expect(state.items).toHaveLength(0);
    });
  });
});
