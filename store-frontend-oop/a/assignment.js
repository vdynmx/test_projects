class Course {
    constructor(title, length, price) {
        this.title = title;
        this.length = length;
        this.price = price;
    }

    lengthprice() {
        const lengthprice = this.length / this.price;
        console.log(lengthprice); 
    }

    summary () {
        console.log('the course ' + this.title + ' spans a whole ' + this.length + 'hours. At a bargain price of $' + this.price);
    }

}

class PracticalCourse extends Course {
    constructor(numOfExercises) {
        super();
        this.numOfExercises = numOfExercises;
    }
    render() {
        console.log(this.course);
    }
}

class TheoreticalCourse extends Course {
    constructor() {
    }

    publish() {
        console.log('publish has run');
    }

}


class CourseItem {
    constructor(course) {
        this.course = course;
    }

    render() {
        console.log(this.course);
        console.log(this.course.lengthprice());
        console.log(this.course.summary());
    }
}

class CourseList {
    courses = [
        new Course ('Beginning Javascript', 45, 9.99),
        new Course ('Ruby on Rails', 30, 19.99)
    ]

    constructor() {}

    render() {
        for(const cour of this.courses) {
            const courseItem = new CourseItem(cour);
            courseItem.render();
        }
        
    }

    prac() {
        for(const cour of this.courses) {
            const courseItem = new PracticalCourse(cour);
            courseItem.numOfExercises = 3;
            courseItem.render();
        }
    }
}

const courseList = new CourseList();
courseList.render();
courseList.prac();