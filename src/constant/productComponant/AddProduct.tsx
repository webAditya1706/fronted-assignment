import React, { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { createUserAction, updateUserAction } from "@/redux/actions/formAction";
import { UserData } from "@/types/user";
import { productInitialValuse, signUpInitialValues } from "@/componant/form/initialValues/formInitialValues";
import { ProductValidationSchema, SignUpValidationSchema } from "@/componant/form/validations/formValidationSchema";
import InputField from "@/componant/form/feilds/InputField";
import SelectDropDown from "@/componant/form/feilds/selectDropDown";
import SelectFile from "@/componant/form/feilds/selectFile";
import { useRouter } from "next/router";
import axiosInstance from "@/utils/interSeptor";
import { createProductAction } from "@/redux/actions/productActions";

const AddProduct = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef();
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

      await dispatch(createProductAction(formData) as any);
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
                  initialValues={productInitialValuse}
                  validationSchema={ProductValidationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ handleSubmit, setFieldValue, errors, setErrors }) => (
                    <Form onSubmit={handleSubmit}>
                      <InputField
                        label={"Product title"}
                        name={"title"}
                        type={"text"}
                      />
                      <InputField
                        label={"Product description"}
                        name={"description"}
                        type={"text"}
                      />
                      <InputField
                        label={"Procuct Price"}
                        name={"price"}
                        type={"text"}
                      />
                      <SelectFile
                        label={"Select prodect Image"}
                        name={"image"}
                        setFieldValue={setFieldValue}
                        preview={preview}
                        setPreview={setPreview}
                        fileInputRef={fileInputRef}
                      />
                      <button className="btn btn-primary" type="submit">
                        Create Product
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


export default AddProduct;
