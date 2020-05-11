import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles({
  root: {
    minWidth: 300,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(1.6)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();

  const [flag,setFlag] = useState(0);
  const [flag2,setFlag2] = useState(0);
  const [value, setValue] = useState('None');
  const [X, setX] = useState(0);
  const [Y, setY] = useState(0);

  const handleChangeX = (event) => {
    setX(event.target.x);
  };

  const handleChangeY = (event) => {
    setY(event.target.y);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };



  return (
    <Card className={classes.root}>
      {/* <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
        착수 종류 설정
        </Typography>
        <FormControl component="fieldset">
      <RadioGroup aria-label="select2" name="select2" value={value} onChange={handleChange}>
        <FormControlLabel value="option2-1" control={<Radio />} label="이동" />
        <FormControlLabel value="option2-2" control={<Radio />} label="추가" />
        <FormControlLabel value="option2-3" control={<Radio />} label="둘 다" />
      </RadioGroup>
    </FormControl>
      </CardContent> */}

      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
        착수 방식 설정
        </Typography>
        <FormControl component="fieldset">
      <RadioGroup aria-label="select2" name="select2" value={value} onChange={handleChange}>
        <FormControlLabel value="option2-1" control={<Radio />} label="이동" onClick={()=>{setFlag(1);}}/>
        <FormControlLabel value="option2-2" control={<Radio />} label="추가" onClick={()=>{setFlag(2);}}/>
        <FormControlLabel value="option2-3" control={<Radio />} label="둘 다" onClick={()=>{setFlag(3);}}/>
      </RadioGroup>
        </FormControl>

 
      </CardContent>
      <CardContent>
       <Typography className={classes.title} color="textPrimary" gutterBottom>
       거리 설정
       </Typography>
      <div>
				{
						(() => {
						  if (flag === 1 || flag === 3) {
							return (

                <FormControl component="fieldset">
                <RadioGroup aria-label="select3" name="select3" value={value} onChange={handleChange}>
                  <FormControlLabel value="option3-1" control={<Radio />} label="4방향" onClick={()=>{setFlag2(1);}}/>
                  <FormControlLabel value="option3-2" control={<Radio />} label="8방향(대각 포함)" onClick={()=>{setFlag2(2);}}/>
                  <FormControlLabel value="option3-3" control={<Radio />} label="커스텀" onClick={()=>{setFlag2(3);}}/>
                  <FormControlLabel value="option3-4" control={<Radio />} label="어디에나" onClick={()=>{setFlag2(4);}}/>
                </RadioGroup>
                </FormControl>
              );
							  }
              else{  }
						})()
				}
        </div>
        </CardContent>
        <CardContent>
      <div>
				{
						(() => {
						  if ((flag === 1 || flag ===3) && flag2 === 3) {
							return (
              <div>
                <TextField
                id="outlined-multiline-flexible"
                label="X 거리"
                multiline
                rowsMax={4}
                value={X}
                onChange={handleChangeX}
                variant="outlined"
              />
              <div>　</div>
              <TextField
              id="outlined-multiline-flexible"
              label="Y거리"
              multiline
              rowsMax={4}
              value={Y}
              onChange={handleChangeY}
              variant="outlined"
            />
            </div>
              );
							  }
              else if(flag === 2){ return '추가 설정 없음' }
              else{ }
						})()
				}
        </div>
        </CardContent>




    </Card>    
  );
}