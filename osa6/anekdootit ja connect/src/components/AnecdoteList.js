import {useDispatch, useSelector} from "react-redux";
import {addNewVote} from "../reducers/anecdoteReducer";

const AnecdoteList = ({sendNotification}) => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id, content) => {
        dispatch(addNewVote(id))
        sendNotification(`You voted '${content}'`, 5)
        console.log('vote', id)
    }

    return (
        <div>
            {anecdotes
                .anecdotes
                .filter(anecdote => anecdote.content.includes(anecdotes.filterInputs))
                .sort((a, b) => {return b.votes - a.votes})
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes} <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default AnecdoteList