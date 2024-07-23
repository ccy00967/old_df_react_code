import { Button} from "@mui/material";
import logo from '../assets/img/dronefield_logo.jpg'

export function LogoButton() {
    return (
        <Button href="/">
            <img src={logo} alt="Logo" width="40px" height="40px"></img>
        </Button>
    );
}