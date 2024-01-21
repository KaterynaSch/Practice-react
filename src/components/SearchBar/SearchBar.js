import { ButtonReset, SearchWrapper } from "./SearchBar.styled"

export const SearchBar = ({filters:{topic, level}, onChangeFilter, onReset}) => {
    return (
        <SearchWrapper>
            <input 
            type= 'text' value={topic} 
            onChange={evt => { onChangeFilter('topic', evt.target.value)}} //значення нового фільтра
            placeholder="Filter by topic..."/>
            <select value={level}
            onChange={evt => { onChangeFilter('level', evt.target.value)}}>
                <option value='all'>All</option>
                <option value='beginner'>Beginner</option>
                <option value='intermediate'>Intermediate</option>
                <option value='advanced'>Advanced</option>
            </select>
            <ButtonReset type="button" onClick={onReset}>Reset filters</ButtonReset>
        </SearchWrapper>
    )
}