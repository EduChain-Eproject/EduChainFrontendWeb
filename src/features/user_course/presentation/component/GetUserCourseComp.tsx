import React from "react";
import { UserCourse } from "../../domain/entities/UserCourse";


interface GetUserCourseCompProps {
    data: UserCourse[] | undefined;
}

const GetUserCourseComp: React.FC<GetUserCourseCompProps> = ({ data }) => {
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

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">User Courses Table</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left font-semibold">O/D</th>
                            <th className="py-3 px-6 text-left font-semibold">Teacher Name</th>
                            <th className="py-3 px-6 text-left font-semibold">Teacher Email</th>
                            <th className="py-3 px-6 text-left font-semibold">Title</th>
                            <th className="py-3 px-6 text-left font-semibold">Enrollment Date</th>
                            <th className="py-3 px-6 text-left font-semibold">Price</th>
                            <th className="py-3 px-6 text-left font-semibold">Completion Status</th>
                            <th className="py-3 px-6 text-left font-semibold">Category List</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {data && data.length > 0 ? (
                            data.map((course, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                                    <td className="py-3 px-6 text-left">{course.teacherName}</td>
                                    <td className="py-3 px-6 text-left">{course.teacherEmail}</td>
                                    <td className="py-3 px-6 text-left">{course.title}</td>
                                    <td className="py-3 px-6 text-left">{new Date(course.enrollmentDate).toLocaleDateString()}</td>
                                    <td className="py-3 px-6 text-left">{course.price}</td>
                                    <td className="py-3 px-6 text-left">{course.completionStatus}</td>
                                    <td className="py-3 px-6 text-left">{formatCategoryList(course.categoryList)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="py-3 px-6 text-center">No courses found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GetUserCourseComp;
