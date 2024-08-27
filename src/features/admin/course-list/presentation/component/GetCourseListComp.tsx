import React from "react";
import Course from "../../../../../common/entities/Course";

interface GetCourseListCompProps {
    data: Course[];
  }
  
  const GetCourseListComp: React.FC<GetCourseListCompProps> = ({ data }) => {
    return (
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Course List</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Numb.</th>
                <th className="py-3 px-6 text-left">Avatar</th>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-center">Participated Members</th>
                <th className="py-3 px-6 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100 transition-colors">
                  <td className="py-3 px-6 border-b text-gray-700">{item.id}</td>
                  <td className="py-3 px-6 border-b">
                    <img src={item.avatarPath} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                  </td>
                  <td className="py-3 px-6 border-b text-gray-700">{item.title}</td>
                  <td className="py-3 px-6 border-b text-gray-700">{item.teacherDto?.email}</td>
                  <td className="py-3 px-6 border-b text-center text-gray-700">{item.participatedUserDtos?.length}</td>
                  <td className="py-3 px-6 border-b text-gray-700">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  
  export default GetCourseListComp;
  