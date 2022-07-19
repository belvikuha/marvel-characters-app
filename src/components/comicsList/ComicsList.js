import { useListMarvel } from '../../hooks/list.hook';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './comicsList.scss';

const ComicsList = (props) => {

    const {items, newItemsLoading, offset,itemRefs, itemsEnded, onRequest, onItemsLoaded, focusOnItem, loading, error}= useListMarvel()

    useEffect(()=>{
        onRequest(offset, true, 'comics');
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
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img" style={imgStyle}/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.pageCount}</div>
                    </Link>
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
            <button className="button button__main button__long"
             disabled= {newItemsLoading}
             onClick = {()=>onRequest(offset,false, 'comics')}
             style={{'display': itemsEnded? 'none' : 'block'}}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;