import { useState } from 'react'
import './App.css';

const StatisticLine = ({text, value}) => <div>{text} {value}</div>

const Header = (props) => <h1>{props.title}</h1>

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Statistics = (props) => {
    if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
        return (
            <div>
                <Header title = {props.feedbackTitle} />
                <Button handleClick={() => props.goodButton(props.good + 1)} text="Hyvä" />
                <Button handleClick={() => props.neutralButton(props.neutral + 1)} text="Neutraali" />
                <Button handleClick={() => props.badButton(props.bad + 1)} text="Huono" />
                <Header title = {props.statistics} />
                Ei palautetta annettu.
            </div>
        )
    }
    return (
        <div>
            <Header title = {props.feedbackTitle} />
            <Button handleClick={() => props.goodButton(props.good + 1)} text="Hyvä" />
            <Button handleClick={() => props.neutralButton(props.neutral + 1)} text="Neutraali" />
            <Button handleClick={() => props.badButton(props.bad + 1)} text="Huono" />
            <StatisticLine text="Hyvä:" value = {props.good} />
            <Header title = {props.statistics} />
            <table>
                <tr>
                    <td>Hyvä:</td>
                    <td>{props.good}</td>
                </tr>
                <tr>
                    <td>Neutraali:</td>
                    <td>{props.neutral}</td>
                </tr>
                <tr>
                    <td>Huono:</td>
                    <td>{props.bad}</td>
                </tr>
                <tr>
                    <td>Kaikki:</td>
                    <td>{props.good + props.neutral + props.bad}</td>
                </tr>
                <tr>
                    <td>Keskiarvo:</td>
                    <td>{props.average}</td>
                </tr>
                <tr>
                    <td>Positiivinen:</td>
                    <td>{props.positive + "%"}</td>
                </tr>
            </table>
        </div>
    )
}

const App = () => {
    const feedbackTitle = 'Anna Palautetta!'
    const statistics = 'Statistiikka'
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const average = (good - bad) / (good + bad + neutral);
    const positive = (good) / (good + bad + neutral) * 100;
    return (
        <Statistics feedbackTitle={feedbackTitle} statistics = {statistics} good = {good} goodButton = {setGood} neutral = {neutral} neutralButton = {setNeutral} badButton = {setBad} bad = {bad} average = {average} positive = {positive}/>
    )
}

export default App