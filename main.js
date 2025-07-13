import { Book, markRead, myBooks, removeBook } from "./book.js";

document.addEventListener("DOMContentLoaded", () => {
    let booklist = document.querySelector("#booklist");

    for (let book of myBooks) {
        let card = createBookCard(book)
        booklist.appendChild(card);
    }

    const modalBackdrop = document.getElementById("modal-backdrop");
    let newButton = document.querySelector("#newButton")
    newButton.addEventListener("click", () => {
        modalBackdrop.classList.toggle("d-none");
    })

    let form = document.querySelector("#newbookForm")

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        let data = new FormData(form)

        let newBook = new Book(data.get("title"), data.get("author"), parseInt(data.get("pages"), 10), data.get("read") === "on", crypto.randomUUID())
        myBooks.push(newBook);
        let newBookCard = createBookCard(newBook)
        booklist.appendChild(newBookCard);
        modalBackdrop.classList.toggle("d-none")
        form.reset();
    })

    modalBackdrop.addEventListener("click", (e) => {
        if (e.target === modalBackdrop) {
            modalBackdrop.classList.toggle("d-none")
        }
    });


    function createBookCard(book) {
        let card = document.createElement("div")
        card.classList.add("card")
        card.setAttribute("data-uuid", book.uuid)
        card.innerHTML = `
        <p class="book-title">Title: ${book.title}</p>
        <p class="book-author">Author: ${book.author}</p>
        <p class="book-pages">Pages: ${book.pages}</p>
        <p class="book-read">Read: ${book.read ? "Yes" : "No"}</p>
        <div class="buttons">
            <button class="danger delete-button">Delete</button>
            <button class="primary mark-read">${book.read ? "Mark as unread":"Mark read"}</button>
        </div>
    `
        return card;
    }

    booklist.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-button")) {
            const uuid = e.target.closest(".card").dataset.uuid;
            booklist.removeChild(e.target.closest(".card"))
            removeBook(uuid)
        }
        else if (e.target.classList.contains("mark-read")) {
            const uuid = e.target.closest(".card").dataset.uuid;
            let card = e.target.closest(".card")
            let status = markRead(uuid)
            const readPara = card.querySelector(".book-read");
            readPara.textContent = `Read: ${status ? "Yes" : "No"}`;
            e.target.textContent = `${status ? "Mark as unread":"Mark read"}`
        }
    })
})