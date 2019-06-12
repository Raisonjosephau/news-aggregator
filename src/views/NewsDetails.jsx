import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import NewsNavbar from "components/Navbars/NewsNavbar";
import SimpleFooter from "components/Footers/SimpleFooter";

class NewsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      temp: "",
      weather: "",
      pubDate: "",
      date: ""
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const { data } = this.props.location;
    console.log(data);
    if (data === undefined) {
      this.props.history.replace(`/`);
    } else {
      this.setState({
        news: data.news,
        temp: data.temp,
        weather: data.weather,
        date: new Date().toString().substring(0, 15),
        pubDate: new Date(data.news.publishedAt).toString().substring(0, 15)
      });
    }
  }

  render() {
    return (
      <>
        <NewsNavbar />
        <main ref="main" className="news-details">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped section-hero">
              <div className="shape shape-style-1 shape-skew bg-gradient-green">
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
                      <h1 className="mt-lg display-1 font-weight-700 text-shadow">
                        {this.state.news.title}
                      </h1>
                    </Col>
                  </Row>
                </div>
              </Container>
              {/* SVG separator */}
            </section>
            {/* 1st Hero Variation */}
          </div>
          <section className="section bg-white">
            <Container>
              <Row>
                <Col lg="9" md="8" className="single-news">
                  <h2 className="font-weight-300 text-shadow-1">
                    {this.state.news.author === null ||
                    this.state.news.author === ""
                      ? "Quite Light"
                      : this.state.news.author}
                  </h2>
                  <h6>{this.state.pubDate}</h6>

                  <Row>
                    <Col lg="12 mt-5">
                      <div className="feature-img">
                        <img
                          className="img-fluid"
                          src={this.state.news.urlToImage}
                          alt=""
                        />
                      </div>
                    </Col>
                    <Col lg="12" className="text-shadow-0 mt-5">
                      <blockquote className="blockquote">
                        <p className="mb-0">{this.state.news.description}</p>
                      </blockquote>
                      <p className="excert mb-3">{this.state.news.content}</p>
                      <a
                        className="text-success"
                        href={this.state.news.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read more
                      </a>
                    </Col>
                  </Row>
                </Col>
                <Col lg="3" md="4" sm="12" className="mt-5">
                  <Row>
                    <Col lg="12" md="12" sm="12" className="mt-5">
                      <div className="single-news mt-1 text-shadow-0 shadow shadow--hover">
                        <div className="thumb">
                          <div className="position-relative">
                            <img
                              className="f-img img-fluid w-100"
                              src={require("assets/img/theme/c1.jpg")}
                              alt=""
                            />
                            <div className="overlay overlay-bg"></div>
                          </div>
                        </div>
                        <div className="details">
                          <div className="top-part d-flex justify-content-between text-white">
                            <div>
                              <h4 className="text-white">
                                {this.state.weather}
                              </h4>
                              <p>{this.state.date}</p>
                            </div>
                            <div>
                              <i className="ni ni-compass-04"></i>
                            </div>
                          </div>
                          <div className="middle-part">
                            <h1 className="text-white">{this.state.temp}ºC</h1>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default NewsDetails;
