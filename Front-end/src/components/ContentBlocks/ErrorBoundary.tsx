// ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';
import SWWIcon from '../../assets/SomethinngWentWrongIcon.svg';
import DashboardIcon from '../../assets/outline/component_type/DashboardIcon';

interface Props {
  children: ReactNode;
  navigate?: (path: string) => void;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#F9FAFF]">
          <img
            src={SWWIcon}
            className="w-45 h-45"
            alt="Something went wrong icon"
          />
          <div className="flex flex-col gap-5 w-2/6 items-center">
            <h3 className="mt-4 text-xl">Something went wrong</h3>
            <p className="text-body-base-reg text-nt-700 text-center">
              We’re already fixing the problem, it might take a moment. Thanks
              for your patience!
            </p>
            <a
              href="/home"
              className="flex flex-row gap-2 secondary-btn base-btn bg-white"
            >
              <DashboardIcon color="#0046FA" />
              <p className="text-body-base-str">Go to Dashboard</p>
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
