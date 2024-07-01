import InputField from "@/componant/form/feilds/InputField";
import SelectFile from "@/componant/form/feilds/selectFile";
import { UpdateUserValidationSchema } from "@/componant/form/validations/formValidationSchema";
import { updateUserAction } from "@/redux/actions/formAction";
import { getProducByIdtAction } from "@/redux/actions/productActions";
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
const UpdateProduct = () => {
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
      await dispatch(updateUserAction(formData as any) as any);
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
    if (router.query.id) {
      getProductData()
    }
  }, [router.query]);

  const getProductData = async () => {
    const data = await dispatch(getProducByIdtAction(router.query.id as string) as any);
  }

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


export default UpdateProduct;
