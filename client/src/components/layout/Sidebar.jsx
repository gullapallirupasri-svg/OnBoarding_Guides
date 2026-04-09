import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Wand2, BookTemplate, FolderOpen, Sparkles, Users } from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/generator', label: 'Generate Guide', icon: Wand2 },
  { to: '/templates', label: 'Templates', icon: BookTemplate },
  { to: '/manager', label: 'Manager View', icon: Users },
];

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-[calc(100vh-4rem)] bg-surface-950/50 border-r border-surface-800/50 p-4 pt-6">
      {/* Quick Action */}
      <NavLink
        to="/generator"
        className="flex items-center gap-3 px-4 py-3 mb-6 rounded-xl bg-gradient-to-r from-primary-600/20 to-purple-600/20 border border-primary-500/20 text-primary-300 hover:border-primary-500/40 transition-all group"
      >
        <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
        <span className="font-medium text-sm">New Guide</span>
      </NavLink>

      {/* Nav Links */}
      <nav className="space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                  : 'text-surface-400 hover:text-surface-200 hover:bg-surface-800/50'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-surface-800/50">
        <div className="glass-card p-4">
          <p className="text-xs text-surface-500 mb-1">Powered by</p>
          <p className="text-sm font-semibold gradient-text">Groq & NVIDIA NIM</p>
          <p className="text-xs text-surface-600 mt-1">LLaMA 3.1 Models</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
