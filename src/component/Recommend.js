import React, { useEffect } from 'react';
import Movie from './Movie';
import _ from 'lodash';
import { useObserver } from 'mobx-react-lite';
import store from '../store/MovieStore';

const Recommend = (props) => {

  useEffect(() => {
    const recommendId = store.selectedMovie.id;
    if ( !(_.isEmpty(store.selectedMovie)) ) {
      store.getRecommendMovie(recommendId);
    }
  }, []);

  const renderRecommendMovie = () => {
    const recommendedSlice = store.recommendedMovie.slice(0, store.recommendCount);
    const recommendMovie = recommendedSlice.map(movie => {
      return <Movie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster={movie.poster_path}
              bg={movie.backdrop_path}
              vote_average={movie.vote_average}
              store={store}
              />
      })
      return recommendMovie;
  }

  const handleRecommendMore = () => {
    store.recommendMore();
  }


  return useObserver(() => (
    <div className="Recommend">
      <h3>이 영화의 추천 영화</h3>
      <div className="Recommend__Wrap">
      {store.isMovieSelected ? renderRecommendMovie() : null}
      </div>
      <div className="Recommend__Wrap__More" onClick={handleRecommendMore}><i className="fas fa-caret-down"></i>더 보기</div>
    </div>
  ));
}

export default Recommend;
