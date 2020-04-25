import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import RankingTable from './RankingTable';
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
  const [game, setGame] = React.useState([]);
  const [spacing, setSpacing] = React.useState(10);
  const classes = useStyles(props);
  React.useEffect(()=>{
    axios.get('http://203.246.112.32:8000/api/v1/problem/')
      .then((response)=>{
        console.log(response.data)
        setGame(response.data.results)
      })
      .catch((error)=>{
        console.log(error)
      });
  }, []);

  return (
        <Grid container className="w-full" justify="center" style={{marginTop: '50px'}} spacing={10}>
            <Grid item xs={10}>
                <Grid container justify="center" spacing={spacing}>
                    {game.map((games) => (
                        <Grid key={games.id} item>
                            <Paper className={classes.paper}>
                              <h1>{games.title}</h1>
                                <RankingTable id={games.id}/>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
  );
}

export default SpacingGrid;