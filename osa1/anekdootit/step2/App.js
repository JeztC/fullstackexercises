import { useState } from 'react'

const Display = props => <div>{props.value}</div>

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const points = new Uint8Array(7);
const copy = [...points]

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
    ]

    const [selected, setSelected] = useState(0)
    const [voteDisplay, setVotes] = useState(0)

    const addPoints = (selected) => {
        copy[selected] += 1;
        setVotes(copy[selected]);
    }

    return (
        <div>
            {anecdotes[selected]}
            <br/>
            <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="Seuraava anekdootti" />
            <Button handleClick={() => addPoints(selected) } text="Äänestä" />
            <Display value = {voteDisplay}/>
        </div>
    )
}

export default App