import RegisterForm from "./RegisterForm";
import FormWrap from "../components/FormWrap";
import Container from "../components/Container";
import { getCurrentUser } from "@/actions/getCurrent";


const Register = async () => {
    const currentUser = await getCurrentUser()
    return (
        <Container>
            <FormWrap>
                <RegisterForm currentUser={currentUser} />
            </FormWrap>
        </Container>
    );
}

export default Register;