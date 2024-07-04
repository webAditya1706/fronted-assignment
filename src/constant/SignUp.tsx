import InputField from "@/componant/form/feilds/InputField";
import SelectDropDown from "@/componant/form/feilds/selectDropDown";
import SelectFile from "@/componant/form/feilds/selectFile";
import { signUpInitialValues } from "@/componant/form/initialValues/formInitialValues";
import { SignUpValidationSchema } from "@/componant/form/validations/formValidationSchema";
import { createUserAction } from "@/redux/actions/formAction";
import axiosInstance from "@/utils/interSeptor";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const SignUp = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<any>();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (
    values: any,
    { resetForm, setSubmitting }: any
  ) => {
    try {
      delete values.confirmPassword;
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key] as string | Blob);
      });

      const {payload} = await dispatch(createUserAction(formData) as any);
      
      if (payload) {
        toast.success(payload.message);

        resetForm();
        router.push("/signin")
      }
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
    if (router.query) {
      let { id } = router.query;
      if (id) {
        axiosInstance
          .get(`user/getUserById/${id}`)
          .then((res) => {
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
              <div className="form_container my-5">
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
                <div className="mt-3">
                  <p>If you have your Account, Login <span>
                    <Link href={"/signin"}>Here</Link></span></p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};


export default SignUp;
