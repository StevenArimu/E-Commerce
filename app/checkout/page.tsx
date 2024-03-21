import Container from "../components/Container";
import CheckOutClient from "./CheckOutClient";
import FormWrap from "../components/FormWrap";


const CheckOut = () => {
    return (
        <div className="p-8">
            <Container>
                <FormWrap>
                    <CheckOutClient />
                </FormWrap>
            </Container>
        </div>
    );
}

export default CheckOut;