import { delateUserAction } from "@/redux/actions/formAction";
import { UserDataInterface } from "@/types/InterFace";
import Table from "react-bootstrap/Table";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function RenderTable({
  tableHeader,
  tableData
}: any) {
  const dispatch = useDispatch();

  return (
    <Table striped bordered hover variant="gray" className="my-5">
      <thead>
        <tr>
          {
            tableHeader && tableHeader.length > 0 && tableHeader.map((header: string, index: number) => {
              return (
                <th key={index}>{header}</th>
              )
            })
          }
        </tr>
      </thead>
      <tbody>
        {tableData && tableData.length > 0 && tableData.map((data: UserDataInterface, index: number) => (
          <tr key={index + 1}>
            <td>{index + 1}</td>
            <td>
              <div className="td_parent">
                <img src={data.logo} className="td_img" />
                <p>{data.name}</p>
              </div>
            </td>
            <td>{data.email}</td>
            <td>{data.role}</td>
            <td>{data.contact}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default RenderTable;
