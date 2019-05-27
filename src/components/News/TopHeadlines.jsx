import PropTypes from 'prop-types'
import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardFooter,
  Col,
  Row
} from "reactstrap";


class TopHeadlines extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      news: this.props.news
    }
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <Row className="d-flex align-items-stretch">
          <h3>Top Headlines</h3>
          <div className="w-100 dropdown-divider"></div>
         {this.props.news.map(item=>(                  
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
                            <h6 className="card-title card-news-title">
                              {item.title}
                            </h6>
                              <footer className="blockquote-footer mt-2">
                                {item.author != null ? item.author: 'News'}
                              </footer>
                        </blockquote>
                  </CardBody>
                  <CardFooter className="px-3 py-3 bg-white">                                            
                        <a
                          className="text-success"
                          href={item.url}
                          target="_blank"
                        >
                          Learn more
                        </a>
                  </CardFooter>
                    </Card>
                </Col>
            ))
          }
      </Row>
    )
  }
}

export default TopHeadlines;