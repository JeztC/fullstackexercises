const Filter = (props) => {
    return (
        <form>
            <div>
                Find countries: <input
                    value={props.input}
                    onChange={props.action}
                />
            </div>
        </form>
    )
};

export default Filter