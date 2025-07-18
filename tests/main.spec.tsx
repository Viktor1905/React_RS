import '@testing-library/jest-dom/vitest';
import { beforeEach, describe, expect } from 'vitest';
import { render, RenderResult } from '@testing-library/react';
import { Main } from '../src/components/Main/Main';
import { arrLuffy, arrZoro, emptyArr } from './test-utils/arrays-for-test';

describe('Main component', (): void => {
  let mainComponent: RenderResult;
  beforeEach((): void => {
    mainComponent = render(<Main result={arrLuffy} loading={false} />);
  });
  test('should render main', (): void => {
    expect(mainComponent.getByRole('main')).toBeInTheDocument();
  });
  test('render has list', (): void => {
    expect(mainComponent.getByRole('list')).toBeInTheDocument();
  });
  test('should render is No data', (): void => {
    mainComponent = render(<Main result={emptyArr} loading={false} />);
    expect(mainComponent.getByText('No data')).toBeInTheDocument();
  });
  test('should render spinner', (): void => {
    mainComponent = render(<Main result={arrLuffy} loading={true} />);
    const { container } = mainComponent;
    const spinner: Element = container.querySelector(`[class*="spinner"]`);
    expect(spinner).toBeInTheDocument();
  });
  test.fails('should render another array', (): void => {
    const newMainComponent = render(<Main result={arrZoro} loading={false} />);
    expect(mainComponent).toEqual(newMainComponent);
  });
});
