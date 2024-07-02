import React, { Fragment, useEffect, useState } from 'react';
import { getAllProductFromLocation, getAllProductType } from '../../../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
import { getAllCompany } from '../../../actions/companyAction';
import TablePagination from '@mui/material/TablePagination';
import { useNavigate } from 'react-router-dom';

const ViewProduct = () => {
  const navigate=useNavigate()
  const location_id = '660ed51b8cc6708776801a2c';
  const dispatch = useDispatch();
  const { loading, allProduct, allProductType, error } = useSelector((state) => state.product);
  const { allCompany } = useSelector((state) => state.company);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getAllProductType());
    dispatch(getAllProductFromLocation(location_id));
    dispatch(getAllCompany());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleAddProductClick =()=>{
    navigate('/addproduct')
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredProducts = allProduct?.filter((product) => {
    const matchesType = selectedType ? product.product_id.type_id?._id === selectedType : true;
    const matchesSearch =
      product.product_id?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.product_id?.specifications?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.product_id?.type_id?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany = selectedCompany ? product.product_id.company_id?._id === selectedCompany : true;
    return matchesType && matchesSearch && matchesCompany;
  });

  const indexOfLastProduct = page * rowsPerPage + rowsPerPage;
  const indexOfFirstProduct = page * rowsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="main-page-container">
          <div className='pageName_And_Button'>
            <h3>Available Products</h3>
            <button className="button-yellow" onClick={handleAddProductClick}>Add Product</button>
          </div>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search by name or specification" 
              value={searchTerm} 
              onChange={handleSearchChange} 
            />
            <select className="productType-search" value={selectedType} onChange={handleTypeChange}>
              <option value="">All Types</option>
              {allProductType?.map((type) => (
                <option key={type?._id} value={type?._id}>
                  {type?.name}
                </option>
              ))}
            </select>
            <select className="productCompany-search" value={selectedCompany} onChange={handleCompanyChange}>
              <option value="">All Companies</option>
              {allCompany?.map((company) => (
                <option key={company?._id} value={company?._id}>
                  {company?.name}
                </option>
              ))}
            </select>
          </div>
          <div className='table-container'>
            <table className="customer-table">
              <thead>
                <tr>
                  <th>SrNo</th>
                  <th>Name</th>
                  <th>Specification</th>
                  <th>Type</th>
                  <th>Company</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody className='tablebody_data'>
                {currentProducts.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index+1}</td>
                    <td>{product?.product_id?.name}</td>
                    <td>{product?.product_id?.specifications}</td>
                    <td>{product?.product_id?.type_id?.name}</td>
                    <td>{product?.product_id?.company_id?.name}</td>
                    <td>{product?.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      )}
    </Fragment>
  );
};

export default ViewProduct;
