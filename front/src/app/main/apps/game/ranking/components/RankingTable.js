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

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
  container: {
    height: 'auto',
    maxHeight: 440,
    width: '105%'
  },
});

function RankingTable(props) {
  const classes = useStyles();
  React.useEffect(()=>{
      axios.get(`http://203.246.112.32:8000/api/v1/rank/?problem=${props.id}`)
        .then((response)=>{
            console.log(response.data);
            setRow(response.data)
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
            <StyledTableCell align="center">Ranking</StyledTableCell>
            <StyledTableCell align="left">Tier</StyledTableCell>
            <StyledTableCell align="left">User Name</StyledTableCell>
            <StyledTableCell align="left">Score</StyledTableCell>
            {/* <StyledTableCell align="left">Protein&nbsp;(g)</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
              if(row.user === parseInt(window.localStorage.getItem('pk'))){
                  return (
                    <StyledTableRow key={row.user}>
                    <StyledTableCellMe align="center" component="th" scope="row">
                        {index+1}
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
                    <StyledTableRow key={row.user}>
                    <StyledTableCell align="center" component="th" scope="row">
                        {index+1}
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