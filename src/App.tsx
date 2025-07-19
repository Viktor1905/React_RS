import './App.css';
import { Header } from './components/Header/Header.tsx';
import { Main } from './components/Main/Main.tsx';
import { ErrorBtn } from './components/Error/ErrorBtn.tsx';
import { Component } from 'react';
import { type AnimeCharacterResponse, requestApi } from './api/api.ts';
import { isAnimeCharacterResponse } from './api/isAnimeCharacterArray.ts';
import { ErrorBoundary } from './components/Error/ErrorBoundary.tsx';
import { ErrorPage } from './components/Error/ErrorPage.tsx';

interface AppState {
  result: AnimeCharacterResponse | null;
  loading: boolean;
  hasError: boolean;
  error: Error | null;
}
class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    let storage = localStorage.getItem('result');
    if (storage) {
      storage = JSON.parse(storage);
    }
    if (!isAnimeCharacterResponse(storage)) {
      storage = null;
    }
    this.state = {
      result: storage,
      loading: false,
      hasError: false,
      error: null,
    };
  }
  componentDidMount() {
    if (!localStorage.getItem('result')) this.handleSearch('luffy');
  }

  handleSearch: (query: string) => void = (query: string) => {
    this.setState({ loading: true, error: null });
    setTimeout(
      () =>
        requestApi(query)
          .then((data) => {
            localStorage.setItem('result', JSON.stringify(data));
            return this.setState({ result: data, loading: false });
          })
          .catch((error: unknown): void => {
            this.setState({
              error:
                error instanceof Error ? error : new Error('Unknown error'),
              loading: false,
            });
          }),
      1000
    );
  };
  renderContent() {
    const { result, loading, error } = this.state;

    if (error) {
      return (
        <ErrorPage error={error} onRetry={() => this.handleSearch('luffy')} />
      );
    }

    return <Main result={result} loading={loading} />;
  }
  render() {
    return (
      <>
        <ErrorBoundary>
          <Header onSearch={this.handleSearch} />
          {this.renderContent()}
          <ErrorBtn />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
