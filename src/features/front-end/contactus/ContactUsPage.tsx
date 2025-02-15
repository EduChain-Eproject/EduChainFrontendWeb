import React from 'react';
import { RouteObject } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export const route: () => RouteObject = () => {
  return { path: "", element: <ContactUsPage /> }
}

const ContactUsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800">Contact Us</h1>
        <p className="text-lg text-gray-600 mt-4">
          We'd love to hear from you! Reach out to us using the form below or through our social media channels.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <Carousel showThumbs={false} autoPlay infiniteLoop>
            <div>
              <img src="https://i.pinimg.com/564x/ae/7b/b5/ae7bb52725ace802fa56b8647203b0fb.jpg" alt="Contact Us" className="w-full h-90 object-cover rounded-lg shadow-lg mb-8" />
            </div>
            <div>
              <img src="https://i.pinimg.com/564x/be/c0/0e/bec00e875fcac13a8aa8a7501267a920.jpg" alt="Office" className="w-full h-90 object-cover rounded-lg shadow-lg mb-8" />
            </div>
            <div>
              <img src="https://i.pinimg.com/564x/6e/20/a9/6e20a92cd3ddf6a282dbc144c5185507.jpg" alt="Team" className="w-full h-90 object-cover rounded-lg shadow-lg mb-8" />
            </div>
          </Carousel>
        </div>
        <div>
          <form className="bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
              <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea id="message" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3}></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
