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
import { useRouter } from "next/router";
import Link from "next/link";

const SignIn = () => {
  const router = useRouter()

  const dispatch = useDispatch();

  const handleSubmit = async (values: LoginUserInterFace, { resetForm }: any) => {
    const data = await dispatch(LoginUserAction(values) as any);
    if (data) {
      resetForm();
      router.push("/")
      toast.success(data.payload.message)
    }
  };


  return (
    <section>
      <Container>
        <Row>
          <Col className="m-auto" xs={12} md={6}>
            <div className="form_section">
              <div className="form_container">
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
