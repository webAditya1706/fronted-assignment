import InputField from "@/componant/form/feilds/InputField";
import SelectFile from "@/componant/form/feilds/selectFile";
import { productInitialValuse } from "@/componant/form/initialValues/formInitialValues";
import { ProductValidationSchema } from "@/componant/form/validations/formValidationSchema";
import { createProductAction, getProducByIdtAction, updateProductAction } from "@/redux/actions/productActions";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState({})
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
      if (router.query.id) {
        const result = await dispatch(updateProductAction({ formData, id: router.query.id as string }) as any);
        if (result) {
          resetForm();
          router.push("/")
        }
      } else {
        const result = await dispatch(createProductAction(formData as any) as any);
        if (result) {
          router.push("/")
          resetForm();
        }
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
    if (router.query.id) {
      getProductData()
    }
  }, [router.query]);

  const getProductData = async () => {
    try {
      const data = await dispatch(getProducByIdtAction(router.query.id as string) as any);
      setEditProduct(data.payload);
      setPreview(data.payload.image);
    } catch (error) {
      console.log(error, "=============error");

    }
  }

  return (
    <section>
      <Container>
        <Row>
          <Col className="m-auto" xs={12} md={6}>
            <div className="form_section">
              <div className="form_container">
                <Formik
                  initialValues={editProduct || productInitialValuse}
                  validationSchema={ProductValidationSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize
                >
                  {({ handleSubmit, setFieldValue, errors, setErrors, values }) => (
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
                        {router.query.id ? " Update Product" : "Create Product"}
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
