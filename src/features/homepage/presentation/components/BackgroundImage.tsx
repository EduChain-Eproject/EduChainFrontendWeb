import React from 'react';

const BackgroundImage: React.FC = () => (
    <div className="relative w-full h-screen">
        <img src="https://habitatbroward.org/wp-content/uploads/2020/01/10-Benefits-Showing-Why-Education-Is-Important-to-Our-Society.jpg" alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>
);

export default BackgroundImage;
