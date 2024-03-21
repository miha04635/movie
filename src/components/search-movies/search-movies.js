import { Input } from 'antd'

import './search-movies.css'

const SearchMovies = ({ search }) => {
  return <Input className="input" onChange={search} placeholder="Type to search..." size="large" />
}
export default SearchMovies
