import {useMutation, useQuery} from "@apollo/client";
import {ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, FAVOURITE_GENRE} from "../queries/queries";

const Recommendations = (props) => {
    const query = useQuery(FAVOURITE_GENRE, { skip: !props.show })
    const books = useQuery(ALL_BOOKS, {skip : !props.show })

    if (!props.show) {
        return null
    }

    if (query.loading || books.loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div>
            <h3>Recommendations</h3>
            <p>Books in your favourite genre: {query.data.me.favoriteGenre}</p>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {books.data.allBooks
                    .filter(b => query.data.me.favoriteGenre === 'all genres' ? b : b.genres.includes(query.data.me.favoriteGenre))
                    .map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Recommendations