import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  hasError: boolean;
  error?: Error;
  setHasError: (hasError: boolean) => void;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps>  {
  static getDerivedStateFromError() {
    return null;
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught in boundary:', error, errorInfo);
    this.props.setHasError(true);
  }

  resetError = () => {
    this.props.setHasError(false);
  };

  render() {
    if (this.props.hasError) {
      return (
        <div>
          <h2>Что-то пошло не так.</h2>
          <button onClick={this.resetError}>Попробовать снова</button>
        </div>
      );
    }
    return this.props.children;
  }
}
