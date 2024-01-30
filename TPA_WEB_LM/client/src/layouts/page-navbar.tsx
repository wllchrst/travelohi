import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { IChildren } from "../interfaces/children-interface";


export default function NavbarWrapper({ children } : IChildren) {
    return (
        <div>
            <Navbar></Navbar> 
            <div className="context">
                {children}
            </div>
            <Footer></Footer>
        </div>
    )
}
