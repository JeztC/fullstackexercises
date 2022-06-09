const Persons = (props) => {
    return (
        props.copy.filter(copy => copy.name.includes(props.filterInput)).map(note =>
            <p key = {note.name}>
                <li>{note.name} {note.number}</li>
            </p>
        ));
};

export default Persons