import React from "react";
import { UserInterest } from "../../domain/entities/UserInterest";
import AppPagination from "../../../../common/components/Pagination/AppPagination";

interface GetUserInterestCompProps {
  data: UserInterest[];
  onDelete: (courseId: number, studentId: number) => void;
}

const GetUserInterestComp: React.FC<GetUserInterestCompProps> = ({ data, onDelete }) => {
  return (
    <div>
      <h2>User Interests Table</h2>
      <table>
        <thead>
          <tr>
            <th>O/N</th> {/* Row number column */}
            <th>Description</th>
            <th>Title</th>
            <th>Price</th>
            <th>Teacher Name</th>
            <th>Category List</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((interest, index) => (
            <tr key={index}>
              <td>{index + 1}</td> {/* Row number */}
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
                <button onClick={() => onDelete(interest.course_id, interest.student_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default GetUserInterestComp;
