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
      <h2 className="text-2xl font-bold mb-4">User Courses Table</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th>Teacher Name</th>
              <th>Teacher Email</th>
              <th>Title</th>
              <th>Enrollment Date</th>
              <th>Price</th>
              <th>Completion Status</th>
              <th>Category List</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {data && data.length > 0 ? (
              data.map((course, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td>
                    {course.userDto?.firstName} {course.userDto?.lastName}
                  </td>
                  <td>{course.userDto?.email}</td>
                  <td>{course.courseDto?.title}</td>
                  <td>
                    {new Date(course.enrollmentDate).toLocaleDateString()}
                  </td>
                  <td>{course.courseDto?.price}</td>
                  <td>{course.completionStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-3 px-6 text-center">
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
