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
import { UncontrolledForm } from '../components/UncontrolledForm/UncontrolledForm.tsx';

vi.mock('../components/ControlledForm/ControlledForm.tsx', () => ({
  toBase64: vi.fn().mockResolvedValue({
    base64: 'test-base64-string',
    fileName: 'test.png',
    fileType: 'image/png',
  }),
}));
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
describe('Rendering UncontrolledForm', (): void => {
  let appComponent: RenderResult;
  beforeEach((): void => {
    appComponent = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const button = appComponent.getByRole('button', {
      name: 'Open uncontrolled form',
    });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });
  test('renders form correctly', () => {
    expect(appComponent.getByTestId('uncontrolled-form')).toBeInTheDocument();
    expect(appComponent.getByText('Uncontrolled form')).toBeInTheDocument();
    expect(appComponent.getByLabelText(/name/i)).toBeInTheDocument();
    expect(appComponent.getByLabelText(/email/i)).toBeInTheDocument();
    expect(appComponent.getByLabelText('Password:')).toBeInTheDocument();
    expect(appComponent.getByText('Gender:')).toBeInTheDocument();
    expect(appComponent.getByLabelText(/country/i)).toBeInTheDocument();
    expect(
      appComponent.getByLabelText('Password confirmation:')
    ).toBeInTheDocument();
  });
  test('form submitted', async (): Promise<void> => {
    fireEvent.change(appComponent.getByLabelText(/name/i), 'John');
    fireEvent.change(appComponent.getByLabelText(/age/i), '25');
    fireEvent.change(appComponent.getByLabelText(/email/i), 'john@example.com');
    const maleGender = appComponent.getByText('male');
    fireEvent.click(maleGender);
    const termsCheckbox = appComponent.getByLabelText(
      /accept terms and conditions/i
    );
    fireEvent.change(termsCheckbox);
    const countryInput = appComponent.getByLabelText(/country/i);
    fireEvent.change(countryInput, {
      target: { value: validFormData.country },
    });
    fireEvent.change(appComponent.getByLabelText('Password:'), 'ValidPass123!');
    fireEvent.change(
      appComponent.getByLabelText('Password confirmation:'),
      'ValidPass123!'
    );
    const fileInput = appComponent.getByLabelText(/upload file/i);
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    const submitButton = appComponent.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(appComponent.queryByTestId('uncontrolled-form')).not.toBeNull();
      },
      { timeout: 1000 }
    );
  });
});

describe('UncontrolledForm submit logic', () => {
  const closeWindow = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('successful file submission triggers dispatch with data', async () => {
    const { getByLabelText, getByRole } = render(
      <Provider store={store}>
        <UncontrolledForm closeWindow={closeWindow} whichOpen="test" />
      </Provider>
    );

    fireEvent.change(getByLabelText(/name/i), { target: { value: 'John' } });
    fireEvent.change(getByLabelText(/age/i), { target: { value: '25' } });
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'john@test.com' },
    });
    fireEvent.change(getByLabelText(/^password\s*:?$/i), {
      target: { value: 'ValidPass123!' },
    });
    fireEvent.change(getByLabelText(/password confirmation/i), {
      target: { value: 'ValidPass123!' },
    });

    const file = new File(['content'], 'test.png', { type: 'image/png' });
    fireEvent.change(getByLabelText(/upload file/i), {
      target: { files: [file] },
    });

    const submitBtn = getByRole('button', { name: /submit/i });
    fireEvent.click(submitBtn);
  });

  test('if a validation error occurs, it returns errors in fieldErrors', async () => {
    const { getByRole, findByText } = render(
      <Provider store={store}>
        <UncontrolledForm closeWindow={closeWindow} whichOpen="test" />
      </Provider>
    );

    const submitBtn = getByRole('button', { name: /submit/i });
    fireEvent.click(submitBtn);

    expect(await findByText(/name/i)).toBeInTheDocument();
  });
});
