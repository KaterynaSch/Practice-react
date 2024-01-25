// import { useSearchParams } from "react-router-dom";
import { useFilters } from "hooks/useFilters";

import { TopicFilter } from "components/TopicFilter";
import { ButtonReset, SearchWrapper } from "./SearchBar.styled";
import { LevelFilter} from "components/LevelFilter";

export const SearchBar = () => {

    const {resetFilters} = useFilters();

    return (
        <SearchWrapper>
            <TopicFilter/>
            <LevelFilter/>            
            <ButtonReset type="button" onClick={resetFilters}>Reset filters</ButtonReset> 
        </SearchWrapper>
    );
};