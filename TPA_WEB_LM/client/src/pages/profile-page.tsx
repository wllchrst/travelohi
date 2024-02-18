import { useState } from "react";
import { HotelImageDiv } from "../components/wrapper/DivForImage";
import { FlexGap } from "../components/wrapper/FlexGap";
import { Container } from "../components/wrapper/container";
import { GreenButton } from "../components/wrapper/green-button";
import { useUserAuth } from "../contexts/user-context";
import Modal from "../components/hotels/modal";
import UpdateUserInformation from "../components/user/update-user-information";
import { dateConvert } from "../game/util";
import { RedButton } from "../components/wrapper/red-button";
import useUserLogout from "../hooks/use-logout";
import Button from "../components/wrapper/button";
import { BlueButton } from "../components/wrapper/blue-button";
import Service from "../utils/service";
import Paths from "../enums/api-paths";
import { Method } from "../enums/method-enum";
import AddCreditCard from "../components/user/add-credit-cart-information";

export default function ProfilePage () {
    const { user } = useUserAuth()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [secondModal, setSecondModal] = useState(false);

    const service = new Service()

    const openModal = () => {
        setIsModalOpen(true);
    };


    const closeModal = () => {
        setSecondModal(false)
        setIsModalOpen(false);
    }

    const logOut = () =>{
        useUserLogout(user.ID)
    }
    
    const subscribeHandle = () => {
        service.request({
            url: Paths.USER_SUBSCRIBE,
            method: Method.GET
        }, user.ID).then((response) => {
            if(!response.success) alert(response.message)
            else window.location.reload()
        })
    }


    return (
        <div className="p-2">
            <Container className="p-2 flex gap-2">
                <div className="flex gap-2">
                    <div >
                        <div className="image-container h-3k w-3k circle-radius ml-2">
                            <HotelImageDiv>
                                <img src={user.ProfilePictureLink} alt="" />
                            </HotelImageDiv>
                        </div>
                    </div>
                    <div className="mt-2 flex flex-col gap-1">
                        <p className="xx-large">Hello, {user.FirstName} {user.LastName}</p>
                        <FlexGap className="larger">Email : {user.Email}</FlexGap>
                        <FlexGap className="larger">DOB : {dateConvert(user.DOB)}</FlexGap>
                        <FlexGap className="larger">Gender : {user.Gender}</FlexGap>
                        <FlexGap className="larger">Subscribed : {user.IsSubscribed ? "Yes" : "No"}</FlexGap>
                    </div>
                </div>
                <div className="flex gap-1">
                    <Button onClick={() => openModal()}>Update User Information</Button>
                    <Button onClick={() => setSecondModal(true)}>Add Credit Card</Button>
                    <Button onClick={subscribeHandle}>{user.IsSubscribed ? "Unsubscribe New Letter" : "Subscribe To News Letter"}</Button>
                    <Button onClick={logOut}>Log Out</Button>
                </div>
                <Modal onClose={closeModal} isOpen={isModalOpen}>
                    <UpdateUserInformation user={user}/>
                </Modal>

                <Modal onClose={closeModal} isOpen={secondModal}>
                    <AddCreditCard user={user}/>
                </Modal>
            </Container>
        </div>
    )
}
