import { loadPackageDefinition, credentials } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

const packageDefinition = loadSync("./library.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const library = loadPackageDefinition(packageDefinition).library;

import { createInterface } from "readline";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// create dummy book data
const dummyBook = {
  id: "123",
  title: "Dummy Book",
  author: "Dummy Author",
};

// // add dummy book data to the library
// client.AddBook({ book: dummyBook }, (err, response) => {
//   console.log("Dummy book added successfully: ", response);
// });

const addBook = () => {
  readline.question("Enter book ID: ", (id) => {
    readline.question("Enter book title: ", (title) => {
      readline.question("Enter book author: ", (author) => {
        const book = {
          id: id,
          title: title,
          author: author,
        };
        client.AddBook({ book: book }, (err, response) => {
          console.log("Book added successfully: ", response);
          readline.close();
        });
      });
    });
  });
};

const getBook = () => {
  readline.question("Enter book ID: ", (id) => {
    client.GetBook({ id: id }, (err, response) => {
      console.log("Book retrieved successfully: ", response);
      readline.close();
    });
  });
};

const updateBook = () => {
  readline.question("Enter book ID: ", (id) => {
    readline.question("Enter updated book title: ", (title) => {
      readline.question("Enter updated book author: ", (author) => {
        const book = {
          id: id,
          title: title,
          author: author,
        };
        client.UpdateBook({ book: book }, (err, response) => {
          console.log("Book updated successfully: ", response);
          readline.close();
        });
      });
    });
  });
};

const deleteBook = () => {
  readline.question("Enter book ID: ", (id) => {
    client.DeleteBook({ id: id }, (err, response) => {
      console.log("Book deleted successfully: ", response);
      readline.close();
    });
  });
};
const getAllBooks = () => {
  client.getAllBooks({}, (err, response) => {
    if (err) {
      console.error("Error getting all books: ", err);
      return;
    }
    console.log("All books retrieved successfully: ", response.books);
    readline.close();
  });
};

const main = () => {
  readline.question(
    "Selamat datang di perpustakaan dalam terminal \n Apa yang bisa saya bantu? \n add, get, update, delete, getAll: \n",
    (operation) => {
      switch (operation) {
        case "add":
          addBook();
          break;
        case "get":
          getBook();
          break;
        case "update":
          updateBook();
          break;
        case "delete":
          deleteBook();
          break;
        case "getAll":
          getAllBooks();
          break;
        default:
          console.log("Invalid operation");
          readline.close();
          break;
      }
    }
  );
};

const client = new library.LibraryService(
  "localhost:50051",
  credentials.createInsecure()
);

main();
