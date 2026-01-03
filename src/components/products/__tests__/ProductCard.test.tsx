import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import ProductCard from "../ProductCard";
import { renderWithProviders, mockProducts } from "../../../test/utils";

describe("ProductCard", () => {
  const mockOnAddToFavorites = vi.fn();
  const product = mockProducts[0];

  beforeEach(() => {
    mockOnAddToFavorites.mockClear();
  });

  it("renders product information correctly", () => {
    renderWithProviders(
      <ProductCard
        product={product}
        onAddToFavorites={mockOnAddToFavorites}
        isFavorite={false}
      />
    );

    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(product.category)).toBeInTheDocument();
    expect(
      screen.getByText(`$${product.price.toFixed(2)}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`(${product.rating.count} reviews)`)
    ).toBeInTheDocument();
  });

  it("displays product image with correct alt text", () => {
    renderWithProviders(
      <ProductCard
        product={product}
        onAddToFavorites={mockOnAddToFavorites}
        isFavorite={false}
      />
    );

    const image = screen.getByAltText(product.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", product.image);
  });

  it("calls onAddToFavorites when favorite button is clicked", () => {
    renderWithProviders(
      <ProductCard
        product={product}
        onAddToFavorites={mockOnAddToFavorites}
        isFavorite={false}
      />
    );

    const favoriteButton = screen.getByLabelText("Add to favorites");
    fireEvent.click(favoriteButton);

    expect(mockOnAddToFavorites).toHaveBeenCalledWith(product);
  });

  it("shows different favorite button state when product is favorited", () => {
    renderWithProviders(
      <ProductCard
        product={product}
        onAddToFavorites={mockOnAddToFavorites}
        isFavorite={true}
      />
    );

    const favoriteButton = screen.getByLabelText("Remove from favorites");
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveClass("bg-red-500");
  });

  it("has correct link to product detail page", () => {
    renderWithProviders(
      <ProductCard
        product={product}
        onAddToFavorites={mockOnAddToFavorites}
        isFavorite={false}
      />
    );

    const productLink = screen.getByRole("link");
    expect(productLink).toHaveAttribute("href", `/product/${product.id}`);
  });

  it("prevents navigation when favorite button is clicked", () => {
    renderWithProviders(
      <ProductCard
        product={product}
        onAddToFavorites={mockOnAddToFavorites}
        isFavorite={false}
      />
    );

    const favoriteButton = screen.getByLabelText("Add to favorites");
    const clickEvent = new MouseEvent("click", { bubbles: true });
    const stopPropagationSpy = vi.spyOn(clickEvent, "stopPropagation");
    const preventDefaultSpy = vi.spyOn(clickEvent, "preventDefault");

    fireEvent(favoriteButton, clickEvent);

    expect(stopPropagationSpy).toHaveBeenCalled();
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
