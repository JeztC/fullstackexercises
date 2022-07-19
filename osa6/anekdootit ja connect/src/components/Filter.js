import {connect, useDispatch, useSelector} from "react-redux";
import {filterChange} from "../reducers/filterReducer";
import {clearNotification, setNotification} from "../reducers/notificationReducer";

const Filter = (props) => {
    const handleChange = (event) => {
        const input = event.target.value
        props.filterChange(input)
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            Filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = {
    filterChange
}

export default connect(
    null,
    mapDispatchToProps
)(Filter)