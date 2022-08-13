// new types
interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface DescriptiveCoursePart extends CoursePartBase {
    description : string
}

interface CourseNormalPart extends DescriptiveCoursePart {
    type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends DescriptiveCoursePart {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseRequirementPart extends DescriptiveCoursePart {
    requirements : Array<string>
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseRequirementPart;

export default CoursePart