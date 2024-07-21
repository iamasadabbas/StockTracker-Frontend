import React, { useEffect, useState, useMemo, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../../actions/demandAction';
import { clearError, getAllProductType } from '../../../actions/productAction';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import { useAlert } from 'react-alert';
import { getAllCompany } from '../../../actions/companyAction';
import TablePagination from '@mui/material/TablePagination';
import './Products.css';
import ReactTable from '../../ReactTable';  // Adjust the path as needed

const Products = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  // Selectors
  const { loading, allProduct, allProductType, error } = useSelector((state) => state.product);
  const { allCompany } = useSelector((state) => state.company);

  // State variables for search and filter
  const [filters, setFilters] = useState({
    searchTerm: '',
    descriptionSearchTerm: '',
    specificationSearchTerm: '',
    selectedType: '',
    selectedCompany: '',
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllProductType());
    dispatch(getAllCompany());
  }, [dispatch]);

  // Handle add product navigation
  const handleAddProduct = () => navigate('/addproduct');

  // Handle pagination changes
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle input changes for filters
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Filter products based on search term, selected type, and selected company
  const filteredProducts = useMemo(() => {
    return allProduct?.filter((product) => {
      const matchesName = product.name?.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesDescription = product.description?.toLowerCase().includes(filters.descriptionSearchTerm.toLowerCase());
      const matchesSpecification = product.specifications?.toLowerCase().includes(filters.specificationSearchTerm.toLowerCase());
      const matchesType = filters.selectedType ? product.type_id?.name === filters.selectedType : true;
      const matchesCompany = filters.selectedCompany ? product.company_id?.name === filters.selectedCompany : true;
      return matchesName && matchesDescription && matchesSpecification && matchesType && matchesCompany;
    });
  }, [allProduct, filters]);

  // Handle error alerts
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch, alert]);

  // Slice filtered products for pagination
  const indexOfLastProduct = page * rowsPerPage + rowsPerPage;
  const indexOfFirstProduct = page * rowsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Define columns for ReactTable
  const columns = useMemo(
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
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Company',
        accessor: 'company',
      },
    ],
    []
  );

  // Format data for ReactTable
  const tableData = useMemo(
    () =>
      currentProducts.map((product, index) => ({
        srNo: index + 1 + indexOfFirstProduct,
        name: product.name,
        specifications: product.specifications || 'N/A',
        description: product.description || 'N/A',
        type: product.type_id?.name || 'N/A',
        company: product.company_id?.name || 'N/A',
      })),
    [currentProducts, indexOfFirstProduct]
  );

  return(
  <Fragment>
    <div className="main-page-container">
      <div className='pageName_And_Button'>
        <h3>Products</h3>
        <button className="button-yellow" onClick={handleAddProduct}>Add Product</button>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          name="searchTerm"
          value={filters.searchTerm}
          onChange={handleFilterChange}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Search by specifications"
          name="specificationSearchTerm"
          value={filters.specificationSearchTerm}
          onChange={handleFilterChange}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Search by description"
          name="descriptionSearchTerm"
          value={filters.descriptionSearchTerm}
          onChange={handleFilterChange}
          className="search-input"
        />
        <select
          className="search-input"
          name="selectedType"
          value={filters.selectedType}
          onChange={handleFilterChange}
        >
          <option value="">All Types</option>
          {allProductType?.map((type) => (
            <option key={type._id} value={type.name}>{type.name}</option>
          ))}
        </select>
        <select
          className="search-input"
          name="selectedCompany"
          value={filters.selectedCompany}
          onChange={handleFilterChange}
        >
          <option value="">All Companies</option>
          {allCompany?.map((company) => (
            <option key={company._id} value={company.name}>{company.name}</option>
          ))}
        </select>
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
        count={filteredProducts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  </Fragment>
  )

};


export default Products;
