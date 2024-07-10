import React, { useEffect } from "react";
import { RouteObject, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../common/context/store";
import { getUserProfileAction } from "../../../userprofile/presentation/redux/UserProfileAction";
import { fetchDeleteUserInterest, fetchUserInterests } from "../redux/UserInterestAction";
import GetUserInterestComp from "../component/GetUserInterestComp";
import { DeleteUserInterestRes } from "../../domain/usecase/DeleteUserInterestUseCase";



export const route:() => RouteObject = () => {
    return {
        path:"",
        element:<UserInterestsPage/>
    }
}
const UserInterestsPage: React.FC = () => {
    const { data, status, error } = useAppSelector(state => state.userInterest.userInterests);
    const dispatch = useAppDispatch();

    useEffect(() => { 
            dispatch(fetchUserInterests());    
    }, [dispatch ]);

    const handleDelete = async (courseId: number, studentId: number) => {
        try {
          const deletedInterest: DeleteUserInterestRes = {
            course_id: courseId,
            student_id: studentId,
          };
          await dispatch(fetchDeleteUserInterest(deletedInterest));
          dispatch(fetchUserInterests());
          console.log(deletedInterest);
        } catch (error) {
          console.error('Failed to delete user interest:', error);
        }
      };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>User Interests</h1>
            {data && data.map(interest => (
                <div key={interest.course_id}>
                    <h2> title: {interest.title}</h2>
                </div>
            ))}
                <GetUserInterestComp data={data!} onDelete={handleDelete} />
        </div>
    );
};


export default UserInterestsPage;