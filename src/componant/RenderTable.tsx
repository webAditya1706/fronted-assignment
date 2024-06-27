import { delateUserAction } from "@/redux/actions/formAction";
import { RenderTableProps, UserData } from "@/types/user";
import Table from "react-bootstrap/Table";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function RenderTable({
  storeValue,
  setEditData,
  setEditDataById,
  startIndex,
}: RenderTableProps) {
  const dispatch = useDispatch();
  const handleEdit = (data: UserData, id: number) => {
    setEditDataById(id);
    setEditData(data);
  };

  const handleDelete = (id: number) => {
    dispatch(delateUserAction(id) as any);
    toast.error("User deleted");
  };

  return (
    <Table striped bordered hover variant="gray" className="mb-5">
      <thead>
        <tr>
          <th>Id</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {storeValue.map((data: UserData, index: number) => (
          <tr key={index + 1}>
            <td>{index + 1}</td>
            <td>{data.fullName}</td>
            <td>{data.email}</td>
            <td>{data.password}</td>
            <td>
              <div className="action_parent">
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(data, index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default RenderTable;
