// an array containing all of the elements in the page
let ALL_ELEMENTS = []

// map element ids to location in ALL_ELEMENTS
let PAGE_MAP = {}

// shortcut to access speech synthesizer
let VOICE_SYNTH = window.speechSynthesis

// global for current index
// NOTE: will need to update based on elements (controls) we insert into the page
let CURRENT_INDEX = 3
let SHOULD_READ = false

let CURRENT_ELEMENT = {
    setAndSpeak: async function (newElement) {
        if (newElement.style.hidden !== true && newElement.style.visibility !== "none") {
            this.value = newElement
            let handler = HANDLERS[ROLES[newElement.tagName]]
            let audio = new SpeechSynthesisUtterance(handler(newElement))
            VOICE_SYNTH.speak(audio)
            return new Promise(resolve => {
                audio.onend = resolve
            })
        }

    },
    value: null
}


window.onload = () => {
    // map out the page to fill out PAGE_MAP array
    mapPage()

    // inject html elements **after mapping out the page
    injectHtml()

    let checkReading = async function () {
        return SHOULD_READ
    }

    document.getElementById("read-page").addEventListener("click", () => {
        console.log("start")
        SHOULD_READ = true
        let READING_LOOP = async function () {
            for (CURRENT_INDEX; CURRENT_INDEX < ALL_ELEMENTS.length; CURRENT_INDEX++) {
                if (await checkReading()) {
                    console.log(CURRENT_INDEX)
                    let newElement = ALL_ELEMENTS[CURRENT_INDEX]
                    await CURRENT_ELEMENT.setAndSpeak(newElement)
                } else {
                    console.log("Reading stopped")
                    break
                }
            }
        }
        READING_LOOP().then(() => {
            console.log("Loop restarting")
            CURRENT_INDEX = 3
        })
        //
    })

    document.getElementById("stop-reading").addEventListener("click", () => {
        console.log("stop")
        SHOULD_READ = false
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

const injectHtml = () => {
    // TODO: make sticky!
    //document.body.innerHTML += `<div id="sr" style="position: sticky; top: 0px; right: 0px;"> Screenreader </div>`
    const sr = document.createElement("div")
    sr.style.float = 'right'
    sr.id = 'sr'
    sr.innerHTML = `<button id="read-page">Read Page</button> <button id="stop-reading">Stop Reading</button>`
    document.body.insertBefore(sr, document.body.firstChild)
}


// maps element categories to reading handlers (return strings)
// TODO: Read out title??
//TODO dealing with color?
const HANDLERS = {
    "text-only": function textOnlyHandler(element) {
        return element.innerHTML;
    },
    "text-with-tag": function textWithTagHandler(element) {
        return "Now reading a: " + element.tagName + " . " + element.innerHTML;
    },
    "invisible": function invisibleHandler(element) {
        return "";
    },
    "link": function linkHandler(element) {
        return "Link: " + element.innerHTML + " This link goes to: " + element.href; //TODO just reading part of the link out
    },
    "button": function buttonHandler(element) {
        return "This is a button that says " + element.innerHTML;
    },
    "nav": function navHandler(element) {
        return "This is a navigation pane.";
    },
    "caption": function captionHandler(element) {
        return "Caption: " + element.innerHTML;
    }

}
// maps element tag names to element categories
const ROLES = {
    "div": "text-only",
    "p": "text-only",

    "aside": "text-with-tag",
    "header": "text-with-tag",
    "footer": "text-with-tag",
    "blockquote" : "text-with-tag",

    "script": "invisible",
    "article": "invisible",
    "main": "invisible",
    "section": "invisible",
    "cite" : "invisible",

    "figcaption" : "caption",
    "caption" : "caption",

    "a": "link",
    "nav": "nav",
    "button": "button",
    "input": "input"
    //TODO the rest of the elements, and make sure this works
}