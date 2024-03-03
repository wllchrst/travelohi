import { ChangeEvent, useState } from "react"
import { IUser } from "../../interfaces/user-interface"
import Input from "../wrapper/input"
import { getTheFile } from "../../game/util"
import Button from "../wrapper/button"
import { FirebaseUtil } from "../../utils/firebase"
import Service from "../../utils/service"
import Paths from "../../enums/api-paths"
import { Method } from "../../enums/method-enum"

interface I {
    user : IUser
}

export default function UpdateUserInformation ({ user } : I) {
    const [updateUser, setUpdateUser] = useState(user)
    const [file , setfirst] = useState<File>()
    const service = new Service()

    const changeHandle = (event : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUpdateUser({
            ...updateUser,
            [event.target.name] : event.target.value
        })
    }

    const updateHandle = () => {
        if(file) FirebaseUtil.PostImage(file).then((result) => {
            updateUser.ProfilePictureLink = result
            service.request({
                url: Paths.UPDATE_USER_INFORMATION,
                method: Method.POST
            }, '', updateUser).then((response) => {
                console.log(response);
                if(!response.success) alert(response.message)
                else window.location.reload()
            })

            return
        })
    }


    return (
        <div className="flex flex-col gap-1">
            <p>Update User</p>
            <Input placeholder="Email" name="Email"  type="text" onChange={changeHandle}/>
            <Input placeholder="FirstName" name="FirstName" type="text" onChange={changeHandle}/>
            <Input placeholder="LastName" name="LastName"  type="text" onChange={changeHandle}/>
            <Input placeholder="Profile Picture" name="ProfilePictureLink" type="file" onChange={(o) => getTheFile(o, setfirst)}/>
            <div className="w-50per">
                <Button onClick={updateHandle}>Update</Button>
            </div>
        </div>
    )
}
