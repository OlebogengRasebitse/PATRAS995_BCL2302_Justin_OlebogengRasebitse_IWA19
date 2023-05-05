import { booksPerPage, authors, genres, books } from './data.js'

const matches = books
const page = 1;



// const range = [12, 24]; // Not sure about this. just added the number for control.

// if (!books || !Array.isArray(books)) {
//   throw new Error('Source required');
// }

// if (!range || !Array.isArray(range) || range.length !== 2) {
//   throw new Error('Range must be an array with two numbers');
// }


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
settingOverlay.addEventListener('click', (event)=>{
    document.querySelector('[data-settings-overlay]').style.display = 'block'
})
const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary")
saveButton.addEventListener('click', (event) =>{
    event.preventDefault()
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
} );



//MORE BUTTON
const moreBooks = document.querySelector('[data-list-button]')
const showMore = page * booksPerPage;
moreBooks.disabled = !(matches.length - showMore > 0) 
moreBooks.innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining">${matches.length - showMore > 0 ? matches.length - showMore : 0}</span>
`;

moreBooks.addEventListener( 'click', () =>{
    showMore.click = true ;
   moreBooks.focus();


})

const showMoreButton = document.querySelector('[data-list-button]');
let startIndex = 36;
let endIndex = 72;

showMoreButton.addEventListener('click', () => {
  const extracted = books.slice(startIndex, endIndex);

  const fragment = document.createDocumentFragment();
  for (const { author, image, title, id, description, published } of extracted) {
    const element = document.createElement('button');
    element.classList.add('preview');
    element.dataset.id = id;
    element.dataset.title = title;
    element.dataset.description = description;
    element.dataset.image = image;
    element.dataset.subtitle = `${authors[author]} (${new Date(published).getFullYear()})`;
    element.setAttribute('data-preview', id);

    element.innerHTML = /* html */ `
      <div>
        <img class="preview__image" src="${image}" />
      </div>
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>
    `;

    fragment.appendChild(element);
  }

  document.querySelector('[data-list-items]').appendChild(fragment);

  startIndex += 36;
  endIndex += 36;
});




// fragment = document.createDocumentFragment()
// const extracted = books.slice(0, 36)

// for ({ author, image, title, id }; extracted; i++) {
//     const preview = createPreview({
//         author,
//         id,
//         image,
//         title
//     })

//     fragment.appendChild(preview)
// }

 const fragment = document.createDocumentFragment();
// const extracted = books.slice(0, 36);



//  for ({ authors, image, title, id } of extracted) {
//      const preview = createPreview{
//          authors,
//          id,
//          image,
//      };

//     fragment.appendChild(preview);
// }

// data-list-items.appendChild(fragment)



//author and book dont search the correct books
  


 
  


 
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

// data-list-button.innerHTML = /* html */ [
//     '<span>Show more</span>',
//     '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',
// ]

// data-search-cancel.click() { data-search-overlay.open === false }
// data-settings-cancel.click() { querySelect(data-settings-overlay).open === false }
// data-settings-form.submit() { actions.settings.submit }
// data-list-close.click() { data-list-active.open === false }

// data-list-button.click() {
//     document.querySelector([data-list-items]).appendChild(createPreviewsFragment(matches, page x BOOKS_PER_PAGE, {page + 1} x BOOKS_PER_PAGE]))
//     actions.list.updateRemaining()
//     page = page + 1
// }




//Search button 
 const searchButton = document.querySelector('[data-header-search]');
 const searchOverlay = document.querySelector('[data-search-overlay]');
 const searchTitle = document.querySelector('[data-search-title]');
//  const searchCancel = document.querySelector('body > dialog:nth-child(4) > div > div > button:nth-child(1)');
 
 searchButton.addEventListener('click', () => {
//    searchCancel.open = true;
   searchOverlay.open = true;
   searchTitle.focus();
 });

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

 

//    data-search-form.click(filters, () => {
//       preventDefault()
//       const formData = new FormData(event.target);
//       const filters = Object.fromEntries(formData);
//       result = []

    //  for ( book; booksList; i++) {
    //       titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
    //       authorMatch = filters.author = 'any' || book.author === filters.author

    //       {
    //           genreMatch = filters.genre = 'any'
    //           for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
    //       }

    //       if titleMatch && authorMatch && genreMatch => result.push(book)
    //   })

//      if display.length < 1 
//      data-list-message.class.add('list__message_show')
//      else data-list-message.class.remove('list__message_show')
    

//     data-list-items.innerHTML = ''
//////////////////////BOOK LIST ON THE MAIN PAGE////////////////////////////
         
const extract = books.slice(0,36) 
console.log(books[0])
const inco = document.querySelector('[data-list-items]') 

for ( const {author, image, title, id } of  extract) {       

    let element = document.createElement('button')
    element.classList = 'preview'
    element.setAttribute('data-preview', id)

    element.innerHTML = /* html */ `
        <img
            class ="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
             <div class="preview__author">${authors[author]}</div>
        </div>
    `

    fragment.appendChild(element)
}

inco.appendChild(fragment)      



    ////////////////////////
    
//     data-list-items.appendChild(fragments)
//     initial === matches.length - [page * BOOKS_PER_PAGE]
//     remaining === hasRemaining ? initial : 0
//     data-list-button.disabled = initial > 0

//     data-list-button.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `

//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     data-search-overlay.open = false
// }

// data-settings-overlay.submit; {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light);
//     data-settings-overlay).open === false
// }

data-list-items.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
        if (active) break;
        const previewId = node?.dataset?.preview;
    
        for (const singleBook of books) {
            if (singleBook.id === previewId) {
                active = singleBook;
                break;
            }
        } 
    }

    if (active) {
        data-list-active.open = true;
        data-list-blur.style.backgroundImage = `url(${active.image})`;
        data-list-image.src = active.image;
        data-list-title.textContent = active.title;
        data-list-subtitle.textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
        data-list-description.textContent = active.description;
      }
    }
);