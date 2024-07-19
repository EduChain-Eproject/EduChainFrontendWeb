import React, { useEffect } from "react";
import { UserInterest } from "../../domain/entities/UserInterest";
import AppPagination from "../../../../common/components/Pagination/AppPagination";

interface GetUserInterestCompProps {
  data: UserInterest[];
  onDelete: (courseId: number, studentId: number) => void;
 
}
const GetUserInterestComp:React.FC<GetUserInterestCompProps> = ({  data,
  onDelete,

 
}) => {
    return (
        <div>
          <h2>User Interests Table</h2>
          <table>
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Student ID</th>
                <th>Description</th>
                <th>Title</th>
                <th>Price</th>
                <th>Teacher Name</th>
                <th>Category List</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&  data.map((interest) => (
                <tr key={interest.course_id}>
                  <td>{interest.course_id}</td>
                  <td>{interest.student_id}</td>
                  <td>{interest.description}</td>
                  <td>{interest.title}</td>
                  <td>{interest.price}</td>
                  <td>{interest.teacherName}</td>
                  <td>
                    {interest.categoryList.map((category, index) => (
                      <span key={index}>
                        {category.categoryName}
                        {index !== interest.categoryList.length - 1 && ', '}
                      </span>
                    ))}
                  </td>
                    <td>
                    <button onClick={() => onDelete(interest.course_id,interest.student_id)}>Delete</button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <Pagination
          totalPages={totalPage}
          currentPage={currentPage}
          onPageChange={onPageChange} titleSearch={""} setSearch={function (search: string): void {
            throw new Error("Function not implemented.");
          } }      /> */}
        </div>
      );
}
export default GetUserInterestComp;


