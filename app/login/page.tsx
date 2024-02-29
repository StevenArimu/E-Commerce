import { getCurrentUser } from "@/actions/getCurrent";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import LoginForm from "./LoginForm";


const Login = async () => {
    const currentUser = await getCurrentUser()
    console.log("Cur User => ", currentUser)

    return (
        <Container>
            <FormWrap>
                <LoginForm currentUser={currentUser} />
            </FormWrap>
        </Container>
    );
}

export default Login;