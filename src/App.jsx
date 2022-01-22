import { useState } from 'react';
import './App.css';

export async function getCharacters(name, offset) {
  const params = {
    nameStartsWith: name,
    limit: 20,
    offset: offset,
  };
  const res = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${params.nameStartsWith}&limit=${params.limit}&offset=${params.offset}&apikey=ce7e495f079bd4d8b4dedb554c8ed299`
  );
  const characters = res.json();
  return characters;
}

function App() {
  const [characters, setCharacters] = useState([]);
  const [name, setName] = useState('');
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);

  const onNextPage = async () => {
    if (characters.length === 20) {
      setOffset(offset + 20);
      setPage(page + 1);
      const characters = await getCharacters(name, Number(offset) + 20);
      if (characters.code === 200) {
        setCharacters(characters.data.results);
      }
    }
  };

  const onPrevPage = async () => {
    if (page > 1) {
      setOffset(offset - 20);
      setPage(page - 1);
      const characters = await getCharacters(name, Number(offset) - 20);
      if (characters.code === 200) {
        setCharacters(characters.data.results);
      }
    }
  };

  const onSubmit = async () => {
    setPage(1);
    setOffset(0);
    setShow(true);
    const characters = await getCharacters(name, 0);
    if (characters.code === 200) {
      setCharacters(characters.data.results);
    }
  };

  return (
    <div className="container mt-5">
      <div className="mb-3 row">
        <div className="col-10">
          <input
            className="form-control"
            placeholder="Search"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onSubmit()}
          >
            Search
          </button>
        </div>
      </div>
      {show && (
        <div>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Tumbnail</th>
                  <th scope="col">Name</th>
                  <th scope="col">Series</th>
                  <th scope="col">URL</th>
                </tr>
              </thead>
              <tbody>
                {characters.map((character) => {
                  return (
                    <tr key={character.id}>
                      <td>
                        <img
                          src={
                            character.thumbnail.path +
                            '.' +
                            character.thumbnail.extension
                          }
                          className="img-thumbnail image"
                          alt={character.name}
                        />
                      </td>
                      <td>{character.name}</td>
                      <td>
                        <ul>
                          {character.series.available > 0
                            ? character.series.items.map((s) => {
                                return <li>{s.name}</li>;
                              })
                            : '-'}
                        </ul>
                      </td>
                      <td>
                        {character.urls.map((u) => (
                          <div>
                            <a href={u.url} target="_blank">
                              {u.type}
                            </a>
                          </div>
                        ))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between mb-5">
            <button
              onClick={onPrevPage}
              className="btn btn-outline-secondary btn-sm"
            >
              <i className="bi bi-arrow-left"></i>
            </button>
            <span>Page: {page}</span>
            <button
              onClick={onNextPage}
              className="btn btn-outline-secondary btn-sm "
              type="button"
            >
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
