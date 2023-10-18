const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const contacts = require("./contacts");

// const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.getAll();
      return console.table(allContacts);
      break;

    case "get":
      const oneContact = await contacts.getById(id);
      return console.log(oneContact);
      break;

    case "add":
      const newContact = await contacts.add({ name, email, phone });
      return console.log(newContact);
      break;

    case "remove":
      const deleteContact = await contacts.deleteById(id);
      return console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

const arr = hideBin(process.argv);
const { argv } = yargs(arr);
invokeAction(argv);

// const actionIndex = process.argv.indexOf("--action");
// if (actionIndex !== -1) {
//   const action = process.argv[actionIndex + 1];
//   invokeAction({ action });
// }

// invokeAction(argv);

// invokeAction({
//   action: "add",
//   id: "sdfghjk",
//   name: "worm",
//   email: "dfg@gmail.com",
//   phone: "234567890",
// });
