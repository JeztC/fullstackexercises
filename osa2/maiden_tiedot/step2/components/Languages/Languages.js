const Languages = (props) => {
    return (
        <>
            <ul>
                {Object.keys(props.filteredMap).map(language => <li>{props.filteredMap[language]}</li>)}
            </ul>
        </>
    );
}

export default Languages;