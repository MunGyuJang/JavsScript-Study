class DOMHelper {
    static clearEventListeners(element) {
        const clonedElement = element.cloneNode(true);
        element.replaceWith(clonedElement);
        return clonedElement;
    }
    
    static moveElement(elementId, newDestinationSelector) {
        const element = document.getElementById('elementId');
        const destinationElement = document.querySelector(newDestinationSelector);
        destinationElement.append(element);
    }
}

class Component {
    constructor(hostElementId, insertBefore = false) {
        if (hostElementId) {
            this.hostElement = document.getElementById(hostElementId);
        } else {
            this.hostElement = document.body;
        }
        this.insertBefore = insertBefore;

    }

    datach() {
        if (this.element) {
            this.element.remove();
        }
    }

    attach() {
        // document.body.append(this.element);
        this.hostElement.insertAdjacentElement(
            this.insertBefore ? 'afterbegin' : 'beforeend',
            this.element);
    }
}

class Tooltip extends Component {
    constructor(closeNotifierFunction) {
        super();
        this.closeNotifier = closeNotifierFunction;
        this.create();
    }

    closeTooltip() {
        this.datach();
        this.closeNotifier();
    }

    create() {
        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'card';
        tooltipElement.textContent = '';
        tooltipElement.addEventListener('click', this.datach.bind(this));
        this.element = tooltipElement;        
    }
}

class ProjectItem {
    hasActiveTooltip = false;

    constructor(id, updateProjectListsFunction, type) {
        this.id = id;
        this.updateProjectListsHandler = updateProjectListsFunction;
        this.connectMoreInfoBtn();
        this.connectSwitchBtn(type);
    }

    aMoreInfoHandler() {
        if (this.hasActiveTooltip) {
            return;
        }
        const tooltip = new Tooltip(() => this.hasActiveTooltip = false);
        tooltip.attach();
        this.hasActiveTooltip = true;
    }

    connectMoreInfoBtn() {
        const projectItemElement = document.getElementById(this.id);
        const moreInfoBtn = projectItemElement.querySelector('button:first-of-type');
        moreInfoBtn.addEventListener('click', this.aMoreInfoHandler);
    }
    connectSwitchBtn(type) {
        const projectItemElement = document.getElementById(this.id);
        let switchBtn = projectItemElement.querySelector('button:last-of-type');
        switchBtn = DOMHelper.clearEventListeners(switchBtn);
        switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
        switchBtn.addEventListener('click', this.updateProjectListsHandler.bind(null, this.id));
    }

    update(updateProjectListFn, type) {
        this.updateProjectListsHandler = updateProjectListFn;
        this.connectSwitchBtn(type);
    }
}

class ProjectList {
    projects = [];

    constructor(type) {
        this.type = type;
        const prjItems = document.querySelectorAll(`#${this.type}-projects li`);
        for (const prjItem of prjItems) {
            this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type));
        }
    }

    setSwitchHandlerFunction(switchHandlerFunction) {
        this.switchHandler = switchHandlerFunction;
    }

    addProject(project) {
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
        project.update(this.switchProject.bind(this), this.type);
    }

    switchProject(projectId) {
        // const projectIndex = this.projects.findIndex(p => p.id === projectId);
        // this.projects.splice(projectIndex, 1); 일반적으로 생각할 수 있는 방법
        this.switchHandler(this.projects.find(p => p.id === projectId));
        this.projects = this.projects.filter(p => p.id !== projectId); // 역논리
    }
}

class App {
    static init() {
        const activeProjectList = new ProjectList('active');
        const finishedProjectList = new ProjectList('finished');
        activeProjectList.setSwitchHandlerFunction(
            finishedProjectList.addProject.bind(finishedProjectList)
        );
        finishedProjectList.setSwitchHandlerFunction(
            activeProjectList.addProject.bind(activeProjectList)
        );
    }
}

App.init();