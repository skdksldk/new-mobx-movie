import { observable } from 'mobx';
import axios from 'axios';
import _ from 'lodash';


const store = observable({
  movieList: [], 
  isMovieLoded: false, 
  sortMethod: '', 
  sortMethodName: '현재 상영중인 영화', 
  movieBg: '', 
  isMovieSelected: false, 
  selectedMovie: [], 
  searchWord: '',
  searchWordFix: '',
  recommendedMovie: [], 
  recommendCount: 3, 
  movieTrailer: [], 
  movieTrailerKey: '',
  isExisTrailer: false,
  isShowTrailer: false,

  credits: [],
  director: '',
  cast: [],
  castCount: 3,

  getApi(sortPram){
    
    let SORT = '';
    const NOW_PLAYING = '/movie/now_playing';
    const TRENDING = '/trending/movie/week';
    const TOP_RATED = '/movie/top_rated';
    const UPCOMING = '/movie/upcoming';
    const searchKeyword = '&query=' + this.searchWordFix;
    const SEARCH = '/search/movie';
    const DEFAULT_URL = 'https://api.themoviedb.org/3';
    const API_KEY = '?api_key=cd966d78c5d6f111808969f4fa31cf71';
    const LANGUAGE_KR = '&language=ko-KR';

    if ( sortPram == '0') {
      
      SORT = NOW_PLAYING;
      this.sortMethodName = '현재 상영중인 영화';
    }
    else if ( sortPram == '1' ) {
      
      SORT = TRENDING;
      this.sortMethodName = '최근 인기있는 영화'
    }
    else if (sortPram == '2') {
      
      SORT = TOP_RATED;
      this.sortMethodName = '최근 평점높은 영화'
    }
    else if (sortPram == '3') {
      
      SORT = UPCOMING;
      this.sortMethodName = '최근 개봉 & 예정 영화'
    }
    else if (sortPram == '4') {
      
      SORT = SEARCH;
      this.sortMethodName = this.searchWordFix + ' 키워드로 검색한 영화'

      return axios.get(DEFAULT_URL + SORT + API_KEY + LANGUAGE_KR + searchKeyword)
        .then (response => response.data)
        .catch(err => console.log(err))
    }

    return axios.get(DEFAULT_URL + SORT + API_KEY + LANGUAGE_KR)
      .then (response => response.data)
      .catch(err => console.log(err))
  },

  async getMovies(sortPram){
    
    const movies = await this.getApi(sortPram);

    if ( movies == undefined ) {
      this.setSearchFailed();
    } else {
      this.setMovie(movies.results);
      this.setSearchSuccess();
      this.checkMovieLoad(this.movieList);
      this.changeMovieBg(this.movieList[0].backdrop_path);
    }
  },
  setMovie(movieData){
    
    this.movieList = movieData;
  },
  checkMovieLoad(movieObj){
    
    if ( !_.isEmpty(movieObj) ) return this.isMovieLoded = true;
    else return false;
  },
  setSearchSuccess(){
    
    this.isSuccessSearch = true;
  },
  setSearchFailed(){
    
    this.movieList = [];
    this.isSuccessSearch = false;
  },
  setSearchKeyword(keyword){
    
    this.searchWord = keyword;
  },
  setKeywordFix(){
    
    this.searchWordFix = this.searchWord;
  },
  changeMovieBg(theMovieBg){
    
    this.movieBg = theMovieBg;
  },
  movieSelectToggle(){
    
    if ( !this.isMovieSelected ) this.isMovieSelected = !this.isMovieSelected;
  },
  setBgRestore(){
    
    this.changeMovieBg(this.selectedMovie.backdrop_path);
  },
  backHome(){
    
    this.isMovieSelected = false;
  },
  setClearSelectedMovie(){
    
    this.selectedMovie = {};
  },
  setRecommendCountRestore(){
    
    this.recommendCount = 3;
  },
  setHideTrailer(){
    this.isShowTrailer = false;
  },
  upCastCount(){
    this.castCount += 8;
  },
  setShowTrailer(){
    this.isShowTrailer = true;
  },
  async getRecommendMovie(id){
    
    const rMovie = await this.callRecommendMovie(id);
    this.setRecommendMovie(rMovie.results);
  },
  recommendMore(){
    
    this.recommendCount = this.recommendCount + 6;
  },
  async getDetailMovie(id){
    const sMovie = await this.callDetail(id);
    this.setDetailInfo(sMovie);
    // console.log(this.selectedMovie);
    this.getTrailer(id);
    this.getCredit(id);
  },
  callDetail(id){
  
    const DEFAULT_URL = 'https://api.themoviedb.org/3';
    const API_KEY = '?api_key=dc11dbd0605b4d60cc66ce5e8363e063';
    const LANGUAGE_KR = '&language=ko-KR';
    const MOVIE_ID = '/movie/'+id;

    return axios.get(DEFAULT_URL + MOVIE_ID + API_KEY + LANGUAGE_KR)
      .then (response => response.data)
      .catch (err => console.log(err))
  },
  setDetailInfo(detailInfo){
    
    this.selectedMovie = detailInfo;
  },
  async getTrailer(id){
    
    const trailer = await this.callTrailer(id);
    this.setTrailer(trailer.results);
    if ( this.movieTrailer.length > 0 ) {
      this.setTrueTrailer();
      this.movieTrailerKey = this.movieTrailer[0].key;
    } else {
      this.setFalseTrailer();
      this.movieTrailerKey = '';
    }
  },
  async getCredit(id){
    const credit = await this.callCredit(id);
    this.setCredits(credit);
    this.getDirector();
    this.getCast();
  },
  callTrailer(id){
    
    const DEFAULT_URL = 'https://api.themoviedb.org/3';
    const API_KEY = '?api_key=dc11dbd0605b4d60cc66ce5e8363e063';
    const LANGUAGE_KR = '&language=ko-KR';
    const TRAILER_MOVIE_ID = '/movie/'+id+'/videos';

    return axios.get(DEFAULT_URL + TRAILER_MOVIE_ID + API_KEY + LANGUAGE_KR)
      .then (response => response.data)
      .catch (err => console.log(err))
  },
  callCredit(id){
    const DEFAULT_URL = 'https://api.themoviedb.org/3';
    const API_KEY = '?api_key=dc11dbd0605b4d60cc66ce5e8363e063';
    const LANGUAGE_KR = '&language=ko-KR';
    const CREDIT_MOVIE_ID = '/movie/'+id+'/credits';

    return axios.get(DEFAULT_URL + CREDIT_MOVIE_ID + API_KEY + LANGUAGE_KR)
      .then (response => response.data)
      .catch (err => console.log(err))
  },
  setTrailer(trailer){
    
    this.movieTrailer = trailer;
  },
  setTrueTrailer(){
    this.isExisTrailer = true;
  },
  setFalseTrailer(){
    this.isExisTrailer = false;
  },
  setCredits(creditObj){
    this.credits = creditObj;
  },
  getDirector(){
    const director = this.credits.crew.filter(obj => obj.job === 'Director');
    this.director = {
      name: director[0].name,
      path: director[0].profile_path
    };
  //   console.log(director[0].name);
  },
  getCast(){
    const cast = this.credits.cast.map(obj => obj);
    this.cast = cast;
  },
  setCastCountRestore(){
    this.castCount = 3;
  },
  callRecommendMovie(id){
    
    const DEFAULT_URL = 'https://api.themoviedb.org/3';
    const API_KEY = '?api_key=dc11dbd0605b4d60cc66ce5e8363e063';
    const LANGUAGE_KR = '&language=ko-KR';
    const RECOMMEND_MOVIE_ID = '/movie/'+id+'/recommendations';

    return axios.get(DEFAULT_URL + RECOMMEND_MOVIE_ID + API_KEY + LANGUAGE_KR)
      .then (response => response.data)
      .catch (err => console.log(err))
  },
  setRecommendMovie(recommendations){
  
    this.recommendedMovie = recommendations;
  }
})

export default store;

