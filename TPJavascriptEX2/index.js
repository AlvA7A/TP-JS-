
const container = document.querySelector("section")

const form_regions = createMarkup("form", "", container, [{name: "action", value: "#"}, {name: "class", value: "p-2 d-flex flex-column align-items-center w-50"}])
const label_regions = createMarkup("label", "Régions", form_regions, [{name: "for", value: "regions"}, {name: "class", value: "h6 text-white"}])
const select_regions = createMarkup("select", "", form_regions, [{name: "name", value: "regions"}, {name: "id", value: "regions"}, {name: "class", value: "form-select w-50"}])

createMarkup("option", "", select_regions, [{name: "name", value: "all"}])

const form_depart = createMarkup("form", "", container, [{name: "action", value: ""}, {name: "class", value: "p-2 d-flex flex-column align-items-center w-50"}])
const label_depart = createMarkup("label", "Départements", form_depart, [{name: "for", value: "départements"}, {name: "class", value: "h6 text-white"}])
const select_depart = createMarkup("select", "", form_depart, [{name: "name", value: "départements"}, {name: "id", value: "départements"}, {name: "class", value: "form-select w-50"}])

label_depart.hidden = true
select_depart.hidden = true

const form_comm = createMarkup("form", "", container, [{name: "action", value: "#"}, {name: "class", value: "p-2 d-flex flex-column align-items-center w-50"}])
const label_comm = createMarkup("label", "Communes", form_comm, [{name: "for", value: "communes"}, {name: "class", value: "h6 text-white"}])
const select_comm = createMarkup("select", "", form_comm, [{name: "name", value: "communes"}, {name: "id", value: "communes"}, {name: "class", value: "form-select w-50"}])

label_comm.hidden = true
select_comm.hidden = true

const cont_card = createMarkup("section", "", container, [{name: "class", value: "container w-100 d-flex justify-content-center"}])


let regions = []

fetch('https://geo.api.gouv.fr/regions')

.then(response => {
    console.log(`response status : `, response.status)
    return response.json()
})

.then(data => {
    console.log(data)
    regions.push(...data) 
    regions.forEach(element => {
        createMarkup("option", element.nom, select_regions, [{name: "value", value: element.code}])
        })
})

.catch(error => {
    console.error(error)
})


select_regions.onchange = async (e) => {
    select_depart.innerHTML = ""
    select_comm.innerHTML = ""
    cont_card.innerHTML = ""
    label_depart.hidden = false
    select_depart.hidden = false

    let departements = []
    try {
    departements = await fetch(`https://geo.api.gouv.fr/regions/${select_regions.value}/departements`)

    .then(response => {
        console.log(`response status : `, response.status);
        return response.json();
    })

    .then(data => {
        console.log(data)
        return data
    })
    createMarkup("option", "", select_depart, [{name: "name", value: "all"}])
    departements.forEach(element => {
        createMarkup("option", element.nom, select_depart, [{name: "value", value: element.code}])
        })

    } catch (error) {
        console.error(`Erreur attrapée : `, error);
    }
}



select_depart.onchange = async (e) => {
    select_comm.innerHTML = ""
    cont_card.innerHTML = ""
    label_comm.hidden = false
    select_comm.hidden = false

    let communes = []
    try {
    communes = await fetch(`https://geo.api.gouv.fr/departements/${select_depart.value}/communes`)

    .then(response => {
        console.log(`response status : `, response.status);
        return response.json();
    })

    .then(data => {
        console.log(data)
        return data
    })
    createMarkup("option", "", select_comm, [{name: "name", value: "all"}])
    communes.forEach(element => {
        createMarkup("option", element.nom, select_comm, [{name: "value", value: element.code}])
        })

    } catch (error) {
        console.error(`Erreur attrapée : `, error);
    }
}

    
let com = []
select_comm.onchange = async (e) => {
    cont_card.innerHTML = ""

    try {
    com = await fetch(`https://geo.api.gouv.fr/communes/${select_comm.value}`)

    .then(response => {
            console.log(`response status : `, response.status);
            return response.json();
    })

    .then(data => {
            console.log(data)
            return data
    })

    new Commune(com.nom, com.population, com.codesPostaux[0])

    } catch (error) {
        console.error(`Erreur attrapée : `, error);
    }
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


class Commune {
    constructor(nom, population, codesPostaux) {
        this.nom = nom
        this.population = population
        this.codesPostaux = codesPostaux

        this.render()
    }
    render() {
        
        const card_commune = createMarkup("section", "", cont_card, [{name: "class", value: " w-25 px-4 p-4 border rounded-2 mt-5 bg-white"}])
        const non_commune = createMarkup("h2", this.nom, card_commune,[{name:"class",value:"h3 my-2"}])
        const pop_commune = createMarkup("h3", "Population : " + this.population, card_commune,[{name:"class",value:"h5 my-4"}])
        const codes_commune = createMarkup("p", "Code Postal : " + this.codesPostaux, card_commune,[{name:"class",value:"h5 my-4"}])
    }
}
    