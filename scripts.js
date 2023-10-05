import { booksPerPage, authors, genres, books } from './data.js'


//Show books on the home screen.
let [bookStart, bookEnd] = [0, 36]; //uses destructuring to assign 0 to bookStart and 36 to bookEnd(total bboks displayed = 37)
const inco = document.querySelector('[data-list-items]') //Targets where we want to edit or work.
const extracted = books.slice(bookStart, bookEnd) //given start, up to a (not inclusive) given end
const fragment = document.createDocumentFragment()  //new DocumentFragment object, which is a lightweight container for storing a collection of DOM nodes.
for (const { author, image, title, id, description, published } of extracted) {

    let element = document.createElement('button')
    //Elements - Used to populate the book details in the overlay.
    element.classList = 'preview'
    element.dataset.id = id
    element.dataset.title = title
    element.dataset.description = description
    element.dataset.image = image
    element.dataset.subtitle = (`${authors[author]} (${(new Date(published)).getFullYear()})`)
    element.setAttribute('data-preview', id)

    element.innerHTML = /*Image, Name and tile used to display books*/ `
            <div><img
                class ="preview__image"
                src="${image}"
            /></div>
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `
    fragment.appendChild(element) //This line of code appends the element to the fragment.
}
inco.appendChild(fragment) /* This process efficiently adds all of the books to the DOM in
 a single operation, reducing the number of DOM manipulation operations.
 + This also helps with perfomance*/



//Display book details(preview).
const details = (event) => {
    //These variables will be used to update the content of the modal window later in the code.
    const image1 = document.querySelector('[data-list-image]')
    const title = document.querySelector('[data-list-title]')
    const overlay1 = document.querySelector('[data-list-active]')
    const subtitle = document.querySelector('[data-list-subtitle]')
    const description = document.querySelector('[data-list-description]')


    //Tenary conditional statements instead of a if else statement.
    event.target.dataset.id ? overlay1.style.display = 'block' : undefined;
    event.target.dataset.title ? title.innerHTML = event.target.dataset.title : undefined;
    event.target.dataset.subtitle ? subtitle.innerHTML = event.target.dataset.subtitle : undefined;
    event.target.dataset.description ? description.innerHTML = event.target.dataset.description : undefined;
    event.target.dataset.image ? image1.setAttribute('src', event.target.dataset.image) : undefined;

}
document.querySelector('[data-list-items]').addEventListener('click', details)
document.querySelector('[data-list-close]').addEventListener('click', (event) => {
    document.querySelector('[data-list-active]').style.display = 'none'
})


//Search more
const matches = books; // Assuming books variable has already been declared and assigned from data.js
const page = 1;
const moreBooks = document.querySelector('[data-list-button]');
const showMore = page * booksPerPage;

moreBooks.disabled = !(matches.length - showMore > 0);
moreBooks.innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining">${matches.length - showMore > 0 ? matches.length - showMore : 0}</span>
`;

moreBooks.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default action of the button when clicked.
    moreBooks.focus();
});





//Theme
const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

const settingOverlay = document.querySelector('[data-header-settings]')

settingOverlay.addEventListener('click', (event) => {
    document.querySelector('[data-settings-overlay]').style.display = 'block' //shows an overlay element with a data-settings-overlay attribute.
})
const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary")

saveButton.addEventListener('click', (event) => {
    event.preventDefault() //prevent the default behavior of the button
    if (dataSettingsTheme.value === 'day') {
        document.querySelector('body').style.setProperty('--color-dark', day.dark)
        document.querySelector('body').style.setProperty('--color-light', day.light)
        document.querySelector('[data-settings-overlay]').style.display = 'none'
    }
    if (dataSettingsTheme.value === 'night') {
        document.querySelector('body').style.setProperty('--color-dark', night.dark)
        document.querySelector('body').style.setProperty('--color-light', night.light)
        document.querySelector('[data-settings-overlay]').style.display = 'none'
    }
});



//These lines select the HTML elements with the data-search-genres and data-search-authors attributes and create a new option element.
const dataGenres = document.querySelector('[data-search-genres]');
const dataAuthors = document.querySelector('[data-search-authors]');
const allOption = document.createElement('option');

allOption.innerText = 'All Genres';
dataGenres.appendChild(allOption);

for (const [id, names] of Object.entries(genres)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = names
    dataGenres.appendChild(element)

    const authorsOption = document.createElement('option');
    authorsOption.innerText = 'All Authors';
    dataAuthors.appendChild(authorsOption);
    for (const [id, names] of Object.entries(authors)) {
        const element = document.createElement('option')
        element.value = id
        element.innerText = names
        dataAuthors.appendChild(element)
    }
}


//Search button 

//This line selects the HTML element and assigns it to the _______ constant.
const searchButton = document.querySelector('[data-header-search]');
const searchOverlay = document.querySelector('[data-search-overlay]');
const searchTitle = document.querySelector('[data-search-title]');
const searchCancel = document.querySelector('[data-search-cancel]');

//code adds an event listener to the search button element. When clicked, it sets the open property of the search overlay element to true, which makes it visible. It also focuses on the search title element. There is also another event listener added to the search cancel button, but it is not yet functional.
searchButton.addEventListener('click', () => {
    searchCancel.addEventListener('click', () => { //cancel button not working yet.
        searchCancel.open = false;
    });
    searchOverlay.open = true;
    searchTitle.focus();
});






// genres.appendChild(element)

// for ([id, title]; Object.entries(genres); i++) { //changed name to tittle
//     document.createElement('option')
//     element.value = value
//     element.innerText = text
//     genres.appendChild(element)
// }

//  data-search-genres.appendChild(genres)

//  const authors = document.createDocumentFragment()
// element = document.createElement('option')
// element.value = 'any'
// element.innerText = 'All Authors'
// authors.appendChild(element)

// for ([id, title];Object.entries(authors); id++) {
//     document.createElement('option')
//     element.value = value
//     element = text
//     authors.appendChild(element)
// }

// data-search-authors.appendChild(authors)

// data-settings-theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
// v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' | 'day'

// document.Element.style.setProperty('--color-dark', css[v].dark);
// document.Element.style.setProperty('--color-light', css[v].light);
// data-list-button = "Show more (books.length - BOOKS_PER_PAGE)"

// data-list-button.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)


// data-search-cancel.click() { data-search-overlay.open === false }
// data-settings-cancel.click() { querySelect(data-settings-overlay).open === false }
// data-settings-form.submit() { actions.settings.submit }
// data-list-close.click() { data-list-active.open === false }

// data-list-button.click() {
//     document.querySelector([data-list-items]).appendChild(createPreviewsFragment(matches, page x BOOKS_PER_PAGE, {page + 1} x BOOKS_PER_PAGE]))
//     actions.list.updateRemaining()
//     page = page + 1
// }











// if (!books || !Array.isArray(books)) throw new Error('Source required');
// if (!range || range.length < 2) throw new Error('Range must be an array with two numbers');
//Commented code out because it throws an error and affects my code.
