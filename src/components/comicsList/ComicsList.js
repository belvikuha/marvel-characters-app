import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import useMarvelService from '../../services/MarvelService';
import { useListMarvel } from '../../hooks/list.hook';
import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
const ComicsList = (props) => {

    const {loading, error} = useMarvelService();
    const {items, newItemsLoading, offset,itemRefs, itemsEnded, onRequest, onItemsLoaded, focusOnItem}= useListMarvel()

    useEffect(()=>{
        onRequest(offset, true, '');
    },[])

    function renderListItems(){
        return items.map((item, i)=>{
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            return(
                // <CharListItem key={item.id} Item = {item} onCharSelected={this.props.onCharSelected} ref={this.setMyRef} />
                <>
                   
                    <li className="comics__item" key={i}>
                    <a href="#">
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.pageCount}</div>
                    </a>
                </li>

                </>
            )
            })
    
    }



    const elements = renderListItems();
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemsLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {errorMessage}
                {spinner}
                {elements}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;