import React, { useState, useEffect } from "react";
import View from './Components/View';

const getDatafromLS = () => {
  const data = localStorage.getItem('books');
  return data ? JSON.parse(data) : [];
}

function App() {
  const [books, setBooks] = useState(getDatafromLS());
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddBookSubmit = (e) => {
    e.preventDefault();
    const book = { title, author, isbn };
    setBooks([...books, book]);
    setTitle('');
    setAuthor('');
    setIsbn('');
  }

  const deleteBook = (isbn) => {
    const filteredBooks = books.filter(book => book.isbn !== isbn);
    setBooks(filteredBooks);
  }

  const handleEditClick = (index) => {
    setEditIndex(index);
    const { title, author, isbn } = books[index];
    setTitle(title);
    setAuthor(author);
    setIsbn(isbn);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBooks = [...books];
    updatedBooks[editIndex] = { title, author, isbn };
    setBooks(updatedBooks);
    setEditIndex(null);
    setTitle('');
    setAuthor('');
    setIsbn('');
  };


  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books])

  return (
    <div className="wrapper">
      <h1>Book List App</h1>
      <p>Add and view your books using local storage</p>
      <div className='main'>
        <div className='form-container' >

          <form autoComplete='off' className='form-group' onSubmit={handleAddBookSubmit}>
            <label>Title</label>
            <input type='text' className='form-control' required onChange={(e) => setTitle(e.target.value)} value={title}></input>
            <br />
            <label>Author</label>
            <input type='text' className='form-control' required onChange={(e) => setAuthor(e.target.value)} value={author}></input>
            <br />
            <label>ISBN#</label>
            <input type='text' className='form-control' required onChange={(e) => setIsbn(e.target.value)} value={isbn}></input>
            <br />
            <button type='submit' className='btn btn-success btn-md'>
              {editIndex !== null ? 'Update' : 'Submit'}
            </button>
          </form>

          
        </div>
        <div className='view-container'>
          {books.length > 0 && <>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ISBN#</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <View books={books} deleteBook={deleteBook} handleEditClick={handleEditClick} />
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger btn-md' onClick={() => setBooks([])}>Remove All</button>
          </>}
          {books.length < 1 && <div>No Books are added yet</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
