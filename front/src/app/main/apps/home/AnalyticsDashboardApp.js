import FuseAnimate from "@fuse/core/FuseAnimate";
import Typography from "@material-ui/core/Typography";
import withReducer from "app/store/withReducer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";
import Widget1 from "./widgets/Widget1";
// import Widget2 from './widgets/Widget2';
// import Widget3 from './widgets/Widget3';
// import Widget4 from './widgets/Widget4';
import Widget5 from "./widgets/Widget5";
import Widget6 from "./widgets/Widget6";
// import Widget7 from './widgets/Widget7';
// import Widget8 from './widgets/Widget8';
import Widget9 from "./widgets/Widget9";
import "./components/popup.css";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { Slide } from "react-slideshow-image";
import { autoPlay } from "react-swipeable-views-utils";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
} //----------------------------------------------

// UseStyles
const useStyles = makeStyles((theme) => ({
  // Modal paper
  paper: {
    position: "absolute",
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const slideImages = [
  "assets/images/profile/1.jpg",
  "assets/images/profile/2-1.jpg",
  "assets/images/profile/3.jpg",
  "assets/images/profile/4.jpg",
  "assets/images/profile/5.jpg",
  "assets/images/profile/6.jpg",
  "assets/images/profile/7.jpg",
  "assets/images/profile/8.jpg",
  "assets/images/profile/9.jpg",
];

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  pauseOnHover: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  },
};

function AnalyticsDashboardApp() {
  const dispatch = useDispatch();
  const widgets = useSelector(
    ({ analyticsDashboardApp }) => analyticsDashboardApp.widgets.data
  );
  const classes = useStyles();

  // Modal constants
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(Actions.getWidgets());
  }, [dispatch]);

  if (!widgets) {
    return null;
  }
  return (
    <div className="w-full">
      <div className="mx-auto sm:px-16">
        <Button
          onClick={handleOpen}
          style={{
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 10,
            paddingLeft: 40,
            paddingRight: 40,
            height: 40,
          }}
          variant="contained"
          color="primary"
        >
          ㅇㅅㅇ 서비스 이용 안내 가이드
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            {/* <h2 id="simple-modal-title">ㅇㅅㅇ 서비스 이용 안내 가이드</h2>
            <Divider orientation="horizental" flexItem /> */}
            <div className="slide-container">
              <Slide {...properties}>
                <div className="each-slide">
                  <div
                    style={{ backgroundImage: `url(${slideImages[0]})` }}
                  ></div>
                </div>
                <div className="each-slide">
                  <div
                    style={{ backgroundImage: `url(${slideImages[1]})` }}
                  ></div>
                </div>
                <div className="each-slide">
                  <div
                    style={{ backgroundImage: `url(${slideImages[2]})` }}
                  ></div>
                </div>
                <div className="each-slide">
                  <div
                    style={{ backgroundImage: `url(${slideImages[3]})` }}
                  ></div>
                </div>
                <div className="each-slide">
                  <div
                    style={{ backgroundImage: `url(${slideImages[4]})` }}
                  ></div>
                </div>
                <div className="each-slide">
                  <div
                    style={{ backgroundImage: `url(${slideImages[5]})` }}
                  ></div>
                </div>
                <div className="each-slide">
                  <div
                    style={{ backgroundImage: `url(${slideImages[6]})` }}
                  ></div>
                </div>
                <div className="each-slide">
                  <div
                    style={{ backgroundImage: `url(${slideImages[7]})` }}
                  ></div>
                </div>
                <div className="each-slide">
                  <div
                    style={{ backgroundImage: `url(${slideImages[8]})` }}
                  ></div>
                </div>
              </Slide>
            </div>
          </div>
        </Modal>
      </div>

      <Widget1 data={widgets.widget1} />

      <FuseAnimate animation="transition.slideUpIn" delay={200}>
        <div className="flex flex-col md:flex-row sm:p-8 container">
          <div className="flex flex-1 flex-col min-w-0">
            <FuseAnimate delay={600}>
              <Typography className="p-0 pb-0 text-18 font-0">
                {/* S */}
              </Typography>
            </FuseAnimate>

            {/* <div className="flex flex-col sm:flex sm:flex-row pb-32">
							<div className="widget flex w-full sm:w-1/3 p-16">
							{/* <Router>
								<div>
									<Link component={RouterLink} to="apps/game/problemIdx">
										<Widget2 data={widgets.widget2} />
									</Link>
								</div>
							</Router> */}

            {/* <div className="widget flex w-full sm:w-1/3 p-16">
								<Widget3 data={widgets.widget3} />
							</div>

							<div className="widget w-full sm:w-1/3 p-16">
								<Widget4 data={widgets.widget4} />
							</div> */}

            <FuseAnimate delay={600}>
              <Typography className="px-18 pb-8 tex-30 font-900">
                <h1>Community</h1>
              </Typography>
            </FuseAnimate>

            <div className="widget w-full p-16 pb-32">
              <Widget5 data={widgets.widget5} />
            </div>

            {/* <FuseAnimate delay={600}>
							<Typography className="px-16 pb-8 text-18 font-300">Where are your users?</Typography>
						</FuseAnimate> */}

            <div className="widget w-full p-16 pb-32">
              <Widget6 data={widgets.widget6} />
            </div>
          </div>

          <div className="flex flex-wrap w-full md:w-320 pt-16">
            {/* <div className="mb-32 w-full sm:w-1/2 md:w-full">
							<FuseAnimate delay={600}>
								<Typography className="px-16 pb-8 text-18 font-300">
									What are your top devices?
								</Typography>
							</FuseAnimate>

							<div className="widget w-full p-16">
								<Widget7 data={widgets.widget7} />
							</div>
						</div>

						<div className="mb-32 w-full sm:w-1/2 md:w-full">
							<FuseAnimate delay={600}>
								<div className="px-16 pb-8 text-18 font-300">How are your sales?</div>
							</FuseAnimate>

							<div className="widget w-full p-16">
								<Widget8 data={widgets.widget8} />
							</div>
						</div> */}

            <div className="mb-32 w-full sm:w-1/2 md:w-full">
              <FuseAnimate delay={600}>
                <Typography className="px-16 pb-8 text-18 font-900 lg:pt-0">
                  <h1>RANK</h1>
                </Typography>
              </FuseAnimate>
              <div className="widget w-full p-16">
                <Widget9 data={widgets.widget9} />
              </div>
            </div>
          </div>
        </div>
      </FuseAnimate>
    </div>
  );
}

export default withReducer(
  "analyticsDashboardApp",
  reducer
)(AnalyticsDashboardApp);
