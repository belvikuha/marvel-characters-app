import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';
import MarvelService from '../../services/MarvelService';
import CharListItem from '../charListItem/CharListItem';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
// import { useState } from 'react';
import { Component } from 'react/cjs/react.development';

class CharList extends Component {

    marvelService = new MarvelService();
    
    state = {
        chars : [],
        loading: true,
        error: false,
        newCharLoading: false,
        offset: 210,
        charEnded: false
    }
    componentDidMount(){
        this.onRequest();

        // console.log("mount")
    }


    onRequest = (offset) => {
        this.onCharsLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }

    onCharsLoading = () =>{
        this.setState({newCharLoading: true})
    }

    onCharsLoaded=(newChars)=>{
        let ended = false;
        if(newChars.length <9){
            ended = true;
        }


        this.setState(({offset, chars})=>({ ///возвращаем объект из этой функции !!! если нам нужно взаимодействие со старым стейтом!!!
                chars:[...chars, ...newChars], 
                loading: false,
                newCharLoading: false,
                offset: offset+9,
                charEnded:ended
                })
            )
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }
 
    itemRefs=[];
    setMyRef = elem =>{
        this.itemRefs.push(elem);
    } 
  

    focusOnItem = (id) => {
        // Я реализовал вариант чуть сложнее, и с классом и с фокусом
        // Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
        // На самом деле, решение с css-классом можно сделать, вынеся персонажа
        // в отдельный компонент. Но кода будет больше, появится новое состояние
        // и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов

        // По возможности, не злоупотребляйте рефами, только в крайних случаях
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        // this.itemRefs[id].focus();
    }
    
render(){
    const {chars, loading, error, newCharLoading, offset, charEnded} = this.state;
    
    const elements = chars.map((item, i)=>{
        let imgStyle = {'objectFit' : 'cover'};
        if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'unset'};
        }
        return(
            // <CharListItem key={item.id} Item = {item} onCharSelected={this.props.onCharSelected} ref={this.setMyRef} />
            <>
                <li className="char__item" 
                    onClick={()=>{
                        this.props.onCharSelected(item.id);
                        this.focusOnItem(i);
                        }}
                    ref={this.setMyRef}
                >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            </>
        )
    })

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? elements : null;
    return (
        <div className="char__list">
            <ul className="char__grid">
                {errorMessage}
                {spinner}
                {content}
              
            </ul>
            <button 
                className="button button__main button__long"
                disabled= {newCharLoading}
                onClick = {()=>this.onRequest(offset)}
                style={{'display': charEnded? 'none' : 'block'}}
                >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}
    
}

export default CharList;