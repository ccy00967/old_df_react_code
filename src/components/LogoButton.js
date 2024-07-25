import { Button} from "@mui/material";
import logo from '../assets/img/dronefield_logo.jpg'

export function LogoButton() {
    return (
        <Button href="/">
            <img src={logo} alt="Logo" width="50px" height="50px"></img>
        </Button>
    );
}