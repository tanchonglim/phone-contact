const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class ContactService {
  getAllContacts() {
    return prisma.contact.findMany();
  }
  getContactById(id) {
    return prisma.contact.findUnique({
      where: {
        id,
      },
    });
  }
  addContact(contact) {
    return prisma.contact.create({
      data: contact,
    });
  }
  updateContact(id, contact) {
    return prisma.contact.update({
      data: contact,
      where: {
        id,
      },
    });
  }
  deleteContact(id) {
    return prisma.contact.delete({
      where: {
        id,
      },
    });
  }
}

module.exports = new ContactService();
