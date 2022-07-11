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
 

render(){
    const {chars, loading, error, newCharLoading, offset, charEnded} = this.state;
    const elements = chars.map((item)=>{
        return(
            <CharListItem key={item.id} Item = {item} onCharSelected={this.props.onCharSelected}/>
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