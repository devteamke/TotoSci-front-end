import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Snackbar from "../../../components/dcomponents/Snackbar/Snackbar.jsx";
import GridItem from "../../../components/dcomponents/Grid/GridItem.jsx";
import GridContainer from "../../../components/dcomponents/Grid/GridContainer.jsx";
import Card from "../../../components/dcomponents/Card/Card.jsx";
import CardHeader from "../../../components/dcomponents/Card/CardHeader.jsx";
import CardBody from "../../../components/dcomponents/Card/CardBody.jsx";
import globals from "../../../constants/Globals";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCardText
} from "mdbreact";
import ReactDOM from "react-dom";
import { withGlobalContext } from "../../../context/Provider";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  btnBg: {
    backgroundColor: "#01afc4!important"
  }
};
class AllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serverRes: "",
      loading: true,
      loaded: false,
      courses: [],
      page: 1,
      limit: 6,
      //skip:0,
      //snack
      open: false,
      place: "bc",
      resType: "warning",
      query: "",
      totalPages: null,
      hasNext: null,
      hasPrev: null,
      totalDocs: null
    };
    this.myRef = React.createRef();
    this.MasonryRef = React.createRef();
  }
  _fetchUsers = () => {
    let state = this.state;
    let data = {
      limit: state.limit,
      page: state.page,
      query: state.query
    };
    const FetchAsync = async () =>
      await (await fetch(
        `${globals.BASE_URL}/api/${this.props.global.user.role}/all_courses`,
        {
          method: "post",
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            Authorization: this.props.global.token
            // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(data)
        }
      )).json();

    FetchAsync()
      .then(data => {
        //this.setState({currentPlace:data.results})
        if (data.success) {
          console.log("[Courses]", data);
          this.setState(
            {
              courses: data.result.docs,
              page: data.result.page,
              totalPages: data.result.totalPages,
              totalDocs: data.result.totalDocs,
              hasNext: data.result.hasNextPage,
              hasPrev: data.result.hasPrevPage
            },
            () => setTimeout(() => this.arrangeMasonry(), 1)
          );
        } else {
          this._snack({ type: "warning", msg: data.message });
        }
        this.setState({
          loading: false,
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);
        if (error == "TypeError: Failed to fetch") {
          this.setState({
            serverRes: "Failed to contact server!"
          });
        } else if (error.message == "Network request failed") {
          // alert('No internet connection')
          this.setState({
            serverRes: "Network request failed"
          });
        }

        console.log(error);
        this.setState({
          open: true,
          resType: data.success ? "success" : "warning"
        });
        setTimeout(
          function() {
            this.setState({ open: false });
          }.bind(this),
          6000 * 9999
        );
      });
  };
  _handlePrevious = () => {
    this.setState(
      {
        page: this.state.page - 1,
        loading: true,
        loaded: false
      },
      () => {
        this._fetchUsers();
      }
    );
  };
  _handleNext = () => {
    // console.log('[offset]',-this.myRef.current.offsetTop)
    //  window.scrollTo(0, -this.myRef.current.offsetTop);
    this.myN.scrollIntoView({ block: "start" });
    this.setState(
      {
        page: this.state.page + 1,
        loading: true,
        loaded: false
      },
      () => {
        this._fetchUsers();
      }
    );
  };
  _handleSearch = event => {
    this.setState(
      {
        query: event.target.value,
        loading: true,
        loaded: false
      },
      () => {
        this._fetchUsers();
      }
    );
  };
  _snack = params => {
    if (this.props.location.snack) {
      let snack = this.props.location.snack;
      this.setState({ open: true, resType: snack.type, serverRes: snack.msg });
      setTimeout(
        function() {
          this.setState({ open: false });
        }.bind(this),
        9000
      );
    } else if (params) {
      this.setState({
        open: true,
        resType: params.type,
        serverRes: params.msg
      });
      setTimeout(
        function() {
          this.setState({ open: false });
        }.bind(this),
        9000
      );
    }
  };
  componentDidMount = () => {
    this._fetchUsers();
    this._snack();
  };
  arrangeMasonry = () => {
    const numCols = 3;
    const colHeights = Array(numCols).fill(0);
    const container = ReactDOM.findDOMNode(this.MasonryRef.current);
    const container2 = this.MasonryRef;
    console.log("container", container);
    console.log("container2", container2);
    Array.from(container.children).forEach((child, i) => {
      const order = i % numCols;
      child.style.order = order;
      colHeights[order] += parseFloat(child.clientHeight);
    });
    container.style.height = Math.max(...colHeights) + "px";
  };

  render = () => {
    const { classes } = this.props;
    const state = this.state;

    return (
      <div
        ref={el => {
          this.myN = el;
        }}
      >
        <Snackbar
          place={this.state.place}
          color={state.resType}
          icon={AddAlert}
          message={state.serverRes}
          open={this.state.open}
          closeNotification={() => this.setState({ open: false })}
          close
        />

        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>All Courses</h4>
                <p className={classes.cardCategoryWhite}>...</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    style={{ paddingHorizontal: "70px" }}
                  >
                    <div
                      style={{
                        width: "15rem",
                        marginTop: "3px",
                        float: "left"
                      }}
                    >
                      <MDBBtn
                        size=""
                        style={{ display: "inline-block" }}
                        onClick={() => {
                          this.props.history.push({
                            pathname: `/${this.props.global.user.role}/courses/add`,
                            data: ""
                          });
                        }}
                      >
                        Add Course
                      </MDBBtn>
                    </div>
                    <div style={{ width: "15rem", float: "right" }}>
                      <MDBInput
                        responsive
                        label={"Search"}
                        icon="search"
                        group
                        value={state.email}
                        onChange={this._handleSearch}
                        type="text"
                      />
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardBody style={{ display: "block", overflow: "auto" }}>
                {state.loading ? (
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <div className="text-center" style={{ height: 300 }}>
                        <div
                          className="spinner-grow text-info"
                          role="status"
                          style={{ marginTop: 150 }}
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    </GridItem>
                  </GridContainer>
                ) : (
                  <>
                    <GridContainer
                      className="masonry-with-columns"
                      ref={this.MasonryRef}
                    >
                      {state.courses.length > 0 ? (
                        <>
                          {state.courses.map(each => {
                            return (
                              <div style={{ width: "29rem", margin: "1rem" }}>
                                <MDBCard
                                  key={each._id}
                                  style={{ width: "100%", margin: "1rem" }}
                                  onClick={() => {
                                    this.props.history.push({
                                      pathname: `/${this.props.global.user.role}/courses/single`,
                                      data: each
                                    });
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  {console.log("Each Course", each)}
                                  <MDBCardBody>
                                    <MDBCardTitle>{each.name}</MDBCardTitle>
                                    <MDBCardText>
                                      <p>{each.description}</p>
                                      <div style={{}}>
                                        <p>
                                          <i>Ksh {each.charge}</i>
                                        </p>
                                      </div>
                                    </MDBCardText>
                                  </MDBCardBody>
                                </MDBCard>
                              </div>
                            );
                          })}
                          {/* // <GridContainer>
                      //   {state.courses.map(each => {
                      //     return (
                      //       <GridItem xs={12} sm={6} key={each._id} md={3}>
                      //         {" "}
                      //         <MDBCard
                      //           style={{ width: "22rem", margin: "1rem" }}
                      //           onClick={() => {
                      //             this.props.history.push({
                      //               pathname: `/${this.props.global.user.role}/courses/single`,
                      //               data: each
                      //             });
                      //           }}
                      //           style={{ cursor: "pointer" }}
                      //         >
                      //           {console.log("Each Course", each)}
                      //           <MDBCardBody>
                      //             <MDBCardTitle>{each.name}</MDBCardTitle>
                      //             <MDBCardText>
                      //               <p>{each.description}</p>
                      //               <div style={{}}>
                      //                 <p>
                      //                   <i>Ksh {each.charge}</i>
                      //                 </p>
                      //               </div>
                      //             </MDBCardText>
                      //           </MDBCardBody>
                      //         </MDBCard>
                      //       </GridItem>
                      //     );
                      //   })}
                      // </GridContainer>*/}
                        </>
                      ) : (
                        <div
                          className="text-center"
                          style={{ height: 300, width: "100%" }}
                        >
                          <p style={{ marginTop: 145 }}>
                            {" "}
                            {state.query
                              ? `No records found matching \" ${state.query}\"`
                              : "No Courses yet"}
                          </p>{" "}
                        </div>
                      )}
                    </GridContainer>
                  </>
                )}
              </CardBody>
              {state.loaded && state.courses.length > 0 ? (
                <div className="text-center">
                  {state.hasPrev ? (
                    <MDBBtn
                      size="sm"
                      style={{ display: "inline-block" }}
                      onClick={this._handlePrevious}
                    >
                      <MDBIcon size="2x" icon="angle-double-left" />
                    </MDBBtn>
                  ) : null}
                  <h4 style={{ display: "inline-block", margin: "25px 30px" }}>
                    {state.page} of {state.totalPages}
                  </h4>
                  {state.hasNext ? (
                    <MDBBtn
                      size="sm"
                      style={{ display: "inline-block" }}
                      onClick={this._handleNext}
                    >
                      <MDBIcon size="2x" icon="angle-double-right" />
                    </MDBBtn>
                  ) : null}

                  <p style={{ color: "grey" }}>
                    (Showing {state.courses.length} of {state.totalDocs}{" "}
                    courses){" "}
                  </p>
                </div>
              ) : null}
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  };
}

export default withGlobalContext(withStyles(styles)(AllUsers));
