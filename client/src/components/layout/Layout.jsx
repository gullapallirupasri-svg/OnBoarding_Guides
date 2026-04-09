import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ showSidebar = true }) => {
  return (
    <div className="min-h-screen bg-surface-950">
      <Navbar />
      <div className="flex pt-16">
        {showSidebar && <Sidebar />}
        <main className={`flex-1 min-h-[calc(100vh-4rem)] ${showSidebar ? '' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
