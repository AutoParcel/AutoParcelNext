// Import necessary libraries
const PrismaClient = require('@prisma/client');
const Fuse = require('fuse.js');

var form_entry_name;

async function getStudentRecords() {
  const prisma = new PrismaClient();
  const studentRecords = await prisma.Student.findMany();
  return studentRecords;
}

const options = {
    includeScore: true,
    algorithms: ["levenshtein", "jaro-winkler"],
    keys: [
      {
        name: 'name',
        // weight: 0.8
      },
    //   {
        // name: 'student_id',
        // weight: 0.5
    //   }
    ]
  }
  

  const fuse = new Fuse(student_list, options)
  const result = fuse.search(form_entry_name)

  
