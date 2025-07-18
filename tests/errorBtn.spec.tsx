import '@testing-library/jest-dom/vitest';
import { beforeEach, describe, test } from 'vitest';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { ErrorBtn } from '../src/components/Error/ErrorBtn';

describe('errorBtn component', () => {
  let btn: RenderResult;
  beforeEach(() => {
    btn = render(<ErrorBtn />);
  });
  test('should render btn', () => {
    expect(btn.getByRole('button', { name: 'Error' }));
  });
  test('btn should throw error with correct text', () => {
    const clickBtn = btn.getByRole('button', { name: 'Error' });
    expect(() => fireEvent.click(clickBtn)).toThrow(
      'Test error from the button'
    );
  });
});
