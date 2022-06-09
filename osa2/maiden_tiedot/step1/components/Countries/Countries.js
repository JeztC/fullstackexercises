import Header from "../Header/Header";
import Languages from "../Languages/Languages";

const Countries = (props) => {
    if (props.filterInput.length === 0) return
    if (props.filteredMap.length === 1) {
        return (
            <div>
                <Header title = {props.filteredMap.map(note => note.name['common'])} />
                <li>{`Capital: ${props.filteredMap.map(note => note.capital[0])}`}</li>
                <li>{`Area: ${props.filteredMap.map(note => note.area)} km2`}</li>
                <Languages filteredMap = {props.filteredMap[0].languages} />
                <img src={props.filteredMap.map(note => note.flags["png"])} alt="Country Image" />;
            </div>
        )}
    return (
        props.filteredMap.length > 10
            ? (<li>{"Too many matches, specify another filter"}</li>)
            : (props.filteredMap.map(note => <li key={note.name['common']}>{note.name['common']}</li>)
            ));
};

export default Countries