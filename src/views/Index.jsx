import React from "react";
// nodejs library that concatenates classes

import axios from 'axios'

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardHeader,
  CardFooter,
  Container,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
} from "reactstrap";

// core components
import NewsNavbar from "components/Navbars/NewsNavbar";
import SimpleFooter from "components/Footers/SimpleFooter";
import TopHeadlines from "components/News/TopHeadlines"

//Weather
import {fetchWeather} from '../actions/weatherAction'

class Landing extends React.Component {
  state = {
    temp:0,
    weather: '',
    news:[],
    sports:[],
    newsLoading:true,
    sportsLoading:true
  };

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    const self = this;
    
    let lat, lng;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(displayLocationInfo, getIPLocation);
    } else {
       
    }
    
    function displayLocationInfo(position) {
       lng = position.coords.longitude;
       lat = position.coords.latitude;
       let data = {lat: lat, lon:lng, "APPID": "c5777ded81048ee9a0dd2cac5144ee57"};
       let params = '?';
       for (const key in data) {
       params += `${key}=${data[key]}&`;
       }
       params = params.slice(0, -1);

       axios.get(`http://api.openweathermap.org/data/2.5/weather${params}`)
        .then(res => {
          const weather = res.data;
          let temp = weather.main.temp - 273.15;
          self.setState({ temp: temp.toFixed()});
          self.setState({ weather: weather.weather[0].description});
          console.log(weather.weather[0].main)
       })
    }
    

    function getIPLocation(error){

      let result= [];
      axios.get(`http://ip-api.com/json`)
       .then(res => {
          result = res.data;

         
          let data = {lat: result.lat, lon: result.lon, "APPID": "c5777ded81048ee9a0dd2cac5144ee57"};
          let params = '?';
          for (const key in data) {
          params += `${key}=${data[key]}&`;
          }
          params = params.slice(0, -1);

          axios.get(`http://api.openweathermap.org/data/2.5/weather${params}`)
            .then(res => {
              const weather = res.data;
              let temp = weather.main.temp - 273.15;
              self.setState({ temp: temp.toFixed()});
              self.setState({ weather: result.city+', '+weather.weather[0].description});
              console.log(weather.weather);
          });
       })


    }

    
    axios.get(`https://newsapi.org/v2/top-headlines?country=in&pageSize=6&apiKey=8cf5a3d6ce014323aa781af50385aa9d`)
      .then(res => {
        const news = res.data;
        self.setState({ news: news.articles});
        self.setState({newsLoading:false});
    });

    axios.get(`https://newsapi.org/v2/top-headlines?country=in&pageSize=4&category=sports&apiKey=8cf5a3d6ce014323aa781af50385aa9d`)
      .then(res => {
        const sports = res.data;
        self.setState({ sports: sports.articles});
        self.setState({ sportsLoading: false});
    });

  }


  
  render() {
    return (
      <>
        <NewsNavbar/>
        <main ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped section-hero">
              <div className="shape shape-style-1 shape-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="py-lg-md d-flex align-items-center">
                <div className="col px-0">
                  <Row>
                    <Col lg="12">
                      <h1 className="display-3 text-white font-weight-400">
                        The best news aggrigator
                      </h1>
                      <p className="lead text-white">Best palce to get your daily news</p>
                      
                    </Col>
                    <Col lg="6 d-flex align-self-center">
                      <Form>
                            <Row>
                              <Col md="9  ">
                                <FormGroup>
                                  <Input
                                    className="form-control-alternative"
                                    id="exampleFormControlInput1"
                                    placeholder="What you are looking for"
                                    type="text"
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <Button color="secondary" type="button">
                                  Search
                                </Button>
                              </Col>
                            </Row>
                        </Form>
                      </Col>
                      <Col lg="6" className="text-right mt-0" >
                          <h1 className="temp-display font-weight-300 text-white mb-0">
                          {this.state.temp}&deg; C
                          </h1>
                      
                        <p className="lead temp-desc display-1 text-white mt-0 mb-0 font-weight-300 sentenceCase">
                        {this.state.weather}
                        </p>
                      </Col>
                  </Row>
                </div>
              </Container>
              {/* SVG separator */}
            </section>
            {/* 1st Hero Variation */}
          </div>
      
          
          <section className="section bg-white">
              <Row className="row-grid d-flex align-items-stretch mx-5">
                <Col lg="12">
                  <Row className="row-grid">
                      <Col lg="9" md="9" className="d-flex align-self-center">
                      {
                        this.state.newsLoading == true?
                          <div className="loader-container d-flex align-items-center">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                          </div>
                        
                         :<TopHeadlines news={this.state.news} title ="Top Headlines"></TopHeadlines>
                      
                      }
                        

                                    
                        {/*  */}
                      </Col>
                      <Col md="3" lg="3">
                          <Card className="bg-white shadow border-0  card-sports">
                              <CardHeader className="bg-white"><h5 className="h3 mb-0 text-success"> <i className="ni ni-trophy"></i> &nbsp;Sports </h5></CardHeader>
                              <CardBody className="p-0">
                                    
                                  <div className="list-group list-group-flush">

                                  {
                                    this.state.sportsLoading===true?
                                    <div className="d-flex align-self-center mt-4 mb-4">
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                    </div>
                                    :
                                    this.state.sports.map(item=>( 
                                      <a href="#home" className="list-group-item list-group-item-action flex-column align-items-start py-4 px-4">
                                        <div className="d-flex w-100 justify-content-between">
                                          <div>
                                            <div className="d-flex w-100 align-items-center">
                                              <h5 className="mb-1">{item.author != null ? item.author: 'Sports Story'}</h5>
                                            </div>
                                          </div>
                                          <small>{item.publishedAt.substring(0, 10)}</small>
                                        </div>
                                        <h4 className="mt-3 mb-1"> {item.title}</h4>
                                      </a>
                                    ))
                                  }
                                </div>
                              </CardBody>
                          </Card>
                      </Col>
                    </Row>
                </Col>  
              </Row>
          </section>
          <section className="section pb-0 bg-gradient-secondary">
            <Container>
              <Row className="row-grid align-items-center">
              <Col className="order-lg-1" lg="4">
                  <Card className="shadow shadow-lg--hover mt-5">
                    <CardBody>
                      <h2 class="my-10 text-center"><b>Entertainment</b></h2>
                    </CardBody>
                  </Card>
                </Col>
                <Col className="order-lg-1" lg="4">
                  <Card className="shadow shadow-lg--hover mt-5">
                    <CardBody>
                      <h2 class="my-10 text-center"><b>Sports</b></h2>
                    </CardBody>
                  </Card>
                </Col>
                <Col className="order-lg-1" lg="4">
                  <Card className="shadow shadow-lg--hover mt-5">
                    <CardBody>
                      <h2 class="my-10 text-center"><b>Health</b></h2>
                    </CardBody>
                  </Card>
                </Col>
                <Col className="order-lg-1" lg="4">
                  <Card className="shadow shadow-lg--hover mt-5">
                    <CardBody>
                      <h2 class="my-10 text-center"><b>Technology</b></h2>
                    </CardBody>
                  </Card>
                </Col>
                <Col className="order-lg-1" lg="4">
                  <Card className="shadow shadow-lg--hover mt-5">
                    <CardBody>
                      <h2 class="my-10 text-center"><b>Science</b></h2>
                    </CardBody>
                  </Card>
                </Col>
                <Col className="order-lg-1" lg="4">
                  <Card className="shadow shadow-lg--hover mt-5">
                    <CardBody>
                      <h2 class="my-10 text-center"><b>Buisness</b></h2>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section section-lg">
            <Container>
              <Row className="justify-content-center text-center mb-lg">
                <Col lg="8">
                  <h2 className="display-3">The amazing Team</h2>
                  <p className="lead text-muted">
                    According to the National Oceanic and Atmospheric
                    Administration, Ted, Scambos, NSIDClead scentist, puts the
                    potentially record maximum.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="mb-5 mb-lg-0" lg="3" md="6">
                  <div className="px-4">
                    <img
                      alt="..."
                      className=" img-center img-fluid shadow shadow-lg--hover"
                      src={require("assets/img/theme/team-1-800x800.jpg")}
                      style={{ width: "200px" }}
                    />
                    <div className="pt-4 text-center">
                      <h5 className="title">
                        <span className="d-block mb-1">Ryan Tompson</span>
                        <small className="h6 text-muted">Web Developer</small>
                      </h5>
                      <div className="mt-3">
                        <Button
                          className="btn-icon-only rounded-circle"
                          color="warning"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-twitter" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="warning"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-facebook" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="warning"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-dribbble" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="mb-5 mb-lg-0" lg="3" md="6">
                  <div className="px-4">
                    <img
                      alt="..."
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                      src={require("assets/img/theme/team-2-800x800.jpg")}
                      style={{ width: "200px" }}
                    />
                    <div className="pt-4 text-center">
                      <h5 className="title">
                        <span className="d-block mb-1">Romina Hadid</span>
                        <small className="h6 text-muted">
                          Marketing Strategist
                        </small>
                      </h5>
                      <div className="mt-3">
                        <Button
                          className="btn-icon-only rounded-circle"
                          color="primary"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-twitter" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="primary"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-facebook" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="primary"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-dribbble" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="mb-5 mb-lg-0" lg="3" md="6">
                  <div className="px-4">
                    <img
                      alt="..."
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                      src={require("assets/img/theme/team-3-800x800.jpg")}
                      style={{ width: "200px" }}
                    />
                    <div className="pt-4 text-center">
                      <h5 className="title">
                        <span className="d-block mb-1">Alexander Smith</span>
                        <small className="h6 text-muted">UI/UX Designer</small>
                      </h5>
                      <div className="mt-3">
                        <Button
                          className="btn-icon-only rounded-circle"
                          color="info"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-twitter" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="info"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-facebook" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="info"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-dribbble" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="mb-5 mb-lg-0" lg="3" md="6">
                  <div className="px-4">
                    <img
                      alt="..."
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                      src={require("assets/img/theme/team-4-800x800.jpg")}
                      style={{ width: "200px" }}
                    />
                    <div className="pt-4 text-center">
                      <h5 className="title">
                        <span className="d-block mb-1">John Doe</span>
                        <small className="h6 text-muted">Founder and CEO</small>
                      </h5>
                      <div className="mt-3">
                        <Button
                          className="btn-icon-only rounded-circle"
                          color="success"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-twitter" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="success"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-facebook" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="success"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-dribbble" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section section-lg pt-0">
            <Container>
              <Card className="bg-gradient-warning shadow-lg border-0">
                <div className="p-5">
                  <Row className="align-items-center">
                    <Col lg="8">
                      <h3 className="text-white">
                        We made website building easier for you.
                      </h3>
                      <p className="lead text-white mt-3">
                        I will be the leader of a company that ends up being
                        worth billions of dollars, because I got the answers. I
                        understand culture.
                      </p>
                    </Col>
                    <Col className="ml-lg-auto" lg="3">
                      <Button
                        block
                        className="btn-white"
                        color="default"
                        href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-landing-page"
                        size="lg"
                      >
                        Download React
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Container>
          </section>
        </main>
        <SimpleFooter/>
      </>
    );
  }
}

export default Landing;
