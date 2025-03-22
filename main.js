import linkedList from "./linked-list.js";
import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function prompt(text = "") {
  let userInput;

  userInput = await new Promise((resolve, reject) => {
    rl.question(text, (input) => {
      resolve(input);
    });
  });

  return userInput;
}

function showInstructions() {
  console.log("Options");
  console.log("\t[1] Append a value");
  console.log("\t[2] Prepend a value");
  console.log("\t[3] Print size of list.");
  console.log("\t[4] Print item at head.");
  console.log("\t[5] Print item at tail.");
  console.log("\t[6] Print item at index.");
  console.log("\t[7] Pop an item off the list.");
  console.log("\t[8] Check if the list contains a value.");
  console.log("\t[9] Get the index of a value.");
  console.log("\t[10] Insert a value at index.");
  console.log("\t[Q] Quit");
  console.log("\t[?] Show these instructions again.");
}

function printItem(node) {
  if (node !== null) {
    console.log(`( ${node.value} )`);
  } else {
    console.log("null");
  }
}

showInstructions();

async function handleUserInput() {
  let input;
  let done = false;
  let list = linkedList();
  let invalidCount = 0;

  async function search() {
    let value = await prompt("What value do you want to look for? ");
    let result = list.contains(value);
    console.log(`The list does${result ? "" : " not"} contain: ${value}`);
  }

  async function getIndex() {
    let value = await prompt("What value do you want to look for? ");
    let index = list.find(value);
    if (index !== null) {
      console.log(`${value} is at index ${index}`);
    } else {
      console.log(`${value} not found`);
    }
  }

  while (!done) {
    input = await prompt("Enter an option: ");
    switch (input) {
      case "1":
        list.append(await prompt(`Enter a value to append: `));
        break;
      case "2":
        list.prepend(await prompt("Enter a value to prepend: "));
        break;
      case "3":
        console.log(list.size());
        break;
      case "4":
        printItem(list.head());
        break;
      case "5":
        printItem(list.tail());
        break;
      case "6":
        printItem(list.at(+(await prompt("Enter an index: "))));
        break;
      case "7":
        console.log("Popping...");
        list.pop();
        break;
      case "8":
        await search();
        break;
      case "9":
        await getIndex();
        break;
      case "10":
        list.insertAt(await prompt("Value: "), +(await prompt("Index: ")));
        break;
      case "Q":
        done = true;
        break;
      case "?":
        showInstructions();
        break;
      default:
        console.log("Invalid input, try again:");
        invalidCount += 1;

        if (invalidCount > 10) {
          console.log("Too many invalid commands. Exiting...");
          done = true;
        }
    }
    console.log(list.toString());
  }
}

await handleUserInput();
rl.close();
