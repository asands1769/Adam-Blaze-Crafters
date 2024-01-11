import "../../../index.css";
import "./searchStyles.css";
import FilterMap from './FilterMap';


const Search = () => {
 
    return (
        <>
            <h1>Find A Missouri State Park</h1>                
            <div className='row'>
                <FilterMap />
            </div>
        </>
        );
};
 
export default Search;