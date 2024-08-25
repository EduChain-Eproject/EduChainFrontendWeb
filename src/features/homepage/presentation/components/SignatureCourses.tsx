import React, { useState } from 'react';
import Course from '../../../../common/entities/Course';



interface Props {
  courses: Course[];
}



const SignatureCourses: React.FC<Props> = ({ courses }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 3;
  const totalSlides = Math.ceil(courses.length / itemsPerPage);

  const handlePrevClick = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

  const handleNextClick = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === totalSlides - 1 ? 0 : prevSlide + 1
    );
  };

  // Calculate the index range for the current slide
  const startIndex = currentSlide * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, courses.length);

  const currentCourses = courses.slice(startIndex, endIndex);
  return (
    <div className="signature-courses py-8 relative">
      <h2 className="text-3xl font-bold mb-4 text-center">Signature Courses</h2>
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${(currentSlide * 100) / totalSlides}%)` }}
        >
          {courses.map((course) => (
            <div
              key={course.id}
              className="course-card p-4 bg-white shadow-xl rounded-lg transform transition hover:scale-105 hover:shadow-2xl mx-2"
              style={{
                flex: `0 0 ${100 / itemsPerPage}%`, // Ensure each item takes up a fraction of the container width
                maxWidth: `calc(${100 / itemsPerPage}% - 1rem)`, // Adjust max-width with margin
              }}
            >
              <h3 className="text-xl font-semibold mb-2 text-center">{course.title}</h3>
              <p className="text-gray-700 mb-3 text-center text-sm">{course.description}</p>
            </div>
          ))}
        </div>
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-10 hover:bg-gray-100 transition"
          onClick={handlePrevClick}
        >
          &lt;
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-10 hover:bg-gray-100 transition"
          onClick={handleNextClick}
        >
          &gt;
        </button>
      </div>
    </div>
  );
  
  
  
};

export default SignatureCourses;