import { program } from "commander";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const allContacts = await listContacts();
        return console.log(allContacts);
      } catch (error) {
        return console.log(error.message);
      }

      break;

    case "get":
      try {
        const oneContact = await getContactById(id);
        return console.log(oneContact);
      } catch (error) {
        return console.log(error.message);
      }
      break;

    case "add":
      try {
        const newContact = await addContact(name, email, phone);
        return console.log(newContact);
      } catch (error) {
        return console.log(error.message);
      }
      break;

    case "remove":
      try {
        const deleteContact = await removeContact(id);
        return console.log(deleteContact);
      } catch (error) {
        return console.log(error.message);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
