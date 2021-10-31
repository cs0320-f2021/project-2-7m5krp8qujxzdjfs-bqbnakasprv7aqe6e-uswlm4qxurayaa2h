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
    // TODO add highlight color parameter
    setAndSpeak: async function (newElement) {
        this.value = newElement
        if (newElement.style.hidden !== true && newElement.style.visibility !== "none") {
            this.value = newElement
            newElement.style['background-color'] = "yellow"
            newElement.style['text-decoration'] = "underline"
            newElement.style['color'] = "black"
            let handler = HANDLERS[ROLES[newElement.tagName.toLowerCase()]]
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
    // inject html elements before mapping out the page
    injectHtml()

    // map out the page to fill out PAGE_MAP array
    mapPage()

    let checkReading = async function () {
        return SHOULD_READ
    }

    document.getElementById("read-page").addEventListener("click", () => {
        console.log("start")
        // if (!SHOULD_READ) -- idea to handle multiple "read page" clicks (potentially return to later) -- messes up checkReading
        SHOULD_READ = true
        // restart reading page if at the end
        if (CURRENT_INDEX === ALL_ELEMENTS.length - 1) {
            CURRENT_INDEX = 3
        }
        let READING_LOOP = async function () {
            console.log(ALL_ELEMENTS.length)
            for (CURRENT_INDEX; CURRENT_INDEX < ALL_ELEMENTS.length; CURRENT_INDEX++) {
                if (await checkReading()) {
                    console.log(CURRENT_INDEX)
                    let newElement = ALL_ELEMENTS[CURRENT_INDEX]
                    await CURRENT_ELEMENT.setAndSpeak(newElement)
                    newElement.style['background-color'] = ""
                    newElement.style['text-decoration'] = ""
                    newElement.style['color'] = ""
                } else {
                    console.log("Reading stopped")
                    break
                }
            }
            // return new Promise(() => {
            //     console.log("promise")
            //     return CURRENT_INDEX === ALL_ELEMENTS.length - 1
            // })
        }
        READING_LOOP()
        // READING_LOOP().then(() => {
        //     console.log("Loop restarting")
        //     CURRENT_INDEX = 3
        // })
        //
    })

    document.getElementById("stop-reading").addEventListener("click", () => {
        console.log("stop")
        SHOULD_READ = false
    })

    window.addEventListener("keydown", async (event) => {
        let newElement;
        // potentially leave highlighting until restarting
        switch (event.key) {
            case "ArrowLeft" :
                event.preventDefault()
                VOICE_SYNTH.cancel();
                console.log("Going back")
                SHOULD_READ = false
                CURRENT_INDEX = PAGE_MAP[CURRENT_ELEMENT.value.id] - 1
                console.log(CURRENT_INDEX)
                newElement = ALL_ELEMENTS[CURRENT_INDEX]
                await CURRENT_ELEMENT.setAndSpeak(newElement)
                newElement.style['background-color'] = ""
                newElement.style['text-decoration'] = ""
                newElement.style['color'] = ""
                // SHOULD_READ = true
                break;
            case "ArrowRight" :
                event.preventDefault()
                VOICE_SYNTH.cancel()
                console.log("Going forward")
                SHOULD_READ = false
                CURRENT_INDEX = PAGE_MAP[CURRENT_ELEMENT.value.id] + 1
                console.log(CURRENT_INDEX)
                newElement = ALL_ELEMENTS[CURRENT_INDEX]
                await CURRENT_ELEMENT.setAndSpeak(newElement)
                newElement.style['background-color'] = ""
                newElement.style['text-decoration'] = ""
                newElement.style['color'] = ""
                // SHOULD_READ = true
                break;
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

const injectHtml = () => {
    // TODO: make sticky!
    //document.body.innerHTML += `<div id="sr" style="position: sticky; top: 0px; right: 0px;"> Screenreader </div>`
    const sr = document.createElement("div")
    //sr.style.float = 'right'
    sr.id = 'sr'
    sr.style.position = "absolute"
    sr.style.top = '0'
    sr.style.right = '0'
    sr.innerHTML = `<button id="read-page">Read Page</button> <button id="stop-reading">Stop Reading</button>`
    document.body.insertBefore(sr, document.body.firstChild)
}


// maps element categories to reading handlers (return strings)
// TODO: Read out title??
//TODO dealing with color?
let HANDLERS;
HANDLERS = {
    "text-only": function textOnlyHandler(element) {
        console.log("text-only")
        console.log(element)
        console.log(element.innerHTML)
        return element.innerHTML;
    },
    "text-with-tag": function textWithTagHandler(element) {
        if (element === "aside") {
            return "Now reading an " + element.tagName + " . " + element.innerHTML;
        } else {
            return "Now reading a " + element.tagName + " . " + element.innerHTML;
        }
    },
    "invisible": function invisibleHandler(element) {
        return "";
    },
    "link": function linkHandler(element) {
        console.log("link handled")
        console.log(element.href)
        if (element.innerHTML !== element.href) {
            //TODO just reading part of the link out
            return "Link: " + element.innerHTML + " This link goes to: " + element.href;
        } else {
            return "Link to: " + element.href;
        }

    },
    "button": function buttonHandler(element) {
        return "This is a button that says " + element.innerHTML;
    },
    "nav": function navHandler(element) {
        return "This is a navigation pane.";
    },
    "caption": function captionHandler(element) {
        return "Caption: " + element.innerHTML;
    },
    "image": function imageHandler(element) {
        if (element.alt) {
            return "There is an image here displaying a " + element.alt;
        } else {
            return "There is an image here.";
        }
    },
    // TODO enumerate different types (e.g. color, datetime-local)/enrich?
    "input": function inputHandler(element) {
        return "There is an interactive " + element.type + " element here.";
    },
    "canvas": function canvasHandler(element) {
        if (!(element.innerHTML.trim === "")) {
            return "There is a graphic here displaying: " + element.innerHTML;
        } else {
            return "There is a graphic here."
        }
    },
    // sometimes <p> then <ul> => doesn't make sense
    // "unordered-list": function uListHandler(element) {
    //     return "This is an unordered list.";
    // }
    // TODO handle properly -- connect to associated element
    "label": function labelHandler(element) {
        return "There is a label here. It says " + element.innerHTML;
    },
    "table": function tableHandler(element) {
        return "There is a table here." + element.innerHTML;
    },
    "th": function tableHeaderHandler(element) {
        if (element.scope) {
            if (element.scope === "col") {
                return "This is a column header. It says " + element.innerHTML;
            } else {
                return "This is a " + element.scope + " header. It says " + element.innerHTML;
            }
        } else {
            return "This is a header. It says " + element.innerHTML;
        }
    },
    "td": function tableDataHandler(element) {
        return "The data in this cell says " + element.innerHTML;
    }

};
// maps element tag names to element categories
const ROLES = {
    "div": "text-only",
    "p": "text-only",
    "li": "text-only",
    "ul": "text-only",
    "ol": "text-only", // want to add more information here?

    "aside": "text-with-tag",
    "header": "text-with-tag",
    "footer": "text-with-tag",
    "blockquote": "text-with-tag",

    "script": "invisible",
    "article": "invisible",
    "main": "invisible",
    "section": "invisible",
    "cite": "invisible",
    "figure": "invisible",

    "figcaption": "caption",
    "caption": "caption",

    "canvas": "canvas",
    "svg": "canvas",

    "image": "image",
    "a": "link",
    "nav": "nav",
    "button": "button",
    "input": "input",
    "label": "label",

    "table": "table",
    "th": "th",
    "td": "td",
    "tfoot": "tfoot"



    // "ul": "unordered-list"
    //TODO the rest of the elements, and make sure this works
}