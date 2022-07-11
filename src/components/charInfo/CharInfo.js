import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton';
import { Component } from 'react/cjs/react.development';
import MarvelService from '../../services/MarvelService';
class CharInfo extends Component {
    state = {
        char:null,
        loading: false,
        error: false
    }
    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.charId !== prevProps.charId){
            this.updateChar();
        }
        
    }

    updateChar=()=>{
        const {charId} = this.props;
        if(!charId){
            return;
        }
        this.onCharLoading();
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoading=()=>{
        this.setState({
            loading:true
        })
    }

    onCharLoaded = (char) => {
    
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
    render(){
        const {char, loading, error} = this.state;

        const skeleton =  char || loading || error ? null : <Skeleton/>
        const spinner = loading ?  <Spinner/> : null;
        const errMessage = error ? <ErrorMessage/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;
         return (
        <div className="char__info">
            {skeleton}
            {errMessage}
            {spinner}
            {content}
        </div>
    )
    }
   
}

const View = ({char})=>{
    const {name, description, thumbnail,homepage, wiki, comics} = char;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }
return(
    <>
    <div className="char__basics">
            <img src={thumbnail} alt={name} style={imgStyle}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">
            {description}
             </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            {comics.lemgh > 0 ? null : "There is no cmics"}
            {
                comics.map((item, i)=>{
                    if(i>9) {return;}
                    return(
                        <li key={i} className="char__comics-item">
                            {item.name}
                        </li>
                    )
                })
            }
            
        </ul>
    </>
    )
}


export default CharInfo;