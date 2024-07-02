import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../../actions/demandAction';
import { clearError, getAllProductType } from '../../../actions/productAction';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import { useAlert } from 'react-alert';
import { getAllCompany } from '../../../actions/companyAction';
import TablePagination from '@mui/material/TablePagination';

const Products = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const { loading, allProduct, allProductType, error } = useSelector((state) => state.product);
  const { allCompany } = useSelector((state) => state.company);
  const dispatch = useDispatch();

  // State variables for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [descriptionSearchTerm, setDescriptionSearchTerm] = useState('');
  const [specificationSearchTerm, setSpecificationSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllProductType());
    dispatch(getAllCompany());
  }, [dispatch]);

  const handleAddProduct = () => {
    navigate('/addproduct');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filtered products based on search term, selected type, and selected company
  const filteredProducts = allProduct?.filter((product) => {
    const matchesName = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDescription = product.description?.toLowerCase().includes(descriptionSearchTerm.toLowerCase());
    const matchesSpecification = product.specifications?.toLowerCase().includes(specificationSearchTerm.toLowerCase());
    const matchesType = selectedType ? product.type_id?.name === selectedType : true;
    const matchesCompany = selectedCompany ? product.company_id?.name === selectedCompany : true;
    return matchesName && matchesDescription && matchesSpecification && matchesType && matchesCompany;
  });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch, alert]);

  const indexOfLastProduct = page * rowsPerPage + rowsPerPage;
  const indexOfFirstProduct = page * rowsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    loading ? (
      <Loader />
    ) : (
      <div className="main-page-container">
        <div className='pageName_And_Button'>
          <h3>Products</h3>
          <button className="button-yellow" onClick={handleAddProduct}>Add Product</button>
        </div>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search by name" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <input 
            type="text" 
            placeholder="Search by specifications" 
            value={specificationSearchTerm}
            onChange={(e) => setSpecificationSearchTerm(e.target.value)}
            className="search-input"
          />
          <input 
            type="text" 
            placeholder="Search by description" 
            value={descriptionSearchTerm}
            onChange={(e) => setDescriptionSearchTerm(e.target.value)}
            className="search-input"
          />
          <select 
            className="search-input"
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All Types</option>
            {allProductType?.map((type) => (
              <option key={type.id} value={type.name}>{type.name}</option>
            ))}
          </select>
          <select 
            className="search-input"
            value={selectedCompany} 
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            <option value="">All Companies</option>
            {allCompany?.map((company) => (
              <option key={company.id} value={company.name}>{company.name}</option>
            ))}
          </select>
        </div>
        <div className="table-container">
          <table className="customer-table">
            <thead>
              <tr>
                <th>SrNo</th>
                <th>Name</th>
                <th>Specification</th>
                <th>Description</th>
                <th>Type</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody className='tablebody_data'>
              {currentProducts.map((product, index) => (
                <tr key={product.id}>
                  <td>{index+1}</td>
                  <td>{product.name}</td>
                  <td>{product.specifications || 'N/A'}</td>
                  <td>{product.description || 'N/A'}</td>
                  <td>{product.type_id?.name || 'N/A'}</td>
                  <td>{product.company_id?.name || 'N/A'}</td>
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
    )
  );
};

export default Products;
