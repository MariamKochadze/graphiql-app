import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StoreProvider from './StoreProvider';
import { makeStore } from '@store/store';

// Mock the `makeStore` function
vi.mock('@store/store', () => ({
  makeStore: vi.fn(() => ({
    subscribe: vi.fn(),
    dispatch: vi.fn(),
    getState: vi.fn(),
    replaceReducer: vi.fn(),
  })),
}));

describe('StoreProvider Component', () => {
  it('provides a store to its children', () => {
    render(
      <StoreProvider>
        <div data-testid="child">Child Component</div>
      </StoreProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(makeStore).toHaveBeenCalledTimes(1);
  });
});
