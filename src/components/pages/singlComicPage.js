import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/errorMessage';

import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';

const SingleComicPage = () => {
    const {comicId} = useParams()
    const [comic, setComic] = useState({});
   

    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(()=>{
        updateChar();
    },[comicId])


 
   
    const updateChar = () =>{
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }
   const onComicLoaded = (comic) => {
        setComic(comic);
    }
    const spinner = loading ?  <Spinner/> : null;
    const errMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;
    return (
       <>
            {errMessage}
            {spinner}
            {content}
       </>
    )
}


const View =({comic}) =>{
    const {title, description, thumbnail, pageCount, price} = comic;

    return(
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                {/* <p className="single-comic__descr">Language: en-us</p> */}
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;