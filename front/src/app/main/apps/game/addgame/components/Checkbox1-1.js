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


export default function SimpleCard() {
  const classes = useStyles();
 
  const [value, setValue] = useState('None');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [checked, setChecked] = React.useState(true);




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
                      <FormControlLabel value="option1-1" control={<Radio />} label="오목 돌" />
                      <FormControlLabel value="option1-2" control={<Radio />} label="체스" />
                      <FormControlLabel value="option1-3" control={<Radio />} label="포(장기)" />
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