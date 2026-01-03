import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '@testing-library/react';
import SearchInput from '../SearchInput';

describe('SearchInput', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with placeholder text', () => {
    render(<SearchInput value="" onChange={mockOnChange} />);

    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    const customPlaceholder = 'Custom search placeholder';
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        placeholder={customPlaceholder}
      />
    );

    expect(screen.getByPlaceholderText(customPlaceholder)).toBeInTheDocument();
  });

  it('displays current value', () => {
    const testValue = 'test search';
    render(<SearchInput value={testValue} onChange={mockOnChange} />);

    const input = screen.getByDisplayValue(testValue);
    expect(input).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    render(<SearchInput value="" onChange={mockOnChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new search' } });

    expect(mockOnChange).toHaveBeenCalledWith('new search');
  });

  it('shows clear button when value is not empty', () => {
    render(<SearchInput value="test" onChange={mockOnChange} />);

    const clearButton = screen.getByRole('button');
    expect(clearButton).toBeInTheDocument();
  });

  it('does not show clear button when value is empty', () => {
    render(<SearchInput value="" onChange={mockOnChange} />);

    const clearButton = screen.queryByRole('button');
    expect(clearButton).not.toBeInTheDocument();
  });

  it('clears input when clear button is clicked', () => {
    render(<SearchInput value="test" onChange={mockOnChange} />);

    const clearButton = screen.getByRole('button');
    fireEvent.click(clearButton);

    expect(mockOnChange).toHaveBeenCalledWith('');
  });

  it('has proper input styling', () => {
    render(<SearchInput value="" onChange={mockOnChange} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('input-field');
  });
});
