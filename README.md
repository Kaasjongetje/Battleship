# About

[Battleship](https://en.wikipedia.org/wiki/Battleship_(game)) is one of the projects that I made for [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-battleship). It was quite a challenging project. The thing that took me the longest was figuring out how to make a Drag and Drop system for the ships. I first tried to use the built-in Drag and Drop API, but that one was too ugly in my opinion. Then I tried searching a library to make the Drag and Drop. After some research I found InteractJS. I tried making the Drag and Drop with that but eventually there was something that I couldn't make and I decided to start over again with the Drag and Drop. I made a system that used mouse hover events to arrange the ships but sometimes hover events weren't called if the element was covered by another element. I decided to switch back to InteractJS and I properly learned the library. I wrote all the code in one file. It worked but it wasn't organized, so I started over again. The same code but split between multiple files.

# Live Preview

[Click here to see the live preview](https://kaasjongetje.github.io/Battleship/)
(Please ignore the ugly UI)

# To Do

1. Improve UI
2. Organize the file structure
3. Making a Location class instead of using an array of 2 items for a location
4. If the AI has found two ship parts in a row, either horizontally/vertically, it should only shoot horizontally/vertically
5. Using React to generate the UI

# Features

1. Drag / Drop system for the ships using [Interact JS](https://interactjs.io/)
2. Rotate system for the ships
3. Random ship placement button
4. AI that shoots the location with the [highest probability](http://datagenetics.com/blog/december32011/index.html)

# Things I learned

1. Testing makes programming less stressful
2. Calling certained functions by doing certained things in the UI (Connection between UI and functions/objects in memory)
3. Trying different solutions until finding one that works (Drag / Drop)
4. Understanding a library first before using it in a project
5. Doing research to find a suitable algorithm (AI)
6. Not writing too much code without testing it first (this prevents lots of bugs)
7. Organizing different parts of the code in different files
8. Creating extra functions to avoid repeating the same code
9. Thinking of the features that I want to add, their requirements and how I can organize them into classes and functions before writing any code 
10. Debugging errors that occured in the UI by finding the cause and then trying to fix it
11. Not thinking, in a way that could lead to stress, about bugs/things I don't know how to make whenever I'm not working on the project (less stressful)
