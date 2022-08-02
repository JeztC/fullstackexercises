import { useState } from 'react'
import {
    BrowserRouter as Router,
    useParams, useNavigate,
    Routes, Route, Link
} from "react-router-dom"
import {useField} from "./hooks";

const Menu = ({anecdotes, addNew}) => {
    const padding = {
        paddingRight: 5
    }
    return (
        <Router>
            <div>
                <Link style = {padding} to="/">anecdotes</Link>
                <Link style = {padding} to="/create">create new</Link>
                <Link style = {padding} to="/about">about</Link>
            </div>

            <Routes>
                <Route path = "/anecdotes/:id" element = {<AnecdoteList anecdotes={anecdotes}/>}/>
                <Route path = "/" element = {<AnecdoteList anecdotes={anecdotes}/>}/>
                <Route path = "/create" element = {<CreateNew addNew = {addNew}/>}/>
                <Route path = "/about" element = {<About/>}/>
            </Routes>
        </Router>
    )
}

const AnecdoteList = ({ anecdotes }) => {
    const id = useParams().id
    const anecdote = anecdotes.find(anecdote => anecdote.id === Number(id))
    if (anecdote !== undefined) {
        return (
            <div>
                <h1>
                    {anecdote.content}
                </h1>
                <p>has {anecdote.votes} votes</p>
                <p>for more info see <Link to = {{ url: anecdote.info }}>{anecdote.info}</Link></p>
            </div>
        )
    }
    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes.map(anecdote =>
                    <li key={anecdote.id}>
                        <Link to ={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                    </li>
                )}
            </ul>
        </div>
    );
}

const About = () => (
    <div>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
            An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
)

const Footer = () => (
    <div>
        Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

        See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
    </div>
)

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content : content.value,
            author : author.value,
            info : info.value,
            votes: 0
        })
        navigate('/')
    }

    const resetAll = e => {
        content.resetInput(e)
        author.resetInput(e)
        info.resetInput(e)
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form>
                <div>
                    content <input name='content' value={content.value} onChange={(e) => content.setValue(e.target.value)} />
                </div>
                <div>
                    author <input name='author' value={author.value} onChange={(e) => author.setValue(e.target.value)} />
                </div>
                <div>
                    url for more info <input name='info' value={info.value} onChange={(e)=> info.setValue(e.target.value)} />
                </div>
                <button onClick={handleSubmit}>create</button> <button onClick={resetAll}>reset</button>
            </form>
        </div>
    )

}

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: 1
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: 2
        }
    ])

    const notification = useField('text')

    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000)
        setAnecdotes(anecdotes.concat(anecdote))
        notification.setValue(`A new anecdote ${anecdote.content} created!`)
        setTimeout(() => {
            notification.setValue('')
        }, 5000)
    }

    const anecdoteById = (id) => anecdotes.find(a => a.id === id)

    const vote = (id) => {
        const anecdote = anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }

    return (
        <div>
            <h1>Software anecdotes</h1>
            <div>{notification.value}</div>
            <Menu anecdotes={anecdotes} addNew={addNew}/>
            <Footer />
        </div>
    )
}

export default App
