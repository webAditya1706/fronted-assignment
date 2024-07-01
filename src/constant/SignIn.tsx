import InputField from "@/componant/form/feilds/InputField";
import { signInInitialValues } from "@/componant/form/initialValues/formInitialValues";
import { SignInValidationSchema } from "@/componant/form/validations/formValidationSchema";
import { LoginUserAction } from "@/redux/actions/formAction";
import { LoginUserInterFace } from "@/types/InterFace";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const SignIn = () => {
  const router = useRouter()

  const dispatch = useDispatch();

  const handleSubmit = async (values: LoginUserInterFace, { resetForm }: any) => {
    const {payload} = await dispatch(LoginUserAction(values) as any);
    if (payload.success) {
      resetForm();
      router.push("/")
      toast.success(payload.message)
    }
  };


  return (
    <section>
      <Container>
        <Row>
          <Col className="m-auto" xs={12} md={6}>
            <div className="form_section">
              <div className="form_container my-5">
                <h1 className="text-center">Login Form</h1>
                <Formik
                  initialValues={signInInitialValues}
                  validationSchema={SignInValidationSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize
                >
                  {() => (
                    <Form>
                      <InputField
                        label={"Email"}
                        name={"email"}
                        type={"email"}
                      />
                      <InputField
                        label={"Password"}
                        name={"password"}
                        type={"password"}
                      />
                      <button className="btn btn-primary" type="submit">
                        Login
                      </button>
                    </Form>
                  )}
                </Formik>
                <div className="mt-3">
                  <p>If you don't have your Account, Ragister <span>
                    <Link href={"/signup"}>Here</Link></span></p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignIn;
