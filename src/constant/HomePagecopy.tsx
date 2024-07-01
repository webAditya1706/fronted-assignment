import RenderTable from "@/componant/RenderTable";
import InputField from "@/componant/form/feilds/InputField";
import { ragistrationInitialValues } from "@/componant/form/initialValues/formInitialValues";
import { RagistrationValidationSchema } from "@/componant/form/validations/formValidationSchema";
import { createUserAction, updateUserAction } from "@/redux/actions/formAction";
import { UserData } from "@/types/user";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Pagination from "./Pagination";

const HomePagecopy = () => {
  const [editData, setEditData] = useState<UserData | null>();
  const [editDataById, setEditDataById] = useState<number | null>(null);
  const [showData, setShowData] = useState<UserData[] | null>();
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(3);
  const [indexNomber, setIndexNomber] = useState<number>(1);
  const [totalUser, setTotalUser] = useState<number>(0);
  const [renderUserNum, setRenderUserNum] = useState<number>(3);

  const dispatch = useDispatch();
  const { userData } = useSelector(
    ({ persistedReducer }: any) => persistedReducer.FormReducer
  );

  const handleSubmit = (values: UserData, { resetForm }: any) => {
    if (editDataById !== null) {
      dispatch(updateUserAction({ data: values, id: editDataById }) as any);
      setEditDataById(null);
      setEditData(null);
      toast.success("User updated");
    } else {
      dispatch(createUserAction(values) as any);
      toast.success("User created");
    }
    resetForm();
  };

  useEffect(() => {
    const data = userData.filter(
      (item: UserData, index: number) => index < endIndex && index >= startIndex
    );
    setShowData(data);
  }, [startIndex, endIndex]);

  useEffect(() => {
    if (userData.length > 0) {
      if (userData.length % renderUserNum) {
        let totalIndex = Math.floor(userData.length / renderUserNum) + 1;
        setTotalUser(totalIndex);
      } else {
        let totalIndex = userData.length / renderUserNum;
        setTotalUser(totalIndex);
      }

      const data = userData.filter(
        (item: UserData, index: number) =>
          index < endIndex && index >= startIndex
      );
      setShowData(data);
    }
  }, [userData]);

  return (
    <section>
      <Container>
        <Row>
          <Col className="m-auto" xs={12} md={6}>
            <div className="form_section">
              <div className="form_container my-5">
                {/* <h1 className="text-center">Contact Form</h1> */}
                <Formik
                  initialValues={editData || ragistrationInitialValues}
                  validationSchema={RagistrationValidationSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize
                >
                  {({ handleSubmit, setFieldValue }) => (
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
                        label={"Password"}
                        name={"password"}
                        type={"password"}
                      />
                      <InputField
                        label={"Confirm password"}
                        name={"confirmPassword"}
                        type={"confirmPassword"}
                      />
                      <button className="btn btn-primary" type="submit">
                        {editDataById != null ? "Update" : "Submit"}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          {showData && showData.length > 0 && (
            <RenderTable
              storeValue={showData}
              setEditData={setEditData}
              setEditDataById={setEditDataById}
              startIndex={startIndex}
            />
          )}
        </Row>
        {userData && userData.length > renderUserNum && (
          <Pagination
            indexNomber={indexNomber}
            setIndexNomber={setIndexNomber}
            totalUser={totalUser}
            setStartIndex={setStartIndex}
            setEndIndex={setEndIndex}
            startIndex={startIndex}
            endIndex={endIndex}
            renderUserNum={renderUserNum}
            setRenderUserNum={setRenderUserNum}
          />
        )}
      </Container>
    </section>
  );
};

export default HomePagecopy;
