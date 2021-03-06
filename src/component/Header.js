import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react-lite';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import store from '../store/MovieStore';

const styles = {
    tabsRoot: {},
    tabsIndicator: {
        backgroundColor: 'transparent',
    },
    tabRoot: {
        fontSize: '16px',
        fontWeight: '400',
        fontFamily: [
            'Noto Sans KR',
            'Roboto',
            'sans-serif',
        ],
        opacity: '0.6',
        '&:hover': {
            color: '#fff',
            opacity: '.8',
        },
        '&tabSelected': {
            color: '#fff',
            opacity: '1',
        },
        '&:focus': {
            color: '#fff',
        }
    },
    tabSelected: {},
}

const Header = (props) => {

    const [navToggleOpen, setNavToggleOpen] = useState(false);

    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);

    const classes = props;

    const handleNowPlaying = () => {
        store.getMovies(0);
    };
    const handleTrending = () => {
        store.getMovies(1);
    };
    const handleTopRated = () => {
        store.getMovies(2);
    };
    const handleUpcoming = () => {
        store.getMovies(3);
    };
    const handleChange1 = (event, value) => {
        setValue1(value);
    };
    const handleChange2 = (event, value) => {
        setValue2(value);
    };
    const handleKeywordChange = (e) => {
        store.setSearchKeyword(e.target.value);
    };
    const handleSearch = () => {
        store.setKeywordFix();
        store.getMovies(4);
    };
    const handleKeypress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    const handleBackHome = () => {
        store.backHome();
        store.setClearSelectedMovie();
        store.setRecommendCountRestore();
        store.setCastCountRestore();
        store.setHideTrailer();
    };

    return useObserver(() => ( <
        header >
        <
        div className = { store.isMovieSelected ? 'Header on' : 'Header' } >
        <
        div className = "Header__Inner" >
        <
        div className = "Header__Search" >
        <
        input type = "text"
        placeholder = "????????????"
        onChange = { handleKeywordChange }
        onKeyPress = { handleKeypress }
        /> <
        i className = "fas fa-search"
        onClick = { handleSearch } >
        < /i> <
        /div> <
        div className = "Header__Menu" >
        <
        Tabs value = { value1 }
        onChange = { handleChange1 }
        classes = {
            { root: classes.tabsRoot, indicator: classes.tabsIndicator } } >
        <
        Tab label = "?????? ???????????? ??????"
        classes = {
            { root: classes.tabRoot, selected: classes.tabSelected } }
        onClick = { handleNowPlaying }
        /> <
        Tab label = "?????? ???????????? ??????"
        classes = {
            { root: classes.tabRoot, selected: classes.tabSelected } }
        onClick = { handleTrending }
        /> <
        Tab label = "?????? ???????????? ??????"
        classes = {
            { root: classes.tabRoot, selected: classes.tabSelected } }
        onClick = { handleTopRated }
        /> <
        Tab label = "?????? ?????? &amp; ?????? ??????"
        classes = {
            { root: classes.tabRoot, selected: classes.tabSelected } }
        onClick = { handleUpcoming }
        /> <
        /Tabs> <
        /div> <
        div className = "Header__Search" >
        <
        input type = "text"
        placeholder = "????????????"
        onChange = { handleKeywordChange }
        onKeyPress = { handleKeypress }
        /> <
        i className = "fas fa-search"
        onClick = { handleSearch } >
        < /i> <
        /div>           <
        /div> <
        div className = "Header__Back" >
        <
        Tabs value = { value2 }
        onChange = { handleChange2 }
        classes = {
            { root: classes.tabsRoot, indicator: classes.tabsIndicator } } >
        <
        Tab label = "?????? ??????"
        classes = {
            { root: classes.tabRoot } }
        onClick = { handleBackHome }
        /> <
        /Tabs> <
        /div>

        <
        nav className = "Nav" >
        <
        div className = "Nav__logo" >
        <
        a href = "" > ISU < /a> <
        /div> <
        ul className = { `${navToggleOpen ? 'Nav__Menu Nav__Menu-open' : 'Nav-Menu'}` } >
        <
        li > < a onClick = { handleNowPlaying } > ?????? ???????????? ?????? < /a></li >
        <
        li > < a onClick = { handleTrending } > ?????? ???????????? ?????? < /a></li >
        <
        li > < a onClick = { handleTopRated } > ?????? ???????????? ?????? < /a></li >
        <
        li > < a onClick = { handleUpcoming } > ?????? ?????? & amp; ?????? ?????? < /a></li >
        <
        li > < div className = "Nav__Menu__Search" >
        <
        input type = "text"
        placeholder = ""
        onChange = { handleKeywordChange }
        onKeyPress = { handleKeypress }
        /> <
        i className = "fas fa-search"
        onClick = { handleSearch } > < /i> <
        /div></li >
        <
        /ul> <
        a href = "#"
        className = "Nav__More" >
        <
        i onClick = {
            () => setNavToggleOpen(!navToggleOpen) }
        className = "fas fa-bars" > < /i> <
        /a> <
        /nav> <
        /div> <
        /header>
    ));
}

export default withStyles(styles)(Header);