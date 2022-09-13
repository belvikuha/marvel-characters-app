import './charInfo.scss';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import { useEffect, useState } from 'react';

const CharInfo =(props)=> {

    const [char, setChar] = useState(null);
  
    const { getCharacter, clearError, process, setProcess} = useMarvelService();


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
            .then(()=> setProcess('confirmed'))
            
    }

 

    const onCharLoaded = (char) => {
        setChar(char);
    }

    // const setContent  =(process, char)=>{
    //     switch(process){
    //         case 'waiting':
    //             return <Skeleton/>
    //         case 'loading':
    //             return<Spinner/>
    //         case 'confirmed':
    //             return<View char={char}/>
    //         case 'error':
    //             return <ErrorMessage/>
    //         default:
    //             throw new Error('Unexpected process')
    //     }
    // }

    // const skeleton =  char || loading || error ? null : <Skeleton/>
    // const spinner = loading ?  <Spinner/> : null;
    // const errMessage = error ? <ErrorMessage/> : null;
    // const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
    <div className="char__info">
        {setContent(process, View,  char)}
    </div>
    )
    }
   


const View = ({data})=>{
    const {name, description, thumbnail,homepage, wiki, comics} = data;
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