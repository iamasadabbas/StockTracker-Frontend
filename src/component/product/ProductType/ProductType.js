import React, { useState, useEffect, Fragment } from "react";
import {
  clearError,
  addProductType,
  clearMessage,
  getAllProductType,
} from "../../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import "../AddProduct/Products.css";
import { useAlert } from "react-alert";
import TablePagination from "@mui/material/TablePagination";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineUpdate } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ReactTable from "../../ReactTable"; // Adjust the path as needed

export default function ProductType() {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, message, allProductType, error } = useSelector(
    (state) => state.product
  );

  const [productTypeInput, setProductTypeInput] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchDescription, setSearchDescription] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleProductTypeChange = (e) => {
    setProductTypeInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addProductType(productTypeInput));
  };

  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    } else if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getAllProductType());
  }, [error, message, dispatch, alert]);

  const filteredProductTypes = allProductType.filter((type) =>
    type.name.toLowerCase().includes(searchType.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleAddTypeclick = () => {
    navigate("/addProductType");
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const indexOfLastType = page * rowsPerPage + rowsPerPage;
  const indexOfFirstType = page * rowsPerPage;
  const currentProductTypes = filteredProductTypes.slice(
    indexOfFirstType,
    indexOfLastType
  );

  // Define columns for ReactTable
  const columns = React.useMemo(
    () => [
      {
        Header: "SrNo",
        accessor: "srNo",
      },
      {
        Header: "Type",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      // {
      //     Header: 'Actions',
      //     accessor: 'actions',
      //     Cell: ({ row }) => (
      //         <div>
      //             <button className="action-btn"><AiFillDelete /></button>
      //             <button className="action-btn"><MdOutlineUpdate /></button>
      //         </div>
      //     ),
      // },
    ],
    []
  );

  // Format data for ReactTable
  const tableData = React.useMemo(
    () =>
      currentProductTypes.map((type, index) => ({
        srNo: indexOfFirstType + index + 1,
        name: type.name,
        description: type.description,
        actions: "", // Actions will be rendered by the Cell component
      })),
    [currentProductTypes, indexOfFirstType]
  );

  const { roleTask } = useSelector((state) => state.userData);
  var task = false;
  task = roleTask.find(
    (e) => e?.task_id?.name === "Add Product Type" && e.status === true
  );

  return (
    <Fragment>
      <div className="main-page-container">
        <div className="pageName_And_Button">
          <h3>Product Type</h3>
          {task ? (
            <button className="button-yellow" onClick={handleAddTypeclick}>
              Add Type
            </button>
          ) : null}
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Product Type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search Product Description"
            value={searchDescription}
            onChange={(e) => setSearchDescription(e.target.value)}
          />
        </div>
        <div className="table-container">
          {loading ? (
            <Loader />
          ) : (
            <ReactTable data={tableData} columns={columns} />
          )}
        </div>
        <TablePagination
          component="div"
          count={filteredProductTypes.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </Fragment>
  );
}
