import { Input } from 'antd'

const SearchMovies = ({ search }) => {
  return (
    <Input
      onChange={search}
      placeholder="Type to search..."
      size="large"
      style={{
        width: '50%',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 16,
        maxWidth: 1070,
      }}
    />
  )
}
export default SearchMovies
