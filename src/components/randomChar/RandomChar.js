import './randomChar.scss';
// import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/errorMessage';
import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService';

class RandomChar extends Component {

    constructor (props){
        super(props);
        // this.updateChar()
        console.log("constructor");
    }

    state = {
        char:{},
        loading: true,
        error: false
        // name: null,
        // description: null,
        // thumbnail:null,
        // homepage: null,
        // wiki: null
    }
    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChar();
        console.log("mount")
    }

    componentWillUnmount(){
        console.log("unmount")
    }

    onCharLoading=()=>{
        this.setState({
            loading:true
        })
    }

    onCharLoaded = (char) => {
        console.log("update");
        this.setState({
            char : char,
             loading: false
            })
    }
    onError= () =>{
        this.setState({
             loading: false,
             error: true
            })
    }

    updateChar = () =>{
        const id = 
        Math.floor(Math.random() * (1011400 - 1011000) + 1011000); 
        // 1009225;
        this.onCharLoading();
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

   

    render(){
        console.log("render");
        const {char, loading, error} = this.state;
        const spinner = loading ?  <Spinner/> : null;
        const errMessage = error ? <ErrorMessage/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;
        return (
            <div className="randomchar">
               {errMessage}
               {spinner}
               {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}



///простой рендерящий компонент
const View = ({char}) =>{
    const {name, description, thumbnail, homepage, wiki} = char;
    return(
        <div className="randomchar__block">
        <img src={thumbnail} alt="Random character" className="randomchar__img"/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
               {description}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )
}

export default RandomChar;