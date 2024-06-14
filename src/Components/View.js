import React from 'react';

const View = ({ books, deleteBook, handleEditClick }) => {
  return (
    <>
      {books.map((book, index) => (
        <tr key={index}>
          <td>{book.isbn}</td>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>
            <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(index)}>
              Edit
            </button>
            <button  className="btn btn-danger btn-sm g" onClick={() => deleteBook(book.isbn)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default View;
