import { Row } from "react-bootstrap";
interface props {
  indexNomber: number;
  setIndexNomber: (value: number) => void;
  totalUser: number;
  setStartIndex: (value: number) => void;
  startIndex: number;
  setEndIndex: (value: number) => void;
  endIndex: number;
  setRenderUserNum: (value: number) => void;
  renderUserNum: number;
}

const Pagination = ({
  indexNomber,
  setIndexNomber,
  totalUser,
  setStartIndex,
  startIndex,
  setEndIndex,
  endIndex,
  renderUserNum,
  setRenderUserNum,
}: props) => {
  const handlePrevBtn = () => {
    if (indexNomber !== 1) {
      setIndexNomber(indexNomber - 1);
      setStartIndex(startIndex - renderUserNum);
      setEndIndex(endIndex - renderUserNum);
    }
  };
  const handleNextBtn = () => {
    if (indexNomber !== totalUser) {
      setIndexNomber(indexNomber + 1);
      setStartIndex(startIndex + renderUserNum);
      setEndIndex(endIndex + renderUserNum);
    }
  };
  return (
    <Row className="justify-content-center ">
      <div className="pagi_btns">
        <button className="btn btn-success px-5" onClick={handlePrevBtn}>
          Prev
        </button>
        <div className="pagi_number">{indexNomber}</div>
        <button className="btn btn-success px-5" onClick={handleNextBtn}>
          Next
        </button>
      </div>
    </Row>
  );
};

export default Pagination;
