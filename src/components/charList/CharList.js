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
    
    state ={
        chars : [],
        loading: true,
        error: false
    }
    componentDidMount(){
        this.marvelService
        .getAllCharacters()
        .then(this.setCharsState)
        .catch(this.onError)

        console.log("mount")
    }
    setCharsState=(chars)=>{
        this.setState({chars:chars, loading: false})
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }
 

render(){
    const {chars, loading, error} = this.state;
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
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}
    
}

export default CharList;