import { vi, expect, beforeEach, describe, test } from 'vitest';
import {
  fireEvent,
  render,
  type RenderResult,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';
import App from '../App.tsx';
import { testFile, validFormData } from './formData.ts';

vi.mock('../../utils/useEffectFunction.ts', () => ({
  effectFunction: vi.fn(),
}));

vi.mock('../../utils/toBase64.ts', () => ({
  toBase64: vi.fn().mockResolvedValue({
    base64:
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    fileName: 'test.png',
    fileType: 'image/png',
  }),
}));

vi.mock('../../store/slice/controlledSlice.ts', () => ({
  setSubmittedData: vi.fn(),
}));
describe('Rendering ControlledForm', (): void => {
  let appComponent: RenderResult;
  beforeEach((): void => {
    appComponent = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const button = appComponent.getByRole('button', {
      name: 'Open controlled form',
    });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });
  test('renders form correctly', () => {
    expect(appComponent.getByTestId('controlled-form')).toBeInTheDocument();
    expect(appComponent.getByText('Controlled form')).toBeInTheDocument();
    expect(appComponent.getByText(/name/i)).toBeInTheDocument();
    expect(appComponent.getByText(/email/i)).toBeInTheDocument();
    expect(appComponent.getByText('Password:')).toBeInTheDocument();
    expect(appComponent.getByText('Gender:')).toBeInTheDocument();
    expect(appComponent.getByLabelText(/country/i)).toBeInTheDocument();
    expect(
      appComponent.getByText('Password confirmation:')
    ).toBeInTheDocument();
  });
  test('form submitted', async (): Promise<void> => {
    const nameInput = appComponent.getByRole('textbox', { name: 'name' });
    const emailInput = appComponent.getByRole('textbox', { name: /email/i });
    const ageInput = appComponent.getByRole('spinbutton', { name: /age/i });
    const passwordInput = appComponent.getByLabelText('password');
    const confirmPasswordInput = appComponent.getByLabelText(
      /password confirmation/i
    );
    const termsInput = appComponent.getByRole('checkbox', {
      name: /accept Terms and Conditions/i,
    });
    const genderInput = appComponent.getByText('Male:');
    const fileInput = appComponent.getByTestId('upload-file');

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(ageInput, { target: { value: '25' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    fireEvent.click(genderInput);
    fireEvent.click(termsInput);
    const countryInput = appComponent.getByLabelText(/country/i);
    fireEvent.change(countryInput, {
      target: { value: validFormData.country },
    });
    fireEvent.change(passwordInput, { target: { value: 'ValidPass123!' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'ValidPass123!' },
    });

    fireEvent.change(fileInput, { target: { files: [testFile] } });
    const submitButton = appComponent.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(appComponent.getByText('John')).toBeInTheDocument();
        expect(appComponent.getByText('25')).toBeInTheDocument();
        expect(appComponent.getByText(/john@example.com/i)).toBeInTheDocument();
        expect(appComponent.getByText(/United States/i)).toBeInTheDocument();
        expect(appComponent.getByText('ValidPass123!')).toBeInTheDocument();
        expect(appComponent.getByText('male')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
});
