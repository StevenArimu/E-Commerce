import LoginForm from "./LoginForm";
import FormWrap from "../components/FormWrap";
import Container from "../components/Container";
import { getCurrentUser } from "@/actions/getCurrent";


const Login = async () => {
    const currentUser = await getCurrentUser()

    return (
        <Container>
            <FormWrap>
                <LoginForm currentUser={currentUser} />
            </FormWrap>
        </Container>
    );
}

export default Login;