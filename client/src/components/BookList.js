import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../gql/books';
import BookDetails from './BookDetails';

const BookList = (props) => {
    const { data } = props;
    const [selectedBook, setSelectedBook] = useState(null)

    if (data.loading) {
        return (<div>Loading books...</div>);
    }
    return (
        <div>
            <ul id="book-list">
                {
                    data.books.map(book => (
                        <li key={book.id} onClick={() => setSelectedBook(book.id)}>{book.name}</li>
                    ))
                }
            </ul>
            <BookDetails bookId={selectedBook} setSelectedBook={setSelectedBook} />
        </div>
    );
}

export default graphql(getBooksQuery)(BookList);
