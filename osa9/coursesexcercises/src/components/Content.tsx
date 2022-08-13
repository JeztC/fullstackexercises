import Part from "./Part";
import CoursePart from "../types/types";

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => (
    <div>
        {courseParts.map(course =>
            <Part key = {course.name} coursePart={course}/>
        )}
    </div>
);

export default Content