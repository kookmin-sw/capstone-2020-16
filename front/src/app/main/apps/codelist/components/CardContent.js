import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
          margin: theme.spacing(1),
          width: "100%",
          height: "100%",
      }
  },
}));

export default function SimpleExpansionPanel() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Codename_01</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.paper}>
            <Paper elevation={3}>
              
            </Paper>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Divider></Divider>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Codename_02</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.paper}>
            <Paper elevation={3}>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </Paper>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
