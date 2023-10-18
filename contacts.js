const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

const getAll = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getById = async (id) => {
  const contactId = String(id);
  const contacts = await getAll();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const add = async (data) => {
  const contacts = await getAll();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const deleteById = async (id) => {
  const contactId = String(id);
  const contacts = await getAll();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

module.exports = {
  getAll,
  getById,
  add,
  deleteById,
};
