import { Link } from "react-router-dom";
import { IoIosArrowDropleft  } from "react-icons/io";

export const BackLink = ({to = '/', children}) => {
    return (
        <Link to={to}>
            <IoIosArrowDropleft  />
            {children}</Link>
    );
};