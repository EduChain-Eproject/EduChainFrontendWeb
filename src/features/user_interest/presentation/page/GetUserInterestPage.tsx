import React, { useEffect, useState } from "react";
import { RouteObject, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../common/context/store";
import { getUserProfileAction } from "../../../userprofile/presentation/redux/UserProfileAction";
import { fetchDeleteUserInterest, fetchUserInterests } from "../redux/UserInterestAction";
import GetUserInterestComp from "../component/GetUserInterestComp";
import { DeleteUserInterestRes } from "../../domain/usecase/DeleteUserInterestUseCase";
import { User } from "../../../auth/domain/entities/User";
import { UserProfileModel } from "../../../userprofile/domain/entities/UserProfileModel";
import { GetUserInterestReq } from "../../domain/usecase/GetUserInterests UserCase";



export const route:() => RouteObject = () => {
    return {
        path:"",
        element:<UserInterestsPage/>
    }
}
const UserInterestsPage: React.FC = () => {
  const { data, status, error } = useAppSelector(state => state.userInterest.userInterests);
  const dispatch = useAppDispatch();
  const user = useAppSelector(s => s.auth.user);
  const [profileLoaded, setProfileLoaded] = useState<User | null>(null);
  const [interestReqParams, setInterestReqParams] = useState<GetUserInterestReq | null>(null);
  const email = user?.email;
  const id = user?.id;
  const role = user?.role;
   
  useEffect(() => {
    console.log("aaaa")
    if (user) {
      const { email, id } = user;
      if (email && id) {
        const getUserInterestReq: GetUserInterestReq = {
          student_id: id, // Use user_id for fetching user interests
          page: 1,
          size: 3,
          course_id: 0
        };
        setInterestReqParams(getUserInterestReq);
        dispatch(fetchUserInterests(getUserInterestReq));
      }
    }
  }, [dispatch, user]);


    const handleDelete = async (courseId: number, studentId: number) => {
        try {
          const deletedInterest: DeleteUserInterestRes = {
            course_id: courseId,
            student_id: studentId,
          };
          await dispatch(fetchDeleteUserInterest(deletedInterest));
          if (interestReqParams) {
            dispatch(fetchUserInterests(interestReqParams));
          }
          dispatch(fetchUserInterests( interestReqParams!));
          
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
                <GetUserInterestComp data={data!} onDelete={handleDelete} />
        </div>
    );
};


export default UserInterestsPage;