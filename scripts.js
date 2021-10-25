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
            tube.setX(tube.getX() - steps - 1)
            if (tube.getX() < -tube.getWidth()) {
                tube.setX(tube.getX() + space * this.tubes.length)
                tube.getNewHeight(gap)
            }

        })
    }
}

function bird(maxHeight) {
    this.element = createElement('img', 'bird')
    this.element.src = 'assets/img/bird.png'
    
    let isUpping = false
    let birdHeight = 100
    this.maxVelocity = 0.1

    document.addEventListener('click', () => {
        this.setPoint = birdHeight + 70
        this.error = (this.setPoint - birdHeight) / 10
        this.maxVelocity = 0.1;
        isUpping = true
    })

    document.querySelector('.environment').appendChild(this.element)
    this.jump = () => {
        if (isUpping) {
            if (birdHeight <= maxHeight && this.error > -0.37) {
                this.error = (this.setPoint - birdHeight) / 10
                birdHeight += (this.error * 2) + 1.5;
                this.element.style.bottom = `${birdHeight}px`
                this.element.style.transform = "rotate("+(-this.error+0.37)*2+"deg)";
            } else  isUpping = false
        } else {
            this.error = (-birdHeight - 100) / 100
            if (birdHeight > 0) {
                this.maxVelocity += 0.5
                birdHeight -= this.maxVelocity;
            }  else birdHeight = 0 
            this.element.style.bottom = `${birdHeight}px`
            this.element.style.transform = "rotate("+this.maxVelocity*2+"deg)";
        }
    }
    this.jump()
}

window.addEventListener("load", () => {
    getTubes(450, 1300, 400, 3)
    setInterval(() => {
        this.animate()
        this.jump()
    }, 15)
    bird(640)
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