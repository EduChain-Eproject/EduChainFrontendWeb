import React from 'react';

const BackgroundImage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative w-full h-screen">
    <img
      src="https://habitatbroward.org/wp-content/uploads/2020/01/10-Benefits-Showing-Why-Education-Is-Important-to-Our-Society.jpg"
      alt="Background"
      className="w-full h-full object-cover z-0" // Ensure lower z-index for background
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-10">
      {children}
    </div>
  </div>
);

export default BackgroundImage;
