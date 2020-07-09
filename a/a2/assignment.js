const task3Element = document.getElementById('task-3');

function message() {
    alert('This shows an alert');
}
task3Element.addEventListener('click', message);

function greeting(name) {
    alert('Hello ' + name);
}
greeting('Sam');

function thee(one, two, three){
    let final = one + two + three;
    alert(final);
}

thee('Moe', 'Larry','Curley');