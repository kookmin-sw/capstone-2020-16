import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import FuseAnimate from "@fuse/core/FuseAnimate";
import Typography from "@material-ui/core/Typography";
// import SimpleExpansionPanel from "./components/CardContent";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles((theme) => ({
  header: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
  gamename: {
    margin: theme.spacing(5),
  },
  panel: {
    margin: theme.spacing(2),
  }
}));

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(name) {
  return {
    name,
    history: [
      { date: "2020-01-05", time: "12:07", language: "Python", error: "O" },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Submit Time</TableCell>
                    <TableCell align="right">Language</TableCell>
                    <TableCell align="right">Error</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.time}</TableCell>
                      <TableCell align="right">{historyRow.language}</TableCell>
                      <TableCell align="right">{historyRow.error}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    history: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        language: PropTypes.string.isRequired,
        error: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData("아"),
  createData("아아"),
  createData("아아아"),
  createData("아아아아"),
  createData("아아아아아"),
];

function CodeListPage(props) {

    const classes = useStyles(props);

    return (
      <div className="flex flex-col flex-auto flex-shrink-0 w-full">
        <div
          className={clsx(
            classes.header,
            "relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-288"
          )}
        >
          <FuseAnimate
            animation="transition.slideUpIn"
            duration={400}
            delay={100}
          >
            <Typography
              color="inherit"
              className="text-24 sm:text-40 font-light"
            >
              Code List
            </Typography>
          </FuseAnimate>
        </div>
        {/* <div className={classes.gamename}>
          <h2>세균전 level 01</h2>
        </div>
        <div className={classes.panel}>
          <SimpleExpansionPanel></SimpleExpansionPanel>
        </div> */}
        <div>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell><h1>세균전 Level 01</h1></TableCell>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row key={row.name} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
}

export default CodeListPage;

