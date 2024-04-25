import { useContext } from "react";
import { UserContext } from "./UserContext";
import '../../styles/user/UserDashboard.css'
import BasicTabs from "./CustomTabPanel";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearPersistedState, resetCategoryState } from "../../network/redux/actions/actions";
import { logoutUser } from "../../network/networkConfig";
import { clearPersistedStateAndRestart} from "../../network/redux/store/store";
export default function UserDashboard() {
    const { user, setUser, setToken } = useContext<any>(UserContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSignOut = async () => {
        setUser(null);
        localStorage.removeItem('token');
        dispatch(clearPersistedState());
        clearPersistedStateAndRestart();
      
        navigate(`/`);
        window.location.reload();
    }
    return (
        <section aria-labelledby="account-label" className="user-section">
            <h1 id="account-label">Welcome back {user.firstName}!</h1>
            <BasicTabs />
            <Button onClick={handleSignOut}> Log Out</Button>
        </section>


    )
}