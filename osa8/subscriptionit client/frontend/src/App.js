import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import {useApolloClient, useSubscription} from "@apollo/client";
import Recommendations from "./components/Recommendations";
import {ALL_BOOKS, BOOK_ADDED} from "./queries/queries";

export const updateCache = (cache, query, addedBook) => {
    const uniqByName = (a) => {
        let seen = new Set()
        return a.filter((item) => {
            let k = item.name
            return seen.has(k) ? false : seen.add(k)
        })
    }
    cache.updateQuery(query, ({ allBooks }) => {
            return {
                allBooks: uniqByName(allBooks.concat(addedBook)),
            }
        }
    )
}

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const client = useApolloClient()

    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 10000)
    }

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
        setPage('authors')
    }

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded
            window.alert(`A new book ${addedBook.title} by ${addedBook.author.name} was added!`)
            updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
        },
    })

    return (
        <div>
            <Notify errorMessage={errorMessage} />
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button style={{display : token === null ? 'none' : ''}} onClick={() => setPage('add')}>add book</button>
                <button style={{display : token === null ? 'none' : ''}} onClick={() => setPage('recommendations')}>recommendations</button>
                <button style={{display : token === null ? '' : 'none'}} onClick={() => setPage('login')}>login</button>
                <button style={{display : token === null ? 'none' : ''}} onClick={logout}>logout</button>
            </div>

            <Authors show={page === 'authors'} />
            <Books show={page === 'books'} />
            <NewBook show={page === 'add'} setError={notify}/>
            <LoginForm show={page === 'login'} setToken={setToken} setError={notify} setPage = {setPage} />
            <Recommendations show={page === 'recommendations'} />
        </div>
    )
}

export default App
