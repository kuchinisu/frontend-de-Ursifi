import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <div>
            <div className="flex-1">
                <Link to={'/'}>
                    <a className="btn btn-ghost text-xl">UrsiFi</a>
                </Link>
                
            </div>
            <div>
                opcion
            </div>
            <div>
                opcion
            </div>
            <div>
                opcion
            </div>
            
        </div>
    );
};

export default SideBar