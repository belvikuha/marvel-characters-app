import './charList.scss';
const CharListItem = ({Item, onCharSelected}) => {

const {id, name,thumbnail} = Item;
let imgStyle = {'objectFit' : 'cover'};
if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imgStyle = {'objectFit' : 'unset'};
}
    return(
        <li className="char__item" onClick={()=>onCharSelected(id)}>
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div className="char__name">{name}</div>
        </li>
    );
}

export default CharListItem;