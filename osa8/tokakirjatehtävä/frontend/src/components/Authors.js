import {useMutation, useQuery} from "@apollo/client";
import {ALL_AUTHORS, UPDATE_BIRTH_YEAR} from "../queries/queries";
import {useField} from "../hooks/hooks";
import Select from 'react-select';
import {useState} from "react";

const Authors = (props) => {
    const authors = useQuery(ALL_AUTHORS, { skip: !props.show })
    const year = useField('text')
    const [selectedOption, setSelectedOption] = useState(null);

    const [ editAuthor ] = useMutation(UPDATE_BIRTH_YEAR, {
        refetchQueries: [ { query: ALL_AUTHORS } ]  })

    if (!props.show) {
        return null
    }

    if (authors.loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    const options = authors.data.allAuthors.map((guest, index) => {
        return {
            label: guest.name,
            value: guest.name,
            key: index
        }
    })

    console.log(options)

    const changeBirthYear = (e) => {
        e.preventDefault()
        editAuthor({variables: {name : selectedOption.value, setBornTo : Number(year.value)}}).then(r => console.log(r))
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>born</th>
                    <th>books</th>
                </tr>
                {authors.data.allAuthors.map((a) => (
                    <tr key={a.name}>
                        <td>{a.name}</td>
                        <td>{a.born}</td>
                        <td>{a.bookCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h3>Set birthyear</h3>
            <form onSubmit={changeBirthYear}>
                <div>
                    name <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                />
                </div>
                <div>
                    born <input {...year}/>
                </div>
                <div>
                    <button>update author</button>
                </div>
            </form>
        </div>
    );
}

export default Authors
