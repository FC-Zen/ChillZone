import Avatar from '@atoms/Avatar';
import { Settings } from 'lucide-react';

type HeaderProps = {
  userName: string;
  userEmail: string;
  organization: string;
};

const Header = ({ userName, userEmail, organization }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center p-6 bg-white shadow-sm">
      <div>
        <h1 className="text-xl font-semibold">Bonjour, {userName}</h1>
        <p className="text-sm text-gray-500">{organization}</p>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-gray-500">{userEmail}</p>
          </div>
          <Avatar alt={userName} size="md" />
        </div>
      </div>
    </div>
  );
};

export default Header;