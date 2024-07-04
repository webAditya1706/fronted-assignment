import InputField from "@/componant/form/feilds/InputField";
import SelectFile from "@/componant/form/feilds/selectFile";
import { UpdateUserValidationSchema } from "@/componant/form/validations/formValidationSchema";
import { updateUserAction } from "@/redux/actions/formAction";
import axiosInstance from "@/utils/interSeptor";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const initialValue = {
  name: "",
  email: "",
  contact: "",
  logo: ""
}
const UpdateUser = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [editData, setEditData] = useState(initialValue);
  const fileInputRef = useRef<any>();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (
    values: any,
    { resetForm, setSubmitting }: any
  ) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key] as string | Blob);
      });
      // for (const value of formData.values()) {
      //   console.log(value, "======");
      // }

      const {payload} = await dispatch(updateUserAction(formData as any) as any);
      if(payload){
        toast.success(payload.message);
        router.push("/")
      }      
      resetForm();
    } catch (error) {
      toast.error("There was an error submitting the form");
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setPreview(null);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (router.query) {
      let { id } = router.query;
      if (id) {
        axiosInstance
          .get(`/user/getUserById`)
          .then((res) => {
            setEditData(res.data.data)
            setPreview(res.data.data.logo)

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
                  initialValues={editData}
                  validationSchema={UpdateUserValidationSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize
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


export default UpdateUser;
