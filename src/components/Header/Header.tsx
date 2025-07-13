import styles from '@/components/Header/styles/header.module.css';
import { type ChangeEvent, Component, type FormEvent, type ReactElement } from 'react';

export class Header extends Component<
  { onSearch: (q: string) => void },
  { query: string }
> {
  constructor(props: { onSearch: (q: string) => void }) {
    super(props);
    this.state = { query: localStorage.getItem('query') || '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ query: event.target.value });
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    localStorage.setItem('query', this.state.query);
    this.props.onSearch(this.state.query);
  }
  render(): ReactElement {
    return (
      <header onSubmit={this.handleSubmit}>
        <h1>Search anime character</h1>
        <form className={styles.form}>
          <input
            placeholder="What you search?"
            className={styles.input}
            value={this.state.query}
            onChange={this.handleChange}
          />
          <button type="submit" className={styles.button}>
            Search
          </button>
        </form>
      </header>
    );
  }
}
