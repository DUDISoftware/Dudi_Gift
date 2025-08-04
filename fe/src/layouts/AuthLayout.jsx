import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion ,AnimatePresence } from 'framer-motion';
import Logo from '../../src/assets/img/logo_1.png';

const AuthLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const fadeVariant = {
    hidden: { opacity: 0, x: isLoginPage ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: isLoginPage ? 50 : -50, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoginPage ? (
          <>
            <motion.div
              key="loginForm"
              className="w-full md:w-1/2 flex items-center justify-center bg-white px-4 py-6"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeVariant}
            >
              <Outlet />
            </motion.div>
            <motion.div
              key="loginLogo"
              className="hidden md:flex md:w-1/2 flex-col items-center justify-center bg-[#E8F5E9] p-6 text-center"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeVariant}
            >
              <img src={Logo} alt="Logo" className="w-90 mb-4" />
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              key="registerLogo"
              className="hidden md:flex md:w-1/2 flex-col items-center justify-center bg-[#E8F5E9] p-6 text-center"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeVariant}
            >
              <img src={Logo} alt="Logo" className="w-90 mb-4" />
            </motion.div>
            <motion.div
              key="registerForm"
              className="w-full md:w-1/2 flex items-center justify-center bg-white px-4 py-6"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeVariant}
            >
              <Outlet />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthLayout;
