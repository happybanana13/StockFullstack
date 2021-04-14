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
import Row from './row';

export const Home = () => {
  // eslint-disable-next-line no-unused-vars

  //States
  const [companyList, setCompanyList] = useState([]);
  const [savedList, setSavedList] = useState([]);
  //Fetch api which have search query, setting intital state from those
  useEffect(() => {
    const fetchCompanies = async () => {
      await axios
        .get('https://financialmodelingprep.com/api/v3/search?query=A&limit=100&exchange=NASDAQ&apikey=demo')
        .then((jsonResponse) => setCompanyList(jsonResponse.data));
    };
    const fetchSavedCompanies = async () => {
      await axios.get('/api/db').then((jsonResponse) => setSavedList(jsonResponse.data.data));
    };
    fetchCompanies();
    fetchSavedCompanies();
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
    }
  });

  const classes = useStyles();
  //Pagination
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  //Updating DB by clicking save button
  const saveCompany = async (company) => {
    await axios.post('/api/', company, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setSavedList((previousSavedList) => [...previousSavedList, company]);
  };

  return (
    <div className={classes.div}>
      <div>
        <h1 className={classes.h1} align='center'>
          Home Page
        </h1>
        <Link to='/View'>
          <h3 className={classes.h3}>View Page</h3>
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
              <Row
                key={company.symbol}
                company={company}
                onSave={saveCompany}
                showView={!!savedList.find((savedCompany) => savedCompany.symbol === company.symbol)}
              />
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
