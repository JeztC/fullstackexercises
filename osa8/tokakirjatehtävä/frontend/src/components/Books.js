import {useQuery} from "@apollo/client";
import {ALL_BOOKS} from "../queries/queries";
import {useState} from "react";
import _ from "lodash";

const Books = (props) => {
    const books = useQuery(ALL_BOOKS, {
        skip : !props.show })
    const [genre, setGenre] = useState('all genres')

    if (!props.show) {
        return null
    }

    if (books.loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {books.data.allBooks
                    .filter(b => genre === 'all genres' ? b : b.genres.includes(genre))
                    .map((a) => (
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                {_.uniq(_.flatMap(books.data.allBooks, 'genres')).map((b) =>
                    <button onClick={() => setGenre(b)}>{b}</button>
                    )}<button onClick={() => setGenre('all genres')}>all genres</button>
            </div>
        </div>
    );
}

export default Books
