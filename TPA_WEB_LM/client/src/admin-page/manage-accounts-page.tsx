import { useState } from "react";
import { TableContainer } from "../components/wrapper/table-container";
import { IUser } from "../interfaces/user-interface";
import useGetAllUser from "../hooks/use-get-users";
import Loading from "../components/wrapper/loading";
import { SubTitle } from "../components/wrapper/subtitle";
import Service from "../utils/service";
import Paths from "../enums/api-paths";
import { Method } from "../enums/method-enum";
import Modal from "../components/hotels/modal";
import BuyNow from "../components/flights/buy-now-flight";
import SendEmail from "./send-email";
import Button from "../components/wrapper/button";


export default function ManageAccounts () {
    const { users, isLoading, setChange, change } = useGetAllUser()
    const service = new Service()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const clickHandle = (user : IUser) => {
        const result = confirm(`Are you sure, you want to ${(user.Banned == false) ? 'BAN' : 'UNBANNED'} ${user.Email}`)
        if(result) {
            service.request({
                url: Paths.BAN_HANDLE_USER,
                method: Method.PATCH
            }, user.ID).then((result) => {
                if(result.message === 'success') setChange(change + 1)
            })
        }
    }
    return (
        <div className="center flex-col">
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
                                        {user.Banned == false ? <h2 className="red hover-effects">BAN</h2> : <h2 className="green hover-effects">UNBANNED</h2>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        
                    </table> 
                }
                
            </TableContainer>
            <div className="center w-25per mb-3 mt-1">
                <Button onClick={openModal}>Send Email</Button>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>   
                    <SendEmail></SendEmail>
            </Modal> 
        </div>
        
    )
}
