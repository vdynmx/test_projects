class Course {
    constructor(title, length, price) {
        this.title = title;
        this.length = length;
        //this.price = price;
        checkPrice(price);
    }

    set checkPrice(value) {
        console.log(value);
        if(value > 0) {
            this.price = value; 
        }
    }

    get displayPrice (){
        const priceFormat = '$' + this.price;
        return priceFormat;
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
    constructor(title, length, price, numOfExercises) {
        super(title, length, price);
        this.numOfExercises = numOfExercises;
    }
    render() {

        console.log(this);
    }
}

class TheoreticalCourse extends Course {
    constructor() {
        super();
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
        this.course.lengthprice();
        this.course.summary();
    }
}

class CourseList {
    courses = [
        new Course ('Beginning Javascript', 45, -9.99),
        new Course ('Ruby on Rails', 30, 19.99)
    ]

    constructor() {}

    render() {
        for(const cour of this.courses) {
            const courseItem = new CourseItem(cour);
            courseItem.render();

        }
        
    }
}   
class PracticalList {
    courses = [
        new PracticalCourse ('Beginning Javascript', 45, 9.99, 5),
        new PracticalCourse ('Ruby on Rails', 30, 19.99, 3)
    ]
    render() {
        for(const cour of this.courses) {
            const pracItem = new CourseItem(cour);
            pracItem.render();

        }
        
    }
    
}
/*
    prac() {
        for(const cour of this.courses) {
            const courseItem = new PracticalCourse(cour);
            courseItem.numOfExercises = 3;
            courseItem.render();
        }
    }
    */


const courseList = new CourseList();
courseList.render();
const pracList = new PracticalList();
pracList.render();
const theoCourse = new TheoreticalCourse();
theoCourse.publish();
/*courseList.prac();*/