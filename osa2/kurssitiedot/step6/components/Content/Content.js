import Part from "../Part/Part";

const Content = ( {props} ) => {
    return (
        <div>
            {props.map(part =>
                <Part key={part.id} name = {part.name} exercise = {part.exercises}/>
            )}
        </div>
    )
};

export default Content