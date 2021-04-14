/* eslint-disable spaced-comment */
import { Link } from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';

//CSS
const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: 1000,
    position: 'relative',
    left: 450
  },
  div: {
    backgroundColor: ' #555555'
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

const Row = ({ company, onSave, showView }) => {
  const classes = useStyles();

  return (
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
        {showView ? (
          <Link to='/view'>
            <button className={classes.button}>View</button>
          </Link>
        ) : (
          <button
            className={classes.button}
            onClick={() => {
              onSave(company);
            }}
          >
            Save
          </button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default Row;
