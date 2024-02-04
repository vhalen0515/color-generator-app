const colorPicker = document.getElementById('color-picker')
const colorScheme = document.getElementById('color-scheme')
const generateColorsBtn = document.getElementById('generate-colors-btn')
const colorBarContainer = document.getElementById('color-bar-container')
const hexcodeText = document.querySelectorAll('.hexcode-text')
const floatingText = document.getElementById('floating-text')
const popUpContainer = document.getElementById('pop-up-container')

const colorBars = []
const colorTexts = []
let colorsGenerated = false

for (let i = 1; i <= 5; i++) {
    colorBars.push(document.getElementById(`color-bar-${i}`))
    colorTexts.push(document.getElementById(`color-bar-text-${i}`))
}

generateColorsBtn.addEventListener('click', function() {
    generateColors()
    floatingText.style.display = 'none'
    hexcodeText.forEach(hexcode => {
        hexcode.style.cursor = 'pointer'
    })
    colorsGenerated = true
})

function generateColors() {
    const hexCode = colorPicker.value.substring(1)
    const modeValue = colorScheme.value

    fetch(`https://www.thecolorapi.com/scheme?hex=${hexCode}&mode=${modeValue}&count=5`)
    .then(res => res.json())
    .then(data => {
        const hexCode = data.colors.map(codes => codes.hex.value)
        for (let i = 0; i <= 4; i++) {
            colorBars[i].style.backgroundColor = hexCode[i]
            colorTexts[i].innerHTML = hexCode[i]
        }
    })
}

function CopyToClipboardAlert() {
    alert('Color copied to clipboard!')
}

hexcodeText.forEach(hexcode => {
    hexcode.addEventListener('click', function() {
        if (colorsGenerated) {
                navigator.clipboard.writeText(hexcode.textContent)
                .then(function() {
                    console.log('Text successfully copied to clipboard');
                })
                .catch(function(err) {
                    console.error('Unable to copy text to clipboard', err);
                });
            CopyToClipboardAlert()
        } else {
            console.log('Generate colors first')
        }
    }) 
})