let ALL_ELEMENTS = []
// element ids to location in ALL_ELEMENTS
let PAGE_MAP = {}
let CURRENT_ELEMENT = {
    setAndSpeak: async function(newElement) {
        if (newElement.style.hidden !== true && newElement.style.visibility !== "none") {
            /*if (this.value) {
                this.value.classList.remove()
            }*/
           this.value = newElement
            this.value.classList
        }
    },
    value: null
}

window.onload = () => {
    // TODO: initialize Speech API object, inject HTML, get page elements, and initialize event listeners
    let VOICE_SYNTH = window.speechSynthesis
}

// TODO: Write functions here

// maps element categories to reading handlers (return strings)
const HANDLERS = {}
// maps element tag names to element categories
const ROLES = {}