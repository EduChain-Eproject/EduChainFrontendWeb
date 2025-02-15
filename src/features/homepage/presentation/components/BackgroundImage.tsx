import React from 'react';

const BackgroundImage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative w-full h-screen overflow-hidden">
    <img
      src="https://habitatbroward.org/wp-content/uploads/2020/01/10-Benefits-Showing-Why-Education-Is-Important-to-Our-Society.jpg"
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover z-0"
    />
    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10 p-6">
      {children}
    </div>
  </div>
);
  
export default BackgroundImage;
