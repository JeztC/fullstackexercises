import Header from "../Header/Header";
import Languages from "../Languages/Languages";
import Filter from "../Filter/Filter";
import Weather from "../Weather/Weather";

const CountryInformation = (props) => {
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                input = {props.input}
                action = {props.action}
            />
            <Header title={props.filteredMap.map(note => note.name['common'])}/>
            <li>{`Capital: ${props.filteredMap.map(note => note.capital[0])}`}</li>
            <li>{`Area: ${props.filteredMap.map(note => note.area)} km2`}</li>
            <Languages filteredMap={props.filteredMap[0].languages}/>
            <img src={props.filteredMap.map(note => note.flags["png"])} alt="Country Image"/>
            <p></p>
            <h2>Weather in {props.filteredMap.map(note => note.capital[0])}</h2>
            <Weather capital={props.filteredMap.map(note => note.capital[0])}/>
        </div>
    );
}

export default CountryInformation