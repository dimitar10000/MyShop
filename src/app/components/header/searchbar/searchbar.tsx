'use client'
import SearchIcon from '@mui/icons-material/Search';
import SearchIconWrapper from './search-icon-wrapper';
import SearchWrapper from './search-wrapper';
import StyledInput from './styled-input';

export default function SearchBar() {
  return (
    <SearchWrapper>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInput
        placeholder="Search for products, brands and more…"
        inputProps={{ 'aria-label': 'search for products, brands and more' }}
      />
    </SearchWrapper>
  );
}