interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

interface CoursePartBasicBase extends CoursePartBase {
    description: string;
}

interface CoursePartBasic extends CoursePartBasicBase {
    kind: "basic"
}

interface CoursePartBackground extends CoursePartBasicBase {
    backgroundMaterial: string;
    kind: "background"
}

interface CoursePartSpecial extends CoursePartBasicBase {
    requirements: string[];
    kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
