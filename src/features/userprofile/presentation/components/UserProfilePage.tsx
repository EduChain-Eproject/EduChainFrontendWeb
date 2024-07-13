import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../../common/context/store";
import { useEffect } from "react";
import { getUserProfileAction } from "../redux/UserProfileAction";
import React from "react";


const UserProfilePage:React.FC = () => {
    const { data } = useAppSelector((state)=> state.userProfile.profilePage)
    console.log(data);
    return (
        <div>
           {data && (
            <>
                 <h2>User Profile</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Avatar Path</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{data.id}</td>
                        <td>{data.email}</td>
                        <td>{data.password}</td>
                        <td>{data.firstName}</td>
                        <td>{data.lastName}</td>
                        <td>{data.phone}</td>
                        <td>{data.address}</td>
                        <td><img src={data.avatarPath} alt="" width="100px" height="200px" /></td>
                    </tr>
                </tbody>
            </table>
            </>
           )} 
        </div>
    )
}

export default UserProfilePage;