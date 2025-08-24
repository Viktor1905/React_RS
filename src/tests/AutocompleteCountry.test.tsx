import { describe, test, expect, vi, beforeEach } from 'vitest';
import {
  render,
  fireEvent,
  waitFor,
  type RenderResult,
} from '@testing-library/react';
import { AutocompleteCountry } from '../components/ControlledForm/Elements/AutocompleteCountry/AutocompleteCountry.tsx';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';
import '@testing-library/jest-dom/vitest';

describe('AutocompleteCountry', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
    appComponent = render(
      <Provider store={store}>
        <AutocompleteCountry
          value=""
          onChange={mockOnChange}
          label="country"
          id="country"
        />
      </Provider>
    );
  });
  let appComponent: RenderResult;
  test('render correctly', () => {
    appComponent.getByLabelText(/country/i);
  });

  test('show list', async () => {
    const input = appComponent.getByLabelText(/country/i);

    fireEvent.change(input, { target: { value: 'ru' } });

    await waitFor(() => {
      expect(appComponent.getByText('Russia')).toBeInTheDocument();
    });
  });

  test('call onChange', async () => {
    const input = appComponent.getByLabelText('country');
    fireEvent.change(input, { target: { value: 'ger' } });

    await waitFor(() => {
      expect(appComponent.getByText('Germany')).toBeInTheDocument();
    });

    fireEvent.mouseDown(appComponent.getByText('Germany'));

    expect(mockOnChange).toHaveBeenCalledWith('Germany');
  });
});
