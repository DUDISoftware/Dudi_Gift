import React, { useEffect, useState } from 'react';
import { userService } from '../../../src/services/userService';
import MyProfileCard from '../Profile/MyProfileCard';
import EditProfileForm from './EditProfileForm';
import SocialProfileForm from './SocialProfileForm';
import ChangePasswordForm from './ChangePasswordForm';

const AccountSettings = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = userService.getCurrentUser();
    setUser(currentUser);
  }, []);

  if (!user) return null;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 max-w-7xl mx-auto">
      <div className="w-full md:w-[25%]">
        <MyProfileCard user={user} />
      </div>

      <div className="w-full md:w-[75%] space-y-8">
        <EditProfileForm user={user} />
        <SocialProfileForm />
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default AccountSettings;
