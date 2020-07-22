class ProjectItem {
    constructor(id) {
        this.id = id;
    }

}

class ProjectList {
    // Project list class to parse content so I know what list a project belongs to
    projects = []; // projects field as an empty array
    //fields are translated to properties
    constructor(type) {
        const prjItems = document.querySelectorAll(`#${type}-project li`);
        // prjItems 
        console.log(prjItems);
        for (const prjItem of prjItems) {
            this.projects.push(new ProjectItem(prjItem.id));
            //the id in prjItem.id refers to the id the DOM (html document)
        }
    }
}

class ToolTip {

}

class App { // general overlaying class to rerun any methods
    static init() { //static method to initialize the page
        const activeProjectList = new ProjectList('active');
        const finishedProjectList = new ProjectList('finished');
    }
}

App.init();