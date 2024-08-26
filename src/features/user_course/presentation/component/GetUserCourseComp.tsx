import React from 'react';
import UserCourse from '../../../../common/entities/UserCourse';

interface GetUserCourseCompProps {
  data: UserCourse[] | undefined;
}

const GetUserCourseComp: React.FC<GetUserCourseCompProps> = ({ data }) => {
  const formatCategoryList = (categoryList: any) => {
    if (Array.isArray(categoryList)) {
      return categoryList
        .map((category) => {
          if (
            typeof category === 'object' &&
            category !== null &&
            'categoryName' in category
          ) {
            return category.categoryName;
          }
          return category;
        })
        .join(', ');
    }
    return categoryList.toString();
  };

  return (
<div className="container mx-auto mt-8">
  <h2 className="text-3xl font-extrabold mb-6">User Courses Table</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
      <thead className="bg-gray-100 text-gray-700 uppercase text-lg font-semibold">
        <tr>
          <th className="py-4 px-6 text-left">Teacher Name</th>
          <th className="py-4 px-6 text-left">Teacher Email</th>
          <th className="py-4 px-6 text-left">Title</th>
          <th className="py-4 px-6 text-left">Enrollment Date</th>
          <th className="py-4 px-6 text-left">Price</th>
          <th className="py-4 px-6 text-left">Completion Status</th>
        </tr>
      </thead>
      <tbody className="text-gray-700 text-lg">
        {data && data.length > 0 ? (
          data.map((course, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="py-4 px-6">
                {course.userDto?.firstName} {course.userDto?.lastName}
              </td>
              <td className="py-4 px-6">{course.userDto?.email}</td>
              <td className="py-4 px-6">{course.courseDto?.title}</td>
              <td className="py-4 px-6">
                {new Date(course.enrollmentDate).toLocaleDateString()}
              </td>
              <td className="py-4 px-6">{course.courseDto?.price}</td>
              <td className="py-4 px-6">{course.completionStatus}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className="py-4 px-6 text-center text-gray-500 text-lg">
              No courses found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>


  );
};

export default GetUserCourseComp;
