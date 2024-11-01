import React, { Component } from 'react';

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl} = this.props;
    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img src={!imageUrl?"https://news.cornell.edu/sites/default/files/styles/story_thumbnail_lg/public/dreamstime_l_75827730_1.jpg?itok=-7PqJDCP":imageUrl} className="card-img-top" alt="News Image" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} target="_blank" className="btn btn-sm">
              Click Here
            </a>
          </div>
        </div>
      </div>
    );
  }
}

