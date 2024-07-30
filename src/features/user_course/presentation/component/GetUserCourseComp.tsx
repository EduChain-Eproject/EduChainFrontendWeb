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
        <div>
            <h2>User Courses Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>O/D</th>
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
                    {data && data.length > 0 ? (
                        data.map((course, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td> {/* Row number */}
                                <td>{course.teacherName}</td>
                                <td>{course.teacherEmail}</td>
                                <td>{course.title}</td>
                                <td>{new Date(course.enrollmentDate).toLocaleDateString()}</td>
                                <td>{course.price}</td>
                                <td>{course.completionStatus}</td>
                                <td>{formatCategoryList(course.categoryList)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8}>No courses found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default GetUserCourseComp;
