import React from "react";
import { UserCourse } from "../../domain/entities/UserCourse";

interface GetUserCourseCompProps {
    data: UserCourse[] | undefined;
   
  }

  interface CategoryMapingDTO {
    name: string;
  }
  
const GetUserCourseComp:React.FC<GetUserCourseCompProps> = ({
    data
}) => {
    const formatCategoryList = (categoryList: any) => {
        if (Array.isArray(categoryList)) {
          return categoryList.map((category) => {
            if (typeof category === "object" && category !== null && "categoryName" in category) {
              return category.categoryName;
            }
            return category;
          }).join(', ');
        }
        return categoryList.toString();
      };
    return(
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
        {data && data.map((course, index) => (
        <tr key={index}>
        <td>{course.teacherName}</td>
        <td>{course.teacherEmail}</td>
        <td>{course.title}</td>
        <td>{new Date(course.enrollmentDate).toLocaleDateString()}</td>
        <td>{course.price}</td>
        <td>{course.completionStatus}</td>
        <td>{formatCategoryList(course.categoryList)}</td>
      </tr>
        ))}
      </tbody>
    </table>
    );
}
export default GetUserCourseComp;