/* eslint-env vitest */
/*** @vitest-environment jsdom
 */

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import DocumentViewer from './DocumentViewer';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import documentReducer from '../features/document';
import userReducer from '../features/user';
import { userApi } from '../features/userAPI';
import { describe, it, expect, beforeEach } from 'vitest';

// Create a test store similar to your actual store
const createTestStore = (preloadedState) => {
  return configureStore({
    reducer: {
      document: documentReducer,
      user: userReducer,
      [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware),
    preloadedState,
  });
};

describe('DocumentViewer Component', () => {
  let store;

  beforeEach(() => {
    store = createTestStore({
      document: { files: [], loading: false, errorMessage: null },
      user: { token: 'dummy-token' },
    });
  });

  it('renders the button and handles click to fetch the latest file', () => {
    render(
      <Provider store={store}>
        <DocumentViewer />
      </Provider>
    );

    // The button text should be "View Latest File"
    const button = screen.getByRole('button', { name: /view latest file/i });
    expect(button).toBeInTheDocument();

    // Simulate a click event
    fireEvent.click(button);

    // Assert that the loading spinner appears after clicking
    const spinner = screen.queryByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('handles error when fetching the latest file fails', () => {
    // Mock the store state to simulate a failure
    store = createTestStore({
      document: { files: [], loading: false, errorMessage: 'Error fetching file' },
      user: { token: 'dummy-token' },
    });

    render(
      <Provider store={store}>
        <DocumentViewer />
      </Provider>
    );

  
  });
});
