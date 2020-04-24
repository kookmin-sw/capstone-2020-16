import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import RankingTable from './RankingTable'

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
  const [spacing, setSpacing] = React.useState(10);
  const classes = useStyles(props);

  return (
        <Grid container className="w-full" justify="center" style={{marginTop: '50px'}} spacing={10}>
            <Grid item xs={10}>
                <Grid container justify="center" spacing={spacing}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
                        <Grid key={value} item>
                            <Paper className={classes.paper}>
                                <h1>Game title</h1>
                                <RankingTable/>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
  );
}

export default SpacingGrid;