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
    <table>
      <thead>
        <tr>
          <th>Teacher Name</th>
          <th>Teacher Email</th>
          <th>Title</th>
          <th>Enrollment Date</th>
          <th>Price</th>
          <th>Completion Status</th>
          <th>Category List</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((course, index) => (
            <tr key={index}>
              <td>
                {course.userDto?.firstName} {course.userDto?.lastName}
              </td>
              <td>{course.userDto?.email}</td>
              <td>{course.courseDto?.title}</td>
              <td>{new Date(course.enrollmentDate).toLocaleDateString()}</td>
              <td>{course.courseDto?.price}</td>
              <td>{course.completionStatus}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
export default GetUserCourseComp;
