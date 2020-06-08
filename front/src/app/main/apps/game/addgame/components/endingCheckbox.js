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
 
  const [value, setValue] = useState(sessionStorage.getItem("EndingType"));
  // console.log(sessionStorage.getItem("EndingType"));
  const handleChange = (event) => {
    setValue(event.target.value);
  };




  return (
    <Card className={classes.root}>
      
      <CardContent>
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item xs>
              <Paper className={classes.paper}>
                <CardContent>
                  <Typography className={classes.title} color="textPrimary" gutterBottom>
                  엔딩 종류 설정
                  </Typography> 
                  <FormControl component="fieldset">
                    <RadioGroup aria-label="select1" name="select1" value={value} onChange={handleChange}>
                      <FormControlLabel value="보드판 가득 찼을 때" control={<Radio />} label="보드판 가득 찼을 때" onClick={(event)=>{sessionStorage.setItem("EndingType", "보드판 가득 찼을 때");}} />
                      <FormControlLabel value="한 쪽 유저의 돌만 남았을 때" control={<Radio />} label="한 쪽 유저의 돌만 남았을 때" onClick={()=>{sessionStorage.setItem("EndingType", "한 쪽 유저의 돌만 남았을 때");}} />
                      <FormControlLabel value="disabled" disabled control={<Radio />} label="한 줄일 때" onClick={()=>{sessionStorage.setItem("EndingType", "한 줄일 때");}} />
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