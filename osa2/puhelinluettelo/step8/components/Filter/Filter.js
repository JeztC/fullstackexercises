const Filter = (props) => {
    return (
        <form>
            <div>
                filter shown with:
                <input
                    value={props.input}
                    onChange={props.action}
                />
            </div>
        </form>
    )
};

export default Filter