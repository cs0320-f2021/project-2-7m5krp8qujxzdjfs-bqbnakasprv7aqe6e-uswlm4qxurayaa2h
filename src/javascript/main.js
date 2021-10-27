// an array containing all of the elements in the page
let ALL_ELEMENTS = []

// map element ids to location in ALL_ELEMENTS
let PAGE_MAP = {}

// shortcut to access speech synthesizer
let VOICE_SYNTH = window.speechSynthesis

// global for current index
// NOTE: will need to update based on elements (controls) we insert into the page
let CURRENT_INDEX = 1
// let SHOULD_READ = false

let CURRENT_ELEMENT = {
    setAndSpeak: async function(newElement) { //async
        if (newElement.style.hidden !== true && newElement.style.visibility !== "none") {
            this.value = newElement
            VOICE_SYNTH.speak(new SpeechSynthesisUtterance(newElement.innerHTML));
        }
    },
    value: null
}


//https://stackoverflow.com/questions/29173956/start-and-stop-loop-in-javascript-with-start-and-stop-button
let READER = {
    should_read : false,
    run : function() {
        for (let i = CURRENT_INDEX; i < ALL_ELEMENTS.length; i++) {
            const newElement = ALL_ELEMENTS[CURRENT_INDEX]
            CURRENT_ELEMENT.setAndSpeak(newElement)
                .then((response) => {
                    if (!this.should_read) {
                        break
                    }
                })
        }
    },
    startReading : function () {
        this.should_read = true
    },
    stopReading : function () {
        this.should_read = false
    }
}

window.onload = () => {
    // TODO: initialize Speech API object, inject HTML, get page elements, and initialize event listeners

    // map out the page
    mapPage()

    // inject html elements **after mapping out the page
    injectHtml()

    // start while loop that will listen for button inputs
    READER.run()


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

const injectHtml = () => {
    // TODO: make sticky!
    //document.body.innerHTML += `<div id="sr" style="position: sticky; top: 0px; right: 0px;"> Screenreader </div>`
    const sr = document.createElement("p")
    sr.innerHTML =`<div id="sr" style="float: right"> <button id="read-page">Read Page</button> <button id="stop-reading">Stop Reading</button> </div>`
    document.body.insertBefore(sr, document.body.firstChild)

    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    document.getElementById("read-page").addEventListener("click", () => {
        READER.startReading()
        READER.run()
        console.log("start")
    })

    document.getElementById("stop-reading").addEventListener("click", () => {
        READER.stopReading()
        console.log("stop")
    })
}


// maps element categories to reading handlers (return strings)
const HANDLERS = {}
// maps element tag names to element categories
const ROLES = {}