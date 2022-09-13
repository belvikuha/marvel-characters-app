import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';
import useMarvelService from '../../services/MarvelService';
import { useListMarvel } from '../../hooks/list.hook';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
// import setContent from '../../utils/setContent';

import { useState, useEffect, useRef } from 'react';


const setContent  =(process,Component, newItemsLoading)=>{
    switch(process){
        case 'waiting':
            return <Spinner/>
        case 'loading':
            return newItemsLoading ? <Component/> : <Spinner/>
        case 'confirmed':
            return<Component />
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('Unexpected process')
    }
}

const CharList =(props)=> {
    // const [chars, setChars] = useState([]);
    // const [newCharLoading, setNewCharLoading] = useState(false)
    // const [offset, setOffset] = useState(210)
    // const [charEnded, setCharEnded] = useState(false)
 
    // const {loading, error} = useMarvelService();
    const {items, newItemsLoading, offset,itemRefs, itemsEnded, onRequest, onItemsLoaded, focusOnItem,
         loading, error, process, setProcess}= useListMarvel()

    useEffect(()=>{
        onRequest(offset, true, 'char');
    },[])



    
    
    function renderListItems(items){
        return items.map((item, i)=>{
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            return(
                // <CharListItem key={item.id} Item = {item} onCharSelected={this.props.onCharSelected} ref={this.setMyRef} />
                <>
                    <li className="char__item" 
                        onClick={()=>{
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                            }}
                        ref={el => itemRefs.current[i] = el}
                        key={item.id}
                    >
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                </>
            )
            })
    
    }

    // const elements = renderListItems();
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading && !newItemsLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            <ul className="char__grid">
                {setContent(process, ()=> renderListItems(items), newItemsLoading)}
              
            </ul>
            <button 
                className="button button__main button__long"
                disabled= {newItemsLoading}
                onClick = {()=>onRequest(offset,false, 'char')}
                style={{'display': itemsEnded? 'none' : 'block'}}
                >
                <div className="inner">load more</div>
            </button>
        </div>
    )

    
}

export default CharList;