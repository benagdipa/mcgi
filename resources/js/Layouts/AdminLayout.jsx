import React from 'react';
import { Link } from '@inertiajs/react';
import { FaHome, FaCalendarAlt, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b">
            <Link href="/" className="text-xl font-bold text-primary">
              MCGI Admin
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <FaHome className="w-5 h-5 mr-3" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/events"
                  className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <FaCalendarAlt className="w-5 h-5 mr-3" />
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <FaUsers className="w-5 h-5 mr-3" />
                  Users
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/settings"
                  className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <FaCog className="w-5 h-5 mr-3" />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <Link
              href="/logout"
              method="post"
              as="button"
              className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <FaSignOutAlt className="w-5 h-5 mr-3" />
              Logout
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout; 