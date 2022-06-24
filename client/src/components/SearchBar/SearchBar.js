import './SearchBar.scss'
import {HiSearch} from 'react-icons/hi'

const SearchBar = () => {
  return (
    <div className='searchbar-row'>
      <div className='searchbar-sec'>
        <span>
          <HiSearch></HiSearch>
        </span>
        <input placeholder='Search for events' />
      </div>

      <div className='searchbar-sec'>
        <div>
          Type
        </div>
        <select>
          <option>All</option>
          <option>Tree Planting</option>
          <option>Beach Cleaning</option>
          <option>Misc</option>
        </select>
      </div>
    </div>
  )
}

export default SearchBar