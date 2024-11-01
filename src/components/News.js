import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export default class News extends Component {
  static propTypes = {
    country: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
  }

  componentDidMount() {
    this.fetchNews();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.country !== this.props.country ||
      prevProps.category !== this.props.category ||
      prevProps.pageSize !== this.props.pageSize
    ) {
      this.fetchNews();
    }
  }

  fetchNews = async () => {
    const { country, category, pageSize } = this.props;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=21342ae29ea945cfb8c1fcf4c670348c&page=${this.state.page}&pageSize=${pageSize}`;

    this.setState({ loading: true });
    try {
      const response = await fetch(url);
      const data = await response.json();

      this.setState({
        articles: data.articles || [],
        totalResults: data.totalResults || 0,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching news:', error);
      this.setState({ loading: false });
    }
  };

  handlePrevClick = async () => {
    const { country, category, pageSize } = this.props;
    const nextPage = this.state.page - 1;
    if (nextPage > 0) {
      this.setState({ page: nextPage }, this.fetchNews);
    }
  };

  handleNextClick = async () => {
    const { country, category, pageSize } = this.props;
    const { page, totalResults } = this.state;
    const nextPage = page + 1;
    if (nextPage <= Math.ceil(totalResults / pageSize)) {
      this.setState({ page: nextPage }, this.fetchNews);
    }
  };

  render() {
    const { articles, loading, page, totalResults } = this.state;
    return (
      <div className="container my-3">
        <h2 className="text-center">NewsDaily - Top Headlines</h2>
        {loading && <Spinner />}
        <div className="row">
          {!loading &&
            articles.map((article) => (
              <div className="col-md-4" key={article.url}>
                <NewsItem
                  title={article.title ? article.title.slice(0, 45) : ''}
                  description={article.description ? article.description.slice(0, 88) : ''}
                  imageUrl={article.urlToImage || 'https://via.placeholder.com/150'}
                  newsUrl={article.url}
                />
              </div>
            ))}
        </div>
        <div className="container d-flex justify-content-between my-3">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={page >= Math.ceil(totalResults / this.props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
