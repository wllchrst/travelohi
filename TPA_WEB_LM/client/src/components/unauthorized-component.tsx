import { Link } from "react-router-dom";
import { Title } from "./wrapper/title";

export default function Unauthorized () {
    return (
        <div className="height-vh center flex-col gap-2">
            <Title className="red ">404 Page Not Found</Title>
            <Link to={'/'}>
                <Title className="red bolder underline-effects hover-effects">Home</Title>
            </Link>
        </div>
    )
}
