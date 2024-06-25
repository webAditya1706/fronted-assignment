import RenderTable from "@/componant/RenderTable";
import InputField from "@/componant/form/feilds/InputField";
import { signInInitialValues } from "@/componant/form/initialValues/formInitialValues";
import { SignInValidationSchema } from "@/componant/form/validations/formValidationSchema";
import { LoginUserAction, createUserAction, updateUserAction } from "@/redux/actions/formAction";
import { LoginUserInterFace, UserData } from "@/types/user";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Pagination from "./Pagination";

const SignIn = () => {
  const [editData, setEditData] = useState<UserData | null>();
  const [editDataById, setEditDataById] = useState<number | null>(null);
  const [showData, setShowData] = useState<UserData[] | null>();
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(3);
  const [indexNomber, setIndexNomber] = useState<number>(1);
  const [totalUser, setTotalUser] = useState<number>(0);
  const [renderUserNum, setRenderUserNum] = useState<number>(3);

  const dispatch = useDispatch();

  const handleSubmit = (values: LoginUserInterFace, { resetForm }: any) => {   
      dispatch(LoginUserAction(values) as any);    
    resetForm();
  };

  
  return (
    <section>
      <Container>
        <Row>
          <Col className="m-auto" xs={12} md={6}>
            <div className="form_section">
              <div className="form_container">
                <h1 className="text-center">Contact Form</h1>
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
              </div>
            </div>
          </Col>
        </Row>        
      </Container>
    </section>
  );
};

export default SignIn;
