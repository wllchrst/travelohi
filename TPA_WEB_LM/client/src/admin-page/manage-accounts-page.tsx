import { useState } from "react";
import { TableContainer } from "../components/wrapper/table-container";
import { IUser } from "../interfaces/user-interface";
import useGetAllUser from "../hooks/use-get-users";
import Loading from "../components/wrapper/loading";
import { SubTitle } from "../components/wrapper/subtitle";
import Service from "../utils/service";
import Paths from "../enums/api-paths";
import { Method } from "../enums/method-enum";


export default function ManageAccounts () {
    const { users, isLoading } = useGetAllUser()
    const service = new Service()

    const clickHandle = (user : IUser) => {
        const result = confirm(`Are you sure, you want to ${(user.Banned == 'false') ? 'BAN' : 'UNBANNED'} ${user.Email}`)
        if(result) {
            service.request({
                url: Paths.BAN_HANDLE_USER,
                method: Method.PATCH
            }, user.ID).then((result) => {
                if(result.message === 'success') window.location.reload()
            })
        }
    }
    return (
        <TableContainer>
            {isLoading ? <Loading></Loading> : 
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.FirstName} {user.LastName}</td>
                                <td>{user.Email}</td>
                                <td>{user.Role}</td>
                                <td className="center " onClick={() => clickHandle(user)}>
                                    {user.Banned == 'false' ? <h2 className="red hover-effects">BAN</h2> : <h2 className="green hover-effects">UNBANNED</h2>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    
                </table> 
            }
        </TableContainer>
    )
}
