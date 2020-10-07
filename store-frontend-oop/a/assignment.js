class Course {
    constructor (courseTitle, courseLength, coursePrice) {
        this.title = courseTitle,
        this.length = courseLength,
        this.price = coursePrice
    }
    get price(){
        return '$'+this.price
    }
    set price(value){
        this.price=value;
    }
    calculateValue() {
        return this.length/this.price;
    }

    printSummary() {
        console.log(`Title: ${this.title}, Length: ${this.length}. Price: ${this.price}`);
    }
}

jsCourse = new Course ('JAvascript 2020', 48, 9.99);
pyCourse = new Course ('Python 2020', 35, 19.99);
    
console.log(jsCourse.price);
jsCourse.price(10.99)

console.log(pyCourse); 
console.log(jsCourse.calculateValue());
console.log(pyCourse.calculateValue());   
    
jsCourse.printSummary();
pyCourse.printSummary();

class PracticalCourse extends Course {
    constructor(title, legnth, price, exercisesCount){
        super(title, price, length);
        this.numOfExercises = exercisesCount;
    }

}
const angularCourse = new PracticalCourse (
    'React Guide',
    25,
    10,
    80
);

console.log(angularCourse);
angularCourse.printSummary();

class TheoreticalCourse extends Course {
    publish() {
        console.log('publishihg');
    }
}

const flutterCourse = new TheoreticalCourse (
    'Flutter Course',
    33,
    20
    );

flutterCourse.printSummary();
flutterCourse.publish();
