/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

export const View = () => {
  const [companyList, setCompanyList] = useState([]);
  //Setting initial state, which is an api which stores the db values
  useEffect(() => {
    const fetchCompanies = async () => {
      await axios.get('/api/db').then((jsonResponse) => setCompanyList(jsonResponse.data.data));
    };
    fetchCompanies();
  }, []);
  //CSS
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
      maxWidth: 1000,
      position: 'relative',
      left: 450,
      backgroundColor: '#e6e6e6'
    },
    div: {
      backgroundColor: '#f2f2f2',
      height: '100vh',
      minHeight: '100vh'
    },
    pag: {
      minWidth: 650,
      maxWidth: 1000,
      position: 'relative',
      left: 450
    },
    tab: {
      backgroundColor: '#f2f2f2'
    },
    h3: {
      backgroundColor: ' #555555',
      border: 'none',
      color: 'white',
      padding: '15px 32px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      margin: '4px 2px',
      cursor: 'pointer',
      position: 'relative',
      left: '20px'
    },
    h1: {
      fontSize: '80px'
    },
    button: {
      backgroundColor: ' #555555',
      border: 'none',
      color: 'white',
      padding: '15px 32px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      margin: '4px 2px',
      cursor: 'pointer'
    }
  });
  //Calling Delete API
  const deleteCompany = async (company) => {
    await axios.delete('/api/db', {
      data: company
    });
    setCompanyList((previousCompanyList) => previousCompanyList.filter((savedCompany) => savedCompany !== company));
  };

  const classes = useStyles();
  //Pagination
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className={classes.div}>
      <div>
        <h1 className={classes.h1} align='center'>
          View Page
        </h1>
        <Link to='/home'>
          <h3 className={classes.h3}>Home Page</h3>
        </Link>
      </div>
      <TableContainer className={classes.tab} component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: '20px' }}>Company Name</TableCell>
              <TableCell style={{ fontSize: '20px' }} align='right'>
                Stock Symbol
              </TableCell>
              <TableCell style={{ fontSize: '20px' }} align='right'>
                Currency
              </TableCell>
              <TableCell style={{ fontSize: '20px' }} align='right'>
                Stock Exchange
              </TableCell>
              <TableCell style={{ fontSize: '20px' }} align='right'>
                Save Data
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((company) => (
              <TableRow key={company.symbol}>
                <TableCell component='th' scope='row'>
                  <p>{company.name}</p>
                </TableCell>
                <TableCell align='right'>
                  <p>{company.symbol}</p>
                </TableCell>
                <TableCell align='right'>
                  <p>{company.currency}</p>
                </TableCell>
                <TableCell align='right'>
                  <p>{company.stockExchange}</p>
                </TableCell>
                <TableCell align='right'>
                  <button
                    className={classes.button}
                    onClick={() => {
                      deleteCompany(company);
                    }}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          className={classes.pag}
          rowsPerPageOptions={[5]}
          count={companyList.length}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
        />
      </TableContainer>
    </div>
  );
};
