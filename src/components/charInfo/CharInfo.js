import './charInfo.scss';
import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';

const CharInfo =(props)=> {

    const [char, setChar] = useState(null);
  
    const {loading, error, getCharacter, clearError} = useMarvelService();


    // useEffect(()=>{
    //     updateChar();
    // },[])

    useEffect(() => {
        updateChar()
    }, [props.charId])


    const updateChar=()=>{
        clearError();
        const {charId} = props;
        if(!charId){
            return;
        }
        
        getCharacter(charId)
            .then(onCharLoaded)
            
    }

 

    const onCharLoaded = (char) => {
        setChar(char);
    
    
    }

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
                    if(i>9) {return}
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