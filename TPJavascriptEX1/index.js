
const section_button = document.querySelector('section')  

let i = 1;
let text_button = "Tous"  
while (i < 5) {
    createMarkup("button", text_button, section_button, [{name: "class", value: "btn btn-primary"}])
    if (i === 1) {
        text_button = "HTML"
    } else if (i === 2) {
        text_button = "CCS"
    } else if (i === 3) {
        text_button = "JS"
    }
    i++
}

const cont_cards = createMarkup("section", "", document.body, [{name: "class", value: "container mt-5 gap-4 d-flex flex-wrap justify-content-center"}])

let u = 1
let value_class = "w-25 px-3 p-1 border rounded bg-white html"
let text_para = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ex purus, rhoncus ut justo ac, fermentum auctor augue. HTML HTML HTML"

while (u < 17) {
    const card = createMarkup("article", "", cont_cards, [{name: "class", value: value_class}])
    createMarkup("p", text_para, card, [{name: "class", value: "h6"}])
    if (u > 4 && u < 12) {
        value_class = "w-25 px-3 p-1 border rounded bg-white css"
        text_para = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ex purus CSS CSS CSS"
    } else if (u >=12) {
        value_class = "w-25 px-3 p-1 border rounded bg-white js"
        text_para = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. JS JS JS"
    }
    u++
}

const articles = document.querySelectorAll("article")

const button_all = section_button.querySelector(":nth-child(1)")
const button_html = section_button.querySelector(":nth-child(2)")
const button_css = section_button.querySelector(":nth-child(3)")
const button_js = section_button.querySelector(":nth-child(4)")

button_all.onclick = filterArticlesAll

button_html.onclick = () => {
    filterArticles("w-25 px-3 p-1 border rounded bg-white html")
}
button_css.onclick = () => {
    filterArticles("w-25 px-3 p-1 border rounded bg-white css")
}
button_js.onclick = () => {
    filterArticles("w-25 px-3 p-1 border rounded bg-white js")
}

function filterArticles(class_button) {
    articles.forEach(element => {
        if (element.getAttribute('class') === class_button) {
            element.hidden = false
        } else {
            element.hidden = true
        }
    });
}

function filterArticlesAll() {
    articles.forEach(element => {
       element.hidden = false
    });
}

function createMarkup(markup_name, text, parent, attributes) {
    const markup = document.createElement(markup_name)
    markup.textContent = text;
    parent.appendChild(markup);
    for (let u = 0; u < attributes.length; u++){
      if (attributes[u] && attributes[u].hasOwnProperty("name")) {
        markup.setAttribute(attributes[u].name, attributes[u].value)
      }
    }
    return markup;
  }   