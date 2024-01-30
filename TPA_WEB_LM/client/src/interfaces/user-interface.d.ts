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
    Banned : string
}

export interface ILoginData {
    Email : string
    Password : string
}
