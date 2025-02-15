import React from 'react';

interface FooterProps { }

const Footer: React.FC<FooterProps> = () => {
    return (
        <footer className="bg-black text-white py-8 mt-16">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <p className="text-sm">
                        © 2024 Maxcoach. All Rights Reserved
                    </p>
                    <p className="text-xs mt-2">
                        https://maxcoach.jamstacktemplates.dev/#!
                    </p>
                </div>
                <div className="flex space-x-4">
                    <a href="#" className="hover:text-gray-300">
                        f
                    </a>
                    <a href="#" className="hover:text-gray-300">
                        t
                    </a>
                    <a href="#" className="hover:text-gray-300">
                        i
                    </a>
                    <a href="#" className="hover:text-gray-300">
                        in
                    </a>
                </div>
            </div>
        </footer>
    );
};
export default Footer;