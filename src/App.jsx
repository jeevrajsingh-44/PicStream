import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';


const App = () => {

  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)


  async function getApi() {

    setLoading(true);
    const result = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=12`);
    setImages(result.data);
    setLoading(false);
  }

  function btnNext() {
    setPage(page + 1);
  }

  function btnPrev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  useEffect(() => {
    getApi();
  }, [page]);

  return (
    <>
      <div>
        {loading && <h2 className='loading'>Loading images...</h2>}
        <div className="gallery">
          {images.map((img) => (
            <div className='card' key={img.id}>
              <p>{img.author}</p>
              <a href={img.download_url} target="_blank" rel="noreferrer">
                <img
                  src={`https://picsum.photos/id/${img.id}/300/200`}
                  alt={img.author}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="foot">
        <button className="previous" onClick={btnPrev} disabled={page === 1}>Prev</button>
        <span className="pageNumber">Page {page}</span>
        <button className="next" onClick={btnNext}>Next</button>
      </div>
    </>)
}

export default App
