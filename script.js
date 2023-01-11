const video = document.querySelector("video");
const textElem = document.querySelector("[data-text]")
const scan = document.getElementById("scan")

async function setup() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: 'environment'
  } } });
  video.srcObject = stream;

  video.addEventListener("playing", async () => {
    const worker = Tesseract.createWorker()
    await worker.load()
    await worker.loadLanguage("eng")
    await worker.initialize("eng")

    const canvas = document.createElement("canvas")
    canvas.width = video.width
    canvas.height = video.height

    document.addEventListener("click", async e => {
        
        if (e.type !== "click") return
        canvas.getContext("2d").drawImage(video, 0, 0, video.width, video.height)
        const { data: { text }, 
      } = await worker.recognize(canvas)
        
speechSynthesis.speak(new SpeechSynthesisUtterance(text.replace(/\s/g, " ")))

        textElem.textContent = text
        })
    })
}

setup();

// Choose back camera of phone
// Change event listener to click & add a button
// Style more