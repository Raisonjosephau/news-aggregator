import React from "react";
// nodejs library that concatenates classes

import axios from 'axios'

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardHeader, 
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


class Landing extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      temp:0,
      weather: '',
      news:[],
      sports:[],
      search:[],
      newsLoading:true,
      sportsLoading:true,
      searchData:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchNews = this.searchNews.bind(this);
  }

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

    axios.get(`https://newsapi.org/v2/top-headlines?country=in&pageSize=5&category=sports&apiKey=8cf5a3d6ce014323aa781af50385aa9d`)
      .then(res => {
        const sports = res.data;
        self.setState({ sports: sports.articles});
        self.setState({ sportsLoading: false});
    });

  }
  
  handleChange(event) {
    if( event.target.value === "") this.setState({search:[]})
    this.setState({searchData: event.target.value});
  }

  searchNews(event){  
    event.preventDefault();
    const query = this.state.searchData;
    this.setState({ newsLoading: true});
    axios.get(`https://newsapi.org/v2/everything?q=${query}&pageSize=9&sortBy=relevancy&apiKey=8cf5a3d6ce014323aa781af50385aa9d`)
      .then(res => {
        const search = res.data;
        this.setState({ search: search.articles});
        this.setState({ newsLoading: false});
    });
  }

  
  render() {
    return (
      <>
        <NewsNavbar/>
        <main ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped section-hero pb-0">
              <div className="shape shape-style-1 shape-primary bg-gradient-danger">
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
              <Container className="py-lg-md d-flex align-items-center pb-0">
                <div className="col px-0">
                  <Row>
                    <Col lg="12">
                      <h1 className="display-2 text-white font-weight-800">
                        The reason behind everything
                      </h1>
                      <p className="lead text-white">Best palce to get your daily news</p>
                      
                    </Col>
                    <Col md="8" lg="8" className="mx-auto my-auto">
                      <Form onSubmit={this.searchNews}>
                            <Row>
                              <Col md="8" lg="8">
                                <FormGroup>
                                  <Input
                                    className="form-control-alternative"
                                    id="search"
                                    name="search"
                                    placeholder="What you are looking for"
                                    type="text"
                                    onChange={this.handleChange}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="3" lg="3">
                                <Button color="secondary" type="submit">
                                  Search
                                </Button>
                              </Col>
                            </Row>
                        </Form>
                      </Col>
                      <Col lg="4"  md="4" className="text-right mt-0 mb-0 " >
                          
                         <div class="temperature entypo-light-up">

                              <h2 className="text-white mb-0">
                                {this.state.temp}<span class="degree-symbol">°c</span>
                              </h2>
                            
                              <p className="lead temp-desc display-1 text-white my-0 font-weight-light sentenceCase">
                              {this.state.weather}
                              </p>
                        </div>
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
                        this.state.newsLoading === true?
                          <div className="loader-container d-flex align-items-center">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                          </div>
                        
                         :this.state.search.length === 0?<TopHeadlines news={this.state.news} title ="Top Headlines"></TopHeadlines>
                         :<TopHeadlines news={this.state.search} title ={"Search results for '" + this.state.searchData+ "'"}></TopHeadlines>
                      
                      }
                        
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
                                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="list-group-item list-group-item-action flex-column align-items-start py-4 px-4">
                                      
                                            <div className="sports-autor">
                                              <h5 className="mb-1">{item.author != null ? item.author: 'Sports Story'}</h5>
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
        </main>
        <SimpleFooter/>
      </>
    );
  }
}

export default Landing;
