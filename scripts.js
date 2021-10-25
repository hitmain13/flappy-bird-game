function createElement(tagName, className) {

    const newElement = document.createElement(tagName)
    newElement.className = className
    return newElement

}

function Tube(upsidedown = false, height) {
    this.element = createElement('div', 'tube')
    this.body = new createElement('div', 'bodytube')
    const head = new createElement('div', 'headtube')


    this.element.appendChild(upsidedown ? this.body : head)
    this.element.appendChild(upsidedown ? head : this.body)

    this.body.style.height = `${height}px`
}

function CoupleTube(gap, position) {
    this.coupleTube = createElement('div', 'couple-tube')
    document.querySelector('.environment').appendChild(this.coupleTube)

    this.top = new Tube(true)
    this.bottom = new Tube(null)
    this.coupleTube.appendChild(this.top.element)
    this.coupleTube.appendChild(this.bottom.element)

    this.getX = () => parseInt(this.coupleTube.style.left.split('px')[0])
    this.setX = x => this.coupleTube.style.left = `${x}px`
    this.getWidth = () => this.coupleTube.clientWidth
    this.getNewHeight = gap => {
        first = Math.floor(Math.random() * (gap - 10) + 10),
        second = gap - first
        console.log(first, second)
        this.top.body.style.height = `${first}px`
        this.bottom.body.style.height = `${second}px`
    }

    this.getNewHeight(gap)
    this.setX(position)
}

function getTubes(gap, position, space, steps) {
    this.tubes = [
        new CoupleTube(gap, position),
        new CoupleTube(gap, position + space),
        new CoupleTube(gap, position + space * 2),
        new CoupleTube(gap, position + space * 3)
    ]

    animate = () => {
        this.tubes.forEach(tube => {
            tube.setX(tube.getX() - steps)
            if (tube.getX() < -tube.getWidth()) {
                tube.setX(tube.getX() + space * this.tubes.length)
                tube.getNewHeight(gap)
            }
        })
    }
}

window.addEventListener("load", () => {
    getTubes(500, 1, 400, 3)
    setInterval(() => this.animate(), 25)
})




/*<img class="bird" src="/assets/img/bird.png" alt="bird">
        <div class="couple-tube">
            <div class="tube">
                <div class="bodytube"></div>
                <div class="headtube"></div>
            </div>
            <div class="tube">
                <div class="headtube"></div>
                <div class="bodytube"></div>
            </div>
        </div>
        <div class="progress">100</div> */