import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { InputControlled } from '../components/ControlledForm/Elements/InputControlled.tsx';

describe('InputControlled without jest-dom', () => {
  const mockRegister = {
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: vi.fn(),
    name: 'upload file',
  };
  test('should show error message', () => {
    const errorText = 'File is required';

    render(
      <InputControlled
        label="upload file"
        password={false}
        register={mockRegister}
        errorMessage={errorText}
      />
    );
    const errorElement = screen.getByText(errorText);
    expect(errorElement).toBeDefined();
    expect(errorElement.textContent).toBe(errorText);
  });

  test('should not show error when undefined', () => {
    const { container } = render(
      <InputControlled
        label="upload file"
        password={false}
        register={mockRegister}
        errorMessage={undefined}
      />
    );

    const errorElements = container.querySelectorAll('.error');
    expect(errorElements.length).toBe(0);
  });
});
