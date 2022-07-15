import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import { useState, useEffect, useRef } from 'react';


const CharList =(props)=> {
    const [chars, setChars] = useState([]);
    const [newCharLoading, setNewCharLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)
 
    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(()=>{
        onRequest(offset, true);
    },[])



    const onRequest = (offset, initial) => {
        initial ? setNewCharLoading(false) :setNewCharLoading(true); 
        getAllCharacters(offset)
            .then(onCharsLoaded)
            
    }

    const onCharsLoaded=(newChars)=>{
        let ended = false;
        if(newChars.length <9){
            ended = true;
        }

        
        setChars(charList => [...charList, ...newChars]);
        
        setNewCharLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);


    }

  
    const itemRefs=useRef([]);
    const focusOnItem = (id) => {
        // Я реализовал вариант чуть сложнее, и с классом и с фокусом
        // Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
        // На самом деле, решение с css-классом можно сделать, вынеся персонажа
        // в отдельный компонент. Но кода будет больше, появится новое состояние
        // и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов

        // По возможности, не злоупотребляйте рефами, только в крайних случаях
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        // this.itemRefs[id].focus();
    }
    
    function renderListItems(){
        return chars.map((item, i)=>{
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

    const elements = renderListItems();
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newCharLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            <ul className="char__grid">
                {errorMessage}
                {spinner}
                {elements}
              
            </ul>
            <button 
                className="button button__main button__long"
                disabled= {newCharLoading}
                onClick = {()=>onRequest(offset)}
                style={{'display': charEnded? 'none' : 'block'}}
                >
                <div className="inner">load more</div>
            </button>
        </div>
    )

    
}

export default CharList;