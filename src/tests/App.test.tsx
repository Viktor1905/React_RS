import { expect, beforeEach, describe, test, afterEach } from 'vitest';
import { fireEvent, render, type RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';
import App from '../App.tsx';

describe('Rendering App', (): void => {
  let appComponent: RenderResult;
  beforeEach((): void => {
    appComponent = render(
      <StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </StrictMode>
    );
  });
  afterEach((): void => {
    appComponent.unmount();
  });
  test('renders button wrapper', (): void => {
    expect(appComponent.getByTestId('button-wrapper')).toBeInTheDocument();
  });
  test('renders button wrapper correctly', (): void => {
    expect(appComponent.getByTestId('button-wrapper')).toBeInTheDocument();
    expect(
      appComponent.getByRole('button', { name: 'Open uncontrolled form' })
    ).toBeInTheDocument();
    expect(
      appComponent.getByRole('button', { name: 'Open controlled form' })
    ).toBeInTheDocument();
  });
  test('forms are not rendered initially', (): void => {
    expect(appComponent.queryByTestId('uncontrolled-form')).toBeNull();
    expect(appComponent.queryByTestId('controlled-form')).toBeNull();
  });

  test('renders uncontrolled form correctly', (): void => {
    expect(appComponent.getByTestId('button-wrapper')).toBeInTheDocument();
    const button = appComponent.getByRole('button', {
      name: 'Open uncontrolled form',
    });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(appComponent.getByTestId('uncontrolled-form')).toBeInTheDocument();
  });
  test('renders controlled form correctly', (): void => {
    expect(appComponent.getByTestId('button-wrapper')).toBeInTheDocument();
    const button = appComponent.getByRole('button', {
      name: 'Open controlled form',
    });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(appComponent.getByTestId('controlled-form')).toBeInTheDocument();
  });
  test('close uncontrolled form correctly', (): void => {
    const button = appComponent.getByRole('button', {
      name: 'Open uncontrolled form',
    });
    fireEvent.click(button);
    expect(appComponent.getByTestId('uncontrolled-form')).toBeInTheDocument();
    fireEvent.keyPress(document, { key: 'Escape' });
    expect(appComponent.queryByTestId('uncontrolled-form')).not.toBeNull();
  });
});
