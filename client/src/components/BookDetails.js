import React from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery, getBooksQuery, removeBookMutation } from '../gql/books';
import { client } from '../apollo/init'

const BookDetails = (props) => {
    const { data, bookId, setSelectedBook } = props;
    const { book } = data;

    const removeBook = () => {
        client.mutate({ variables: { id: bookId }, mutation: removeBookMutation, refetchQueries: [{ query: getBooksQuery }] })
        setSelectedBook(null)
    }

    const renderBookInfo = () => {
        if (data.loading) {
            return (<div>Loading selected book info...</div>);
        }
        if (book) {
            return (
                <div>
                    <h2>Book name: {book.name}</h2>
                    <p>Book genre: {book.genre}</p>
                    <p>Author of Book: {book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        {data.book.author.books.map(el => <li key={el.id}>{el.name}</li>)}
                    </ul>
                    <div className={"remove-book"}>
                        <button onClick={removeBook}>Remove this book from LIST</button>
                    </div>
                </div>
            )
        } else {
            return <div>No book selected...</div>
        }
    }
    return (
        <div id="book-details">
            {renderBookInfo()}
        </div>
    );
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);
