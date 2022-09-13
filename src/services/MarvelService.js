import {useHttp} from '../hooks/http.hook';

const useMarvelService =()=>{

    const{loading, request, error, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=7434ac9db2377534a8d10e6c4c494df3';

    const _baseOffset = 210;

  

    const getAllCharacters = async(offset = _baseOffset, type) => {
        if(type === 'char'){
            const res =  await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
            return res.data.results.map(_transformCharacter);
        }
        else{
            const res =  await request(`${_apiBase}comics?limit=9&offset=${offset}&${_apiKey}`);
            return res.data.results.map(_transformComics);
        }
    }
    const getCharacter = async (id) => {
        const response = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(response.data.results[0]);
    }

    const transformCharDesc = (desc) =>{
        if(desc.length > 210){
            return desc.slice(0,210) +'...'
        }
        else
            return desc;
    }

    const _transformCharacter = (char) =>{
       
        return {
            id:char.id,
            name: char.name,
            description: char.description ? transformCharDesc(char.description) : "descp not found",
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
    const _transformComics = (comics)=>{
        return{
            id:comics.id,
            title: comics.title,
            pageCount: comics.pageCount,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            description: comics.description,
            price: comics.prices[0].price
        }
    }

    const getAllComics =async()=>{
        const res =  await request(`${_apiBase}comics?limit=9&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const response = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(response.data.results[0]);
    }

    return{loading, 
        error, 
        getAllCharacters, 
        getCharacter, 
        clearError, 
        getAllComics, 
        getComic, 
        process,
        setProcess}
}

export default useMarvelService;