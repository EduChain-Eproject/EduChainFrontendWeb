import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaPinterestP, FaTiktok, FaSnapchatGhost } from 'react-icons/fa';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
    return (
        <footer className="bg-black text-white py-8 mt-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    
                    {/* About Us Section */}
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-bold mb-4">About Us</h3>
                        <p className="text-sm mb-4">
                            We are EduChain, committed to providing the best educational resources and services. Our mission is to empower learners and educators by offering high-quality courses and support.
                        </p>
                        <p className="text-sm mb-2">
                            <strong>Phone Number:</strong> 0982919299
                        </p>
                        <p className="text-sm">
                            <strong>Email:</strong> <a href="mailto:educhain@edu.vn" className="text-blue-400 hover:underline">educhain@edu.vn</a>
                        </p>
                    </div>

                    {/* Quick Links Section 1 */}
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-sm hover:text-gray-300">Home</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-gray-300">About</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-gray-300">Services</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-gray-300">Contact</a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links Section 2 */}
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-bold mb-4">More Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-sm hover:text-gray-300">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-gray-300">Terms of Service</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-gray-300">FAQs</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-gray-300">Help Center</a>
                            </li>
                        </ul>
                    </div>

                    {/* Follow Us Section */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
                            <div className="flex space-x-4">
                                <a href="#" className="hover:text-gray-300 text-xl">
                                    <FaFacebookF />
                                </a>
                                <a href="#" className="hover:text-gray-300 text-xl">
                                    <FaTwitter />
                                </a>
                                <a href="#" className="hover:text-gray-300 text-xl">
                                    <FaInstagram />
                                </a>
                                <a href="#" className="hover:text-gray-300 text-xl">
                                    <FaLinkedinIn />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
