import "../../../index.css";
import "./searchStyles.css";
import FilterMap from './FilterMap';


const Search = () => {
 
    return (
        <div className='page-container'>
            <h1>Find A Missouri State Park</h1>                
            <div className='row'>
                <FilterMap />
            </div>
        </div>
        );
};
 
export default Search;