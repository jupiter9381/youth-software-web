import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from './reducers/store';
import { useEffect } from 'react';

// pages
import LoginSignup from './pages/loginSignup';
import Home from './pages/Home';

// Auth
import PageNotFound from './components/ContentBlocks/PageNotFound';
import ErrorBoundary from './components/ContentBlocks/ErrorBoundary';
// import BuggyComponent from "./components/ContentBlocks/BuggyComponent";

const App: React.FC = () => {
  const favicon = useSelector((state: RootState) => state.faviconReducer.icon);

  // for custom favion
  useEffect(() => {
    if (favicon) {
      const setFavicon = (url: string) => {
        const link =
          (document.querySelector("link[rel~='icon']") as HTMLLinkElement) ||
          document.createElement('link');
        link.rel = 'icon';
        link.href = url;
        document.head.appendChild(link);
      };

      // Replace with your online image URL
      setFavicon(favicon);
    }
  }, [favicon]);

  //tab
  // const [activeTab, setActiveTab] = useState<string>("All");
  // const tabs = [
  //     { label: "All", count: 135 },
  //     { label: "Unviewed", count: 3 },
  //     { label: "Missed", count: 4 },
  //     { label: "Unanswered", count: 1 },
  //     { label: "Viewed", count: 127 },
  // ];

  return (
    <>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route index element={<LoginSignup />} />
            {/* <Route path='/buggy' element={<BuggyComponent />} /> */}
            <Route path="*" element={<PageNotFound />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/forgot-password" element={<LoginSignup />} />
            <Route path="/reset-password" element={<LoginSignup />} />
            <Route path="/2FA" element={<LoginSignup />} />
            <Route path="/signup/*" element={<LoginSignup />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
};

export default App;
