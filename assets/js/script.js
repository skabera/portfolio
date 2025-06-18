'use strict';

// Ensure DOM is loaded before accessing elements
if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}

function init() {
  // element toggle function
  const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

  // sidebar variables
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  // sidebar toggle functionality for mobile
  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
  }

  // testimonials variables
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");

  // modal variable
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  // modal toggle function
  const testimonialsModalFunc = function () {
    if (modalContainer) modalContainer.classList.toggle("active");
    if (overlay) overlay.classList.toggle("active");
  }

  // add click event to all modal items
  if (testimonialsItem) {
    testimonialsItem.forEach(item => {
      item.addEventListener("click", function () {
        if (modalImg && this.querySelector("[data-testimonials-avatar]")) {
          modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
          modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        }
        if (modalTitle && this.querySelector("[data-testimonials-title]")) {
          modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
        }
        if (modalText && this.querySelector("[data-testimonials-text]")) {
          modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
        }
        testimonialsModalFunc();
      });
    });
  }

  // add click event to modal close button
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

  // custom select variables
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");

  // custom select functionality
  if (select) {
    select.addEventListener("click", function () { elementToggleFunc(this); });
  }

  // add event in all select items
  if (selectItems) {
    selectItems.forEach(item => {
      item.addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        if (selectValue) selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
      });
    });
  }

  // filter variables
  const filterItems = document.querySelectorAll("[data-filter-item]");

  // filter function
  const filterFunc = function (selectedValue) {
    if (filterItems) {
      filterItems.forEach(item => {
        if (selectedValue === "all") {
          item.classList.add("active");
        } else if (selectedValue === item.dataset.category) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    }
  }

  // add event in all filter button items for large screen
  let lastClickedBtn = filterBtn ? filterBtn[0] : null;

  if (filterBtn) {
    filterBtn.forEach(btn => {
      btn.addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        if (selectValue) selectValue.innerText = this.innerText;
        filterFunc(selectedValue);
        if (lastClickedBtn) lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
      });
    });
  }

  // contact form variables
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  // add event to all form input field
  if (formInputs) {
    formInputs.forEach(input => {
      input.addEventListener("input", function () {
        if (form && formBtn) {
          if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
          } else {
            formBtn.setAttribute("disabled", "");
          }
        }
      });
    });
  }

  // page navigation variables
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  // add event to all nav link
  if (navigationLinks) {
    navigationLinks.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetPage = this.innerHTML.toLowerCase();
        const targetId = this.getAttribute('href').substring(1); // Get the id without #
        
        // Remove active class from all pages and links
        pages.forEach(page => page.classList.remove("active"));
        navigationLinks.forEach(navLink => navLink.classList.remove("active"));
        
        // Find and activate the matching page
        const matchingPage = document.querySelector(`#${targetId}`);
        
        if (matchingPage) {
          matchingPage.classList.add("active");
          this.classList.add("active");
          window.scrollTo(0, 0);
        }
      });
    });
  }
}