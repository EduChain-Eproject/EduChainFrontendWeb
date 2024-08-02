import React, { useEffect } from 'react';
import AppPagination from '../../../../common/components/Pagination/AppPagination';
import UserInterest from '../../../../common/entities/UserInterest';

interface GetUserInterestCompProps {
  data: UserInterest[];
  onDelete: (courseId: number, studentId: number) => void;
}
const GetUserInterestComp: React.FC<GetUserInterestCompProps> = ({
  data,
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((interest) => (
              <tr key={interest.courseDto?.id}>
                <td>{interest.courseDto?.title}</td>
                <td>{interest.userDto?.email}</td>
                <td>{interest.courseDto?.title}</td>
                <td>{interest.courseDto?.description}</td>
                <td>{interest.courseDto?.price}</td>
                <td>
                  {interest.userDto?.firstName} {interest.userDto?.lastName}
                </td>

                <td>
                  <button
                    onClick={() =>
                      onDelete(
                        interest.courseDto?.id ?? 0,
                        interest.userDto?.id ?? 0,
                      )
                    }
                  >
                    Delete
                  </button>
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
};
export default GetUserInterestComp;
