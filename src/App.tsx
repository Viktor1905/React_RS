import './App.css';
import { Header } from './components/Header/Header.tsx';
import { Main } from './components/Main/Main.tsx';
import { ErrorBtn } from './components/Error/ErrorBtn.tsx';
import { Component } from 'react';
import { type AnimeCharacterResponse, requestApi } from './api/api.ts';
import { isAnimeCharacterResponse } from './api/isAnimeCharacterArray.ts';
import { ErrorBoundary } from './components/Error/ErrorBoundary.tsx';

interface AppState {
  result: AnimeCharacterResponse | null;
  loading: boolean;
  hasError: boolean;
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
    };
  }
  componentDidMount() {
    this.handleSearch('luffy');
  }

  handleSearch: (query: string) => void = (query: string) => {
    this.setState({ loading: true });
    setTimeout(
      () =>
        requestApi(query).then((data) => {
          localStorage.setItem('result', JSON.stringify(data));
          return this.setState({ result: data, loading: false });
        }),
      1000
    );
  };
  render() {
    return (
      <>
        <ErrorBoundary>
          <Header onSearch={this.handleSearch} />
          <Main result={this.state.result} loading={this.state.loading} />
          <ErrorBtn />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
