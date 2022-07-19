import {connect} from "react-redux";
import {addNewAnecdote} from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.addNewAnecdote(content)
        props.sendNotification(`You added an anecdote ${content}`, 5)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name = "anecdote"/>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    addNewAnecdote
}

export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)