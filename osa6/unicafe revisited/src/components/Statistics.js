import React from 'react';
import Button from "./Button";
import StatisticLine from "./StatisticLine";

const Statistics = ({store}) => {
    const feedbackTitle = 'Anna Palautetta!'
    const statistics = 'Statistiikka'
    const average = (store.getState().good - store.getState().bad) / (store.getState().good + store.getState().bad + store.getState().ok);
    const positive = (store.getState().good) / (store.getState().good + store.getState().bad + store.getState().ok) * 100;
    if (store.getState().good === 0 && store.getState().ok === 0 && store.getState().bad === 0) {
        return (
            <div>
                <h1>{feedbackTitle}</h1>
                <Button onClick={() => store.dispatch({type: 'GOOD'})} text="Hyvä" />
                <Button onClick={() => store.dispatch({type: 'OK'})} text="Neutraali" />
                <Button onClick={() => store.dispatch({type: 'BAD'})} text="Huono" />
                <h1>{statistics}</h1>
                Ei palautetta annettu.
            </div>
        )
    }
    return (
        <div>
            <h1>{feedbackTitle}</h1>
            <Button onClick={() => store.dispatch({type: 'GOOD'})} text="Hyvä" />
            <Button onClick={() => store.dispatch({type: 'OK'})} text="Neutraali" />
            <Button onClick={() => store.dispatch({type: 'BAD'})} text="Huono" />
            <StatisticLine text="Hyvä:" value={store.getState().good}/>
            <h1>{statistics}</h1>
            <table>
                <tr>
                    <td>Hyvä:</td>
                    <td>{store.getState().good}</td>
                </tr>
                <tr>
                    <td>Neutraali:</td>
                    <td>{store.getState().ok}</td>
                </tr>
                <tr>
                    <td>Huono:</td>
                    <td>{store.getState().bad}</td>
                </tr>
                <tr>
                    <td>Kaikki:</td>
                    <td>{store.getState().good + store.getState().ok + store.getState().bad}</td>
                </tr>
                <tr>
                    <td>Keskiarvo:</td>
                    <td>{average}</td>
                </tr>
                <tr>
                    <td>Positiivinen:</td>
                    <td>{positive + "%"}</td>
                </tr>
            </table>
        </div>
    );
}

export default Statistics