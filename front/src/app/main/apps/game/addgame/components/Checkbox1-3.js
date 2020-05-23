import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 400,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
}));

const useStyles2 = makeStyles({
  root: {
    minWidth: 400,
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
  const classes2 = useStyles2();
  
  const [flag,setFlag] = useState(0);
  const [value, setValue] = useState('None');
  const [value2, setValue2] = useState('None');
  const [value3, setValue3] = useState('None');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChange2 = (event) => {
    setValue2(event.target.value2);
  };

  const handleChange3 = (event) => {
    setValue3(event.target.value3);
  };



  return (

    <Card className={classes2.root}>
    <div className={classes.root}>
      <Grid container spacing={4}>
          <Grid item xs>
            <Paper className={classes.paper}>

              <CardContent>
                <Typography className={classes.title} color="textPrimary" gutterBottom>
                  액션 종류 설정
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup aria-label="select1" name="select1" value={value} onChange={handleChange}>
                    <FormControlLabel value="option1-1" control={<Radio />} label="삭제" />
                    <FormControlLabel value="option1-2" control={<Radio />} label="내 돌로 변경" />
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Paper>
          </Grid>
        
        <Grid item xs={4}>
          <Paper className={classes.paper}>
              <CardContent>
                <Typography className={classes.title} color="textPrimary" gutterBottom>
                  액션 조건 설정
                </Typography>
                <FormControl component="fieldset">
                <RadioGroup aria-label="select2" name="select2" value2={value} onChange={handleChange2}>
                  <FormControlLabel value="option2-1" control={<Radio />} label="인접할 때" onClick={()=>{setFlag(1);}} />
                  <FormControlLabel value="option2-2" control={<Radio />} label="둘러쌀 때" onClick={()=>{setFlag(2);}}/>
                  <FormControlLabel value="option2-3" control={<Radio />} label="상대방 자리에 내 돌을 착수했을 때" onClick={()=>{setFlag(3);}}/>
                </RadioGroup>
                </FormControl>
              </CardContent>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <CardContent>
              <Typography className={classes.title} color="textPrimary" gutterBottom>
              액션 방향 설정
              </Typography>
                <div>
                  {
                    (() => {
                      if (flag === 1 || flag === 2) {
                        return (
                          <FormControl component="fieldset">
                            <RadioGroup aria-label="select3" name="select3" value3={value} onChange={handleChange3}>
                              <FormControlLabel value="option3-1" control={<Radio />} label="양 옆" />
                              <FormControlLabel value="option3-2" control={<Radio />} label="위 아래" />
                              <FormControlLabel value="option3-3" control={<Radio />} label="x 방향" />
                              <FormControlLabel value="option3-4" control={<Radio />} label="+ 방향" />
                              <FormControlLabel value="option3-4" control={<Radio />} label="* 방향" />
                            </RadioGroup>
                          </FormControl>
                        );
                      }
                      else if (flag === 3) { return '추가 설정 없음' }
                      else { }
                    })()
                  }
                </div>
        </CardContent>

          </Paper>
        </Grid>
      </Grid>
    </div>








    </Card>
  );
}