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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableCellMe = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
      color: theme.palette.error.main,
    },
  }))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(ranking, tier, username, score) {
  return { ranking, tier, username, score };
}

const rows = [
  createData('1', 'challenger', 'asdfasdf', 24, 4.0),
  createData('2', 'platinum', 'ehfrptsp', 37, 4.3),
  createData('3', 'gold', '환장하겟네', 24, 6.0),
  createData('4', 'silver', '바큐', 67, 4.3),
  createData('5', 'bronze', 'kkkkkk', 49, 3.9),
  createData('1', 'challenger', 'asdfasdf', 24, 4.0),
  createData('2', 'platinum', 'ehfrptsp', 37, 4.3),
  createData('3', 'gold', '환장하겟네', 24, 6.0),
  createData('4', 'silver', '바큐', 67, 4.3),
  createData('5', 'bronze', 'kkkkkk', 49, 3.9),
  createData('1', 'challenger', 'asdfasdf', 24, 4.0),
  createData('2', 'platinum', 'ehfrptsp', 37, 4.3),
  createData('3', 'gold', '환장하겟네', 24, 6.0),
  createData('4', 'silver', '바큐', 67, 4.3),
  createData('5', 'bronze', 'kkkkkk', 49, 3.9),
  createData('1', 'challenger', 'asdfasdf', 24, 4.0),
  createData('2', 'platinum', 'ehfrptsp', 37, 4.3),
  createData('3', 'gold', '환장하겟네', 24, 6.0),
  createData('4', 'silver', '바큐', 67, 4.3),
  createData('5', 'bronze', 'kkkkkk', 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  container: {
    maxHeight: 440,
    width: '105%'
  },
});

function RankingTable() {
  const classes = useStyles();
  React.useEffect(()=>{
      axios.get('http://203.246.112.32:8000/api/v1/userInformationInProblem/', {headers: {'Authorization' : 'jwt ' + window.localStorage.getItem('jwt_access_token')}})
        .then((response)=>{
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        });
  });
  const [row, setRow] = React.useState('top');

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Ranking</StyledTableCell>
            <StyledTableCell align="left">Tier</StyledTableCell>
            <StyledTableCell align="left">User Name</StyledTableCell>
            <StyledTableCell align="left">Score</StyledTableCell>
            {/* <StyledTableCell align="left">Protein&nbsp;(g)</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
              if(row.username === '바큐'){
                  return (
                    <StyledTableRow key={row.ranking}>
                    <StyledTableCellMe align="center" component="th" scope="row">
                        {row.ranking}
                    </StyledTableCellMe>
                    <StyledTableCellMe align="left">{row.tier}</StyledTableCellMe>
                    <StyledTableCellMe align="left">{row.username}</StyledTableCellMe>
                    <StyledTableCellMe align="left">{row.score}</StyledTableCellMe>
                    {/* <StyledTableCellMe align="left">{row.protein}</StyledTableCellMe> */}
                    </StyledTableRow>
                  )
              }
              else{
                  return(
                    <StyledTableRow key={row.ranking}>
                    <StyledTableCell align="center" component="th" scope="row">
                        {row.ranking}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.tier}</StyledTableCell>
                    <StyledTableCell align="left">{row.username}</StyledTableCell>
                    <StyledTableCell align="left">{row.score}</StyledTableCell>
                    {/* <StyledTableCell align="left">{row.protein}</StyledTableCell> */}
                    </StyledTableRow>
                  )
              }
        })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RankingTable;