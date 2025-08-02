import '@testing-library/jest-dom/vitest';
import { beforeEach, describe, test } from 'vitest';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { ErrorBtn } from '../src/components/Error/ErrorBtn';

describe('errorBtn component', (): void => {
  let btn: RenderResult;
  beforeEach((): void => {
    btn = render(<ErrorBtn />);
  });
  test('should render btn', (): void => {
    expect(btn.getByRole('button', { name: 'Error' }));
  });
  test('btn should throw error with correct text', (): void => {
    const clickBtn: HTMLElement = btn.getByRole('button', { name: 'Error' });
    expect((): boolean => fireEvent.click(clickBtn)).toThrow(
      'Test error from the button'
    );
  });
});
