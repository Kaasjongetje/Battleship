export function getForm() {
    const formElement = document.createElement("form");
    
    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name");
    nameLabel.textContent = "Name";
    
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("id", "name");
    
    const buttonElement = document.createElement("button");
    buttonElement.setAttribute("type", "submit");
    buttonElement.textContent = "Continue";
    
    formElement.appendChild(nameLabel);
    formElement.appendChild(inputElement);
    formElement.appendChild(buttonElement);
    
    return formElement;
}