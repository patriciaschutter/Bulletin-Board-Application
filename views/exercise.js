/* THE EXERCISE 

Create a website that allows people to post messages to a page. A message consists of a title and a body.
The site should have two pages:
- The first page shows people a form where they can add a new message.
- The second page shows each of the messages people have posted.
- Include a nav bar to navigate between pages

Messages must be stored in a postgres database. Create a "messages" table with three columns:
column name / column data type:
- id: serial primary key
- title: text
- body: text

Additional Grading Criteria

As before, your package.json must include the correct dependencies.

Additionally, you must configure postgres as follows:
Name your database "bulletinboard".
Your postgres username must be read from an environment variable named "POSTGRES_USER".
Your postgres password (if present) must be read from an environment variable named "POSTGRES_PASSWORD"

Thus, your connection string in the code will appear as follows:

var connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard';
set an environment variable by opening either ~/.bash_profile for OSX or ~/.bashrc for Linux and adding the line:

export POSTGRES_USER=jon
export POSTGRES_PASSWORD=mypassword
After that, restart your terminal to propagate these changes to your shell.

This will allow Noer to grade your assignments without having to go into your code and change your connection string to his configuration.
