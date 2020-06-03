import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import SelfBattleButton from './SelfBattleButton'

// 1: python 2: c 3:cpp

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTableCellMe = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function RankingTable(props) {
  const classes = useStyles();
  React.useEffect(()=>{
      axios.get(`http://203.246.112.32:8000/api/v1/code/my`, {headers: {'Authorization' : 'jwt ' + window.localStorage.getItem('jwt_access_token')}})
        .then((response)=>{
            const temp_row = response.data.filter((row) => {
              return row.problem === props.battleId;
            });
            setRow(temp_row);
        })
        .catch((error)=>{
            console.log(error);
        });
  },[]);
  const [rows, setRow] = React.useState([]);

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Problem Name</StyledTableCell>
            <StyledTableCell align="center">Code Name</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Language</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            let PL = "";
            if (row.language === 1) {
              PL = "Python";
            } else if (row.language === 2) {
              PL = "C";
            } else {
              PL = "C++";
            }
            return (
              <StyledTableRow key={row.id}>
                <StyledTableCellMe align="center">
                  {row.title}
                </StyledTableCellMe>
                <StyledTableCellMe align="center">{row.name}</StyledTableCellMe>
                <StyledTableCellMe align="left">{row.date}</StyledTableCellMe>
                <StyledTableCellMe align="center">{PL}</StyledTableCellMe>
                <StyledTableCellMe align="center">
                  {`${row.available_game}` ? "X" : "O"}
                </StyledTableCellMe>
                <StyledTableCellMe align="center">
                  <Button variant="contained" color="secondary">
                    <SelfBattleButton/>
                  </Button>
                </StyledTableCellMe>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RankingTable;