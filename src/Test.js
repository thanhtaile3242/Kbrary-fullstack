const listBook = [
    {
        bookId: {
            _id: "659f440cc38825012c4c7d91",
            bookName: "Kanji Look and Learn",
            category: {
                _id: "659f43f5c38825012c4c7d8d",
                categoryName: "language",
            },
            imageName: "string",
        },
        quantityBorrow: 3,
    },
    {
        bookId: {
            _id: "659f440cc38825012c4c7d33",
            bookName: "Java",
            category: {
                _id: "659f43f5c38825012c4c7d8d",
                categoryName: "programming",
            },
            imageName: "string",
        },
        quantityBorrow: 5,
    },
];

listBook.forEach((book) => {
    book.bookId = book.bookId._id;
});
console.log(listBook);
