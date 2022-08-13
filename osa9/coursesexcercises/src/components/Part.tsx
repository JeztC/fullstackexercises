import CoursePart from "../types/types";

const Part = ({ coursePart }: { coursePart: CoursePart })  => {
    switch (coursePart.name) {
        case "Fundamentals":
            return (
                <div>
                    <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
                    <i>{"description" in coursePart ? coursePart.description : ""}</i>
                </div>
            )
        case "Advanced":
            return (
                <div>
                    <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
                    <i>{"description" in coursePart ? coursePart.description : ""}</i>
                </div>
            )
        case "Using props to pass data":
            return (
                <div>
                    <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
                    Project exercises {"groupProjectCount" in coursePart ? coursePart.groupProjectCount : 0}
                </div>
            )
        case "Deeper type usage":
            return (
                <div>
                    <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
                    <i>{"description" in coursePart ? coursePart.description : ""}</i>
                    <p>Submit to {"exerciseSubmissionLink" in coursePart ? coursePart.exerciseSubmissionLink : ""}</p>
                </div>
            )
        case "Backend development":
            return (
                <div>
                    <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
                    <i>{"description" in coursePart ? coursePart.description : ""}</i>
                    <p>Required skills {"requirements" in coursePart ? coursePart.requirements.join(", ") : []}</p>
                </div>
            )
        default:
            return null;
    }
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

export default Part