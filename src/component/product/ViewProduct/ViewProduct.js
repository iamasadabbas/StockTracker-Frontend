import React, { Fragment, useEffect, useState } from 'react';
import { getAllProductFromLocation, getAllProductType } from '../../../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
import { getAllCompany } from '../../../actions/companyAction';
import TablePagination from '@mui/material/TablePagination';
import { useNavigate } from 'react-router-dom';
import './ViewProduct.css';
import ReactTable from '../../ReactTable';

const ViewProduct = () => {
  const navigate = useNavigate();
  const location_id = '660ed51b8cc6708776801a2c';
  const dispatch = useDispatch();
  const { loading, allProduct, allProductType, error } = useSelector((state) => state.product);
  const { allCompany } = useSelector((state) => state.company);

  const [searchName, setSearchName] = useState('');
  const [searchSpecification, setSearchSpecification] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getAllProductType());
    dispatch(getAllProductFromLocation(location_id));
    dispatch(getAllCompany());
  }, [dispatch]);

  const handleNameSearchChange = (e) => setSearchName(e.target.value);
  const handleSpecificationSearchChange = (e) => setSearchSpecification(e.target.value);
  const handleTypeChange = (e) => setSelectedType(e.target.value);
  const handleCompanyChange = (e) => setSelectedCompany(e.target.value);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleAddProductClick = () => navigate('/addproduct');

  const filteredProducts = allProduct?.filter((product) => {
    const matchesType = selectedType ? product.product_id.type_id?._id === selectedType : true;
    const matchesName = product.product_id?.name?.toLowerCase().includes(searchName.toLowerCase());
    const matchesSpecification = product.product_id?.specifications?.toLowerCase().includes(searchSpecification.toLowerCase());
    const matchesCompany = selectedCompany ? product.product_id.company_id?._id === selectedCompany : true;
    return matchesType && matchesName && matchesSpecification && matchesCompany;
  });

  const indexOfLastProduct = page * rowsPerPage + rowsPerPage;
  const indexOfFirstProduct = page * rowsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Define columns for ReactTable
  const columns = React.useMemo(
    () => [
      {
        Header: 'SrNo',
        accessor: 'srNo',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Specification',
        accessor: 'specifications',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Company',
        accessor: 'company',
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
      },
    ],
    []
  );

  // Format data for ReactTable
  const tableData = React.useMemo(
    () =>
      currentProducts.map((product, index) => ({
        srNo: index + 1,
        name: product.product_id?.name || 'N/A',
        specifications: product.product_id?.specifications || 'N/A',
        type: product.product_id?.type_id?.name || 'N/A',
        company: product.product_id?.company_id?.name || 'N/A',
        quantity: product.quantity || 'N/A',
      })),
    [currentProducts]
  );

  const { roleTask } = useSelector(
    (state) => state.userData
  );
  var task = false;
  task = roleTask.find((e) => e?.task_id?.name === "Add Product" && e.status === true);
  
  return (
    <Fragment>
      
        <div className="main-page-container">
          <div className='pageName_And_Button'>
            <h3>Available Products</h3>
            {task ? <button className="button-yellow" onClick={handleAddProductClick}>Add Product</button>: null}
            
          </div>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search by name" 
              value={searchName} 
              className="search-input"
              onChange={handleNameSearchChange} 
            />
            <input 
              type="text" 
              placeholder="Search by specification" 
              value={searchSpecification} 
              className="search-input"
              onChange={handleSpecificationSearchChange} 
            />
            <select className="productType-search" value={selectedType} onChange={handleTypeChange}>
              <option value="">All Types</option>
              {allProductType?.map((type) => (
                <option key={type._id} value={type._id}>
                  {type.name}
                </option>
              ))}
            </select>
            <select className="productCompany-search" value={selectedCompany} onChange={handleCompanyChange}>
              <option value="">All Companies</option>
              {allCompany?.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <div className='table-container'>
          {loading ? (
        <Loader />
      ) : (
            <ReactTable data={tableData} columns={columns} />
          )}
          </div>
          <TablePagination
            component="div"
            count={filteredProducts.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      
    </Fragment>
  );
};

export default ViewProduct;
