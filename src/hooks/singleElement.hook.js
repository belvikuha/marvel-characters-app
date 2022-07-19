import { useState, useCallback, useRef } from "react";
import useMarvelService from "../services/MarvelService";

export const useSingleElement = () =>{
    const [char, setChar] = useState({});
    const {loading, error, getCharacter, clearError} = useMarvelService();



    const onCharLoaded = (char) => {
        setChar(char);
    }
   
    const updateChar = () =>{
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); 
        // 1009225;
       getCharacter(id)
            .then(onCharLoaded)
    }
}