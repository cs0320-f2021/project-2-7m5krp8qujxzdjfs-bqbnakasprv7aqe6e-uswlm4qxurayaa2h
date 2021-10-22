// an array containing all of the elements in the page
let ALL_ELEMENTS = []

// map element ids to location in ALL_ELEMENTS
let PAGE_MAP = {}

// shortcut to access speech synthesizer
let VOICE_SYNTH = window.speechSynthesis

// global for current index
let CURRENT_INDEX = 0

let CURRENT_ELEMENT = {
    setAndSpeak: function(newElement) { //async
        if (newElement.style.hidden !== true && newElement.style.visibility !== "none") {
            this.value = newElement
            VOICE_SYNTH.speak(new SpeechSynthesisUtterance(newElement.innerHTML));
        }
    },
    value: null
}

window.onload = () => {
    // TODO: initialize Speech API object, inject HTML, get page elements, and initialize event listeners
    mapPage()

    window.addEventListener("keydown", (event) => {
        if (event.key === " ") {
            event.preventDefault()
            //const currentIndex = PAGE_MAP[CURRENT_ELEMENT.value.id]
            const newElement = ALL_ELEMENTS[CURRENT_INDEX]
            CURRENT_INDEX += 1
            CURRENT_ELEMENT.setAndSpeak(newElement)
                //.then(response => console.log(response))
        }
    })
}

const mapPage = () => {
    if (ALL_ELEMENTS.length === 0) {
        ALL_ELEMENTS = document.body.getElementsByTagName("*")
    }

    for (let i = 0; i < ALL_ELEMENTS.length; i++) {
        const currentElement = ALL_ELEMENTS[i]
        if (!currentElement.id) {
            currentElement.id = i
        }
        PAGE_MAP[currentElement.id] = i
    }

}


// maps element categories to reading handlers (return strings)
const HANDLERS = {}
// maps element tag names to element categories
const ROLES = {}