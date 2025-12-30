import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "results", "form", "selectedBookKey", "selectedBookTitle", "selectedBookAuthor"]

  connect() {
    this.selectedIndex = -1
    this.dropdownVisible = false
  }

  search() {
    const query = this.inputTarget.value.trim()
    if (query.length < 3) {
      this.hideDropdown()
      return
    }

    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        const books = data.docs.slice(0, 10)
        if (books.length > 0) {
          this.resultsTarget.innerHTML = books.map(book => {
            const title = book.title || "No title"
            const key = book.cover_edition_key
            const author = book.author_name?.join(", ") || "Unknown author"
            const display = `${title} by ${author}`
            return `
              <li 
                class="cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-400 px-4 py-2"
                value="${display}"
                data-action="click->book#select"
                data-title="${title}"
                data-author="${author}"
                data-key="${key}"
              >
                ${display}
              </li>
            `
          }).join("")
        } else {
          this.resultsTarget.innerHTML = `<option value="">None found</option>`
        }
        this.showDropdown()
      })
      .catch(err => {
        console.error("Fetch error:", err)
        this.resultsTarget.innerHTML = `<li class="p-2 text-red-500">Error loading results</li>`
        this.showDropdown()
      })
  }


  showDropdown() {
    this.resultsTarget.classList.remove("hidden")
    this.dropdownVisible = true
  }

  hideDropdown() {
    this.resultsTarget.classList.add("hidden")
    this.dropdownVisible = false
  }

  hideDropdownIfNeeded(event) {
    setTimeout(() => this.hideDropdown(), 150) // Delay to allow click event
  }


  select(event) {
    const title = event.currentTarget.dataset.title
    const author = event.currentTarget.dataset.author
    const key = event.currentTarget.dataset.key

    this.inputTarget.value = `${title} by ${author}`
    this.selectedBookKeyTarget.value = key
    this.selectedBookAuthorTarget.value = author
    this.selectedBookTitleTarget.value = title


    this.hideDropdown()
  }
}