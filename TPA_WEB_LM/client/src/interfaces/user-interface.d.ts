import ICreditCard from "./credit-card-interface"

export interface IUser {
    ID                       : string 
    Email                    : string
    FirstName                : string
    LastName                 : string
    DOB                      : date
    Gender                   : string
    ProfilePictureLink       : string
    PersonalSecurityQuestion : string
    PersonalSecurityAnswer   : string
    Role : string
    Banned : boolean 
    IsLoggedIn               :boolean
	IsSubscribed             :boolean
    CreditCards: ICreditCard[]
}

export interface ILoginData {
    Email : string
    Password : string
}
