import React from 'react';
import { useObserver } from 'mobx-react-lite';
import Credits from './Credits';
import Recommend from './Recommend';
import store from '../store/MovieStore';

const MovieDetail = (props) => {

  const renderGenre = () => {
    const genres = props && props.genre && props.genre.map(genre => {
      return (<Genre genre={genre.name} key={genre.id} />);
    })
    return genres;
  };

  const handleTrailerView = () => {
    store.setShowTrailer();
  };

  const posterUrl = 'https://image.tmdb.org/t/p/original';

  return useObserver(() => (
    <div className="Select">
      <div className="Select__Poster">
        <img src={posterUrl + props.poster} alt={props.title}/>
      </div>
      <div className="Select__Detail">
        <h2>{props.title}</h2>
        <h3>{props.og_title}</h3>
        <p>
          <span className="Select__Detail__VoteAverage"><i className="fas fa-star"></i>{props.vote_average}</span>
          <span className="Select__Detail__Runtime"><i className="far fa-clock"></i> {props.runtime}분</span>
          { store.isExisTrailer ? <span className="Select__Detail__Trailer" onClick={handleTrailerView}><i className="fab fa-youtube"></i>예고편 보기</span> : null }
        </p>

        <div className="Select__Detail__Genre">{renderGenre()}</div>
        <p className="Select__Detail__Tagline">{props.tagline}</p>
        <p className="Select__Detail__Summary">{props.summary}</p>

      </div>
      <Credits />
      <Recommend />
    </div>
  ));
}

function Genre ({genre}) {
  return (
    <span className="Select__Detail__Genre__list">{genre}</span>
  )
}

export default MovieDetail;
