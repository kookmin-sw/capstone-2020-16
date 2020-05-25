import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    minHeight: 250,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(1.6)',
  },
  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
});


export default function SimpleCard(props) {
  const classes = useStyles();
 
  const [value, setValue] = useState(sessionStorage.getItem("pieceType1"));
  const handleChange = (event) => {
    setValue(event.target.value);
  };


  // sessionStorage.getItem("startType1"),
  // sessionStorage.getItem("distance1"),
  // sessionStorage.getItem("customDistance1"),
  // sessionStorage.getItem("actionType1"),
  // sessionStorage.getItem("actionCondition1"),
  // sessionStorage.getItem("actionDirection1")


  return (
    <Card className={classes.root}>
      
      <CardContent>
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item xs>
              <Paper className={classes.paper}>
                <CardContent>
                  <Typography className={classes.title} color="textPrimary" gutterBottom>
                  돌 종류 설정
                  </Typography> 
                  <FormControl component="fieldset">
                    <RadioGroup aria-label="select1" name="select1" value={value} onChange={handleChange}>
                      <FormControlLabel value="concave" control={<Radio />} label="오목 돌" onClick={(event)=>{sessionStorage.setItem("pieceType1", "concave");}} />

                      <FormControlLabel value="chess" control={<Radio />} label="체스" onClick={()=>{sessionStorage.setItem("pieceType1", "chess");}} />
                      <FormControlLabel value="xiangqi" control={<Radio />} label="포(장기)" onClick={()=>{sessionStorage.setItem("pieceType1", "xiangqi");}} />
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </CardContent>

  

    <Divider/>
    </Card>
   
  );
}