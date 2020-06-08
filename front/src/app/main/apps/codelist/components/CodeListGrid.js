import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CodeListTable from './CodeListTable';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'w-full',
    justify: 'center',
    marginTop: '50px'
  },
  paper: {
    height: 'auto',
    width: 'auto',
    minWidth: 'auto'
  },
}));

function SpacingGrid(props) {
  const [codes, setCodes] = React.useState([]);
  const [spacing] = React.useState(10);
  const classes = useStyles(props);

  var header = {
    Authorization: "jwt " + window.localStorage.getItem("jwt_access_token"),
  };

  return (
        <Grid container className="w-full" justify="center" style={{marginTop: '50px'}} spacing={10}>
            <Grid item xs={10}>
                <Grid container justify="center" spacing={spacing}>
                  <Paper className={classes.paper}>
                    <CodeListTable/>
                  </Paper>
                </Grid>
            </Grid>
        </Grid>
  );
}

export default SpacingGrid;