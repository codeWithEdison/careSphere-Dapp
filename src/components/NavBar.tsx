import  { useState } from 'react';
import { Menu, X, Heart, FileText, Shield, UserPlus, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useWeb3 } from '../contexts/Web3Context';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { account, connectWallet, disconnectWallet, isLoading } = useWeb3();

  const links = [
    { path: '/', label: 'Home', icon: Heart },
    { path: '/add-doctor', label: 'Add Doctor', icon: UserPlus },
    { path: '/records', label: 'Records', icon: FileText },
    { path: '/access', label: 'Access Control', icon: Shield },
  ];

  const isActive = (path: string) => location.pathname === path;

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-primary">CareSphere</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {links.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center text-gray-700 hover:text-primary px-3 py-2 rounded-md
                  ${isActive(path) ? 'text-primary font-medium' : ''}`}
              >
                <Icon className="h-5 w-5 mr-1" />
                {label}
              </Link>
            ))}
            
            {account ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {shortenAddress(account)}
                </span>
                <button 
                  onClick={disconnectWallet}
                  className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Disconnect
                </button>
              </div>
            ) : (
              <button 
                onClick={connectWallet}
                disabled={isLoading}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary disabled:opacity-50"
              >
                {isLoading ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center text-gray-700 hover:text-primary px-3 py-2 rounded-md
                  ${isActive(path) ? 'text-primary font-medium' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="h-5 w-5 mr-1" />
                {label}
              </Link>
            ))}
            
            {account ? (
              <div className="space-y-2 px-3 py-2">
                <div className="text-sm text-gray-600">
                  {shortenAddress(account)}
                </div>
                <button 
                  onClick={disconnectWallet}
                  className="w-full flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Disconnect
                </button>
              </div>
            ) : (
              <button 
                onClick={connectWallet}
                disabled={isLoading}
                className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mt-2 disabled:opacity-50"
              >
                {isLoading ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;