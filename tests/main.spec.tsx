import '@testing-library/jest-dom/vitest';
import { beforeEach, describe, expect } from 'vitest';
import { render, RenderResult } from '@testing-library/react';
import { Main } from '../src/components/Main/Main';
import { arrLuffy, arrZoro, emptyArr } from './test-utils/arrays-for-test';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from '../src/app/store';

describe('Main component', (): void => {
  let mainComponent: RenderResult;
  beforeEach((): void => {
    mainComponent = render(
      <MemoryRouter>
        <Provider store={store}>
          <Main result={arrLuffy} loading={false} />
        </Provider>
      </MemoryRouter>
    );
  });
  test('should render main', (): void => {
    expect(mainComponent.getByRole('main')).toBeInTheDocument();
  });
  test('render has list', (): void => {
    expect(mainComponent.getByRole('list')).toBeInTheDocument();
  });
  test('should render is No data', (): void => {
    mainComponent = render(
      <MemoryRouter>
        <Provider store={store}>
          <Main result={emptyArr} loading={false} />)
        </Provider>
      </MemoryRouter>
    );
    expect(mainComponent.getByText('No data')).toBeInTheDocument();
  });
  test('should render spinner', (): void => {
    mainComponent = render(
      <MemoryRouter>
        <Provider store={store}>
          <Main result={arrLuffy} loading={true} />
        </Provider>
      </MemoryRouter>
    );
    const spinner: Element = mainComponent.getByTestId(`load-spinner-main`);
    expect(spinner).toBeInTheDocument();
  });
  test.fails('should render another array', (): void => {
    const newMainComponent = render(
      <MemoryRouter>
        <Main result={arrZoro} loading={false} />
      </MemoryRouter>
    );
    expect(mainComponent).toEqual(newMainComponent);
  });
});
