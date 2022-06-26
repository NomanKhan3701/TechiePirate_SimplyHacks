import './SearchBar.scss'
import {HiSearch} from 'react-icons/hi'

const SearchBar = ({searchText, setSearchText, filter, setFilter}) => {
  return (
    <div className='searchbar-row'>
      <div className='searchbar-sec'>
        <span>
          <HiSearch></HiSearch>
        </span>
        <input
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder='Search for events' />
      </div>

      <div className='searchbar-sec'>
        <div>
          Type
        </div>
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}>

          <option value='all'>All</option>
          <option value='tree'>Tree Planting</option>
          <option value='water'>Save the Ocean</option>
          <option value='misc'>Misc</option>
        </select>
      </div>
    </div>
  )
}

export default SearchBar