import React from 'react';
import { useObserver } from 'mobx-react-lite';
import store from '../store/MovieStore';

const Credits = (props) => {

  const renderCast = () => {
    const castSlice = store.cast.slice(0, store.castCount);
    const cast = castSlice.map(castList => {
      return (
        <div className="Credit__List__Wrap" key={castList.id}>
          <div className="Credit__List__Wrap__Profile">
          {castList.profile_path == null ? <i class="fas fa-user"></i> : <img src={'https://image.tmdb.org/t/p/w300'+ castList.profile_path} alt={ castList.name }/>}
          </div>
          <p className="Credit__List__Wrap__Top"><span>{castList.character}</span>역</p><p className="Bottom">{castList.name}</p>
        </div>
      )
    });
    return cast;
  }

  const handleCastCount = () => {
    store.upCastCount();
  }


  const posterUrl = 'https://image.tmdb.org/t/p/w300';

  return useObserver(() => (
    <div className="Credit">
      <h3>이 영화의 감독 / 출연진</h3>
      <div className="Credit__List">
        <div className="Credit__List__Wrap">
          <div className="Credit__List__Wrap__Profile">
          {store.director.path == null ? <i class="fas fa-user"></i> : <img src={posterUrl + store.director.path} alt={store.director.name} />}
          </div>
          <p className="Credit__List__Wrap__Top">감독</p><p className="Bottom">{store.director.name}</p>
        </div>
        {renderCast()}
      </div>
      <div className="Credit__More" onClick={handleCastCount}><i className="fas fa-caret-down"></i>더 보기</div>
    </div>
  ));
}

export default Credits;
