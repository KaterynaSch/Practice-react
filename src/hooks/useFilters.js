import { useSearchParams } from "react-router-dom";

//сторення кастомного хука, в ньому можна виклкати інші хуки
export const useFilters = ()=> {
    const [params, setParams] = useSearchParams();

    const topic = params.get("topic") ?? ""; //читання значень filters
    const level = params.get("level") ?? "all";

    const changeTopic = (evt) => {//можна мутувати, так як це не state
        params.set('topic', evt.target.value);
        setParams(params);
    }; 
    
    const changeLevel = (evt) => {//можна мутувати, так як це не state
        params.set('level', evt.target.value);
        setParams(params);
    };

    const resetFilters = () => {
        setParams({topic: "", level: "all"});
    };

    return {
        topic,
        level,
        changeTopic,
        changeLevel, 
        resetFilters
    };
};