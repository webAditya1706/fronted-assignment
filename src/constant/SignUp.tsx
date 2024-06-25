import React, { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { createUserAction, updateUserAction } from "@/redux/actions/formAction";
import { UserData } from "@/types/user";
import { signUpInitialValues } from "@/componant/form/initialValues/formInitialValues";
import { SignUpValidationSchema } from "@/componant/form/validations/formValidationSchema";
import InputField from "@/componant/form/feilds/InputField";
import SelectDropDown from "@/componant/form/feilds/selectDropDown";
import SelectFile from "@/componant/form/feilds/selectFile";
import { useRouter } from "next/router";
import axiosInstance from "@/utils/interSeptor";

const SignUp = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  
  const handleSubmit = async (
    values: any,
    { resetForm, setSubmitting }: any
  ) => {
    try {
      console.log(values, "====");
      delete values.confirmPassword;
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key] as string | Blob);
      });

      await dispatch(createUserAction(formData) as any);
      resetForm();
    } catch (error) {
      toast.error("There was an error submitting the form");
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setPreview(null);
      setSubmitting(false); // Ensure that the form is set to not submitting state after submission
    }
  };

  useEffect(() => {
    console.log(router.query, "======router.query");
    if (router.query) {
      let { id } = router.query;
      if (id) {
        axiosInstance
          .get(`user/getUserById/${id}`)
          .then((res) => {
            console.log(res.data.data, "======res");
          })
          .catch((error) => {
            console.log(error, error);
          });
      }
    }
  }, [router.query]);

  return (
    <section>
      <Container>
        <Row>
          <Col className="m-auto" xs={12} md={6}>
            <div className="form_section">
              <div className="form_container">
                <Formik
                  initialValues={signUpInitialValues}
                  validationSchema={SignUpValidationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ handleSubmit, setFieldValue, errors, setErrors }) => (
                    <Form onSubmit={handleSubmit}>
                      <InputField
                        label={"Full name"}
                        name={"name"}
                        type={"text"}
                      />
                      <InputField
                        label={"Email"}
                        name={"email"}
                        type={"email"}
                      />
                      <InputField
                        label={"Contact number"}
                        name={"contact"}
                        type={"text"}
                      />
                      <InputField
                        label={"Password"}
                        name={"password"}
                        type={"password"}
                      />
                      <InputField
                        label={"Confirm password"}
                        name={"confirmPassword"}
                        type={"password"}
                      />
                      <SelectDropDown
                        name={"role"}
                        label={"Choose an option"}
                      />
                      <SelectFile
                        label={"Select Image"}
                        name={"logo"}
                        setFieldValue={setFieldValue}
                        preview={preview}
                        setPreview={setPreview}
                        fileInputRef={fileInputRef}
                      />
                      <button className="btn btn-primary" type="submit">
                        Submit
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


export default SignUp;
