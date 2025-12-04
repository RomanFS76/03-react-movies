import SearchBar from '../SearchBar/SearchBar';
import './App.module.css';

const App = () => {
  const handleSearch = (query: string) => {
    console.log(query);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
    </>
  );
};

export default App;
