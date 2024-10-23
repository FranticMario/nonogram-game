export default class View {


    createElement(tag, textContent = '', className = '') {
        const element = document.createElement(tag);
        if (textContent) element.textContent = textContent;
        if (className) element.className = className;
        return element;
    }


}