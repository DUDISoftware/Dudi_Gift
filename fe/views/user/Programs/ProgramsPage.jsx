import React from 'react';
import { Outlet } from 'react-router-dom';
import Program from '../Home/Program';
import ProgramBanner from './ProgramBanner';
import DonationSteps from './DonationSteps';
import ProgramIntro from './ProgramIntro';

const ProgramsPage = () => {
  return (
    <div className="bg-[#E8F5E9] min-h-screen">
      <ProgramBanner />
      <ProgramIntro/>
      <div className="px-4 md:px-12">
        <Program />
      </div>
      <DonationSteps />
      <Outlet />
    </div>
  );
};

export default ProgramsPage;
