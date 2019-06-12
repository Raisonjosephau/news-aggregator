import React from "react";
import { Card, CardBody, CardImg, CardFooter, Col, Row } from "reactstrap";

import { Link } from "react-router-dom";

class TopHeadlines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: this.props.news
    };
  }
  componentDidMount() {}
  render() {
    return (
      <Row className="d-flex align-items-stretch">
        <h3 className="mb-0 mt-3 font-weight-800">{this.props.title}</h3>
        <div className="w-100 dropdown-divider"></div>
        {this.props.news.map(item => (
          <Col md="6" lg="4" className="p-2 d-flex align-items-stretch">
            <Card className="bg-white shadow border-0 card-news d-flex align-items-stretch">
              <CardImg
                alt="..."
                src={item.urlToImage}
                top
                className="card-img"
              />
              <CardBody className="py-3 px-3">
                <blockquote className="blockquote">
                  <h6 className="card-title card-news-title">{item.title}</h6>
                </blockquote>
              </CardBody>
              <CardFooter className="px-3 py-3 bg-white">
                <Link
                  className="text-success"
                  to={{
                    pathname: "/news",
                    data: {
                      news: item,
                      temp: this.props.temp,
                      weather: this.props.weather
                    } // your data array of objects
                  }}
                >
                  Read more
                </Link>
              </CardFooter>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
}

export default TopHeadlines;
