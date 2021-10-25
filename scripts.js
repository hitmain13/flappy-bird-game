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
        first = Math.floor(Math.random() * (gap - 10) + 10)
        second = gap - first
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
    animate = (isCrached) => {
        if (!isCrached) {
            this.tubes.forEach(tube => {
                tube.setX(tube.getX() - steps)
                if (tube.getX() < -tube.getWidth()) {
                    tube.setX(tube.getX() + space * this.tubes.length)
                    tube.getNewHeight(gap)
                }
                const middle = tube.getWidth() / 2
                if (tube.getX() + steps >= 600 - middle
                    && tube.getX() + steps < 600 + steps - middle) this.addPoint()
            })
        }
    }
}

function bird(maxHeight) {
    this.bird = createElement('img', 'bird')
    this.bird.src = 'assets/img/bird.png'
    document.querySelector('.environment').appendChild(this.bird)

    let isUpping = false
    let birdHeight = 350
    this.maxVelocity = 0.1
    document.addEventListener('click', () => {
        this.setPoint = birdHeight + 70
        this.error = (this.setPoint - birdHeight) / 10
        this.maxVelocity = 0.1;
        isUpping = true
    })

    jump = () => {
        if (isUpping) {
            if (birdHeight <= maxHeight && this.error > -0.37) {
                this.error = (this.setPoint - birdHeight) / 10
                birdHeight += (this.error * 2) + 1.5;
                this.bird.style.bottom = `${birdHeight}px`
                this.bird.style.transform = "rotate(" + (-this.error + 0.37) * 2 + "deg)";
            } else isUpping = false
        } else {
            this.error = (-birdHeight - 100) / 100
            if (birdHeight > 0) {
                this.maxVelocity += 0.5
                birdHeight -= this.maxVelocity;
            } else birdHeight = 0
            this.bird.style.bottom = `${birdHeight}px`
            this.bird.style.transform = "rotate(" + this.maxVelocity * 2 + "deg)";
        }
    }
    getY = () => Math.round(this.bird.style.bottom.split('px')[0])
}

function colision(elementA, elementB) {
    const a = elementA.getBoundingClientRect()
    const b = elementB.getBoundingClientRect()

    const horizontal = a.left + a.width - 15 >= b.left
        && b.left + b.width - 15 >= a.left
    const vertical = a.top + a.height >= b.top
        && b.top + b.height >= a.top
    return horizontal && vertical
}

function isCrached() {
    let crashed = false
    this.tubes.forEach(CoupleTube => {
        if (!crashed) {
            const top = CoupleTube.top.element
            const bottom = CoupleTube.bottom.element
            crashed = colision(this.bird, top)
                || colision(this.bird, bottom)
        }
    })
    return crashed
}

function progress() {
    this.progress = createElement('div', 'progress')
    document.querySelector('.environment').appendChild(this.progress).innerHTML = 0

    this.addPoint = function () {
        this.progress.innerHTML++
    }
}

function start() {
    window.addEventListener("load", () => {
        getTubes(450, 1200, 400, 4)
        progress()
        bird(640)
        const timer = setInterval(() => {
            if(isCrached(this.bird, getTubes)) clearInterval(timer)
            this.animate()
            jump()
        }, 15)
    })
}

start()