const TAXES = {
    UKRAINE: 0.2,
    NETHERLANDS: 0.35,
    GERMANY: 0.4
}

function getTax(cost) {
    return cost * this.k;
}

class Ukraine {
    constructor() {
        this.k = TAXES.UKRAINE;
        this.getTax = getTax;
        this.alwaysUkraine = () => {
            console.log(this);
        }
    }
}

const ukraine = new Ukraine()

class Netherlands {
    constructor() {
        this.k = TAXES.NETHERLANDS;
        this.getTax = new Ukraine().getTax.bind(this);
        this.alwaysNetherlands = ukraine.alwaysUkraine
    }
}

class Germany {
    constructor() {
        this.k = TAXES.GERMANY;
    }
}

const netherlands = new Netherlands();
const germany = new Germany();

// Всегда вернет новую функцию (bind)(!!!)
const buyIceCream = ukraine.getTax.bind(netherlands, 2);
const buyIceCream2 = function getTax(/*thisArg, */) {
    // this = thisArg;
    let cost = 2;
    return cost * this.k;
}

function hardFunction(radius, height, width, distance, power){
    // ...
}

hardFunction(10, 5, 11, 156, 54);
const hardFunctionByRadius = hardFunction.bind(this, 10);
hardFunctionByRadius( 5, 11, 156, 54);

const pushBallL1 = hardFunction.bind(this, 10 , 5, 11, 156);

class Abstract {
    constructor(){
        this.a = 10;
        this.b = 5;
        this.c = 100;
    }

    calcA(){
        return (this.a ** 2)
    }

    calc(){
        return this.calcA() / this.b * this.c;
    }

    noInherit(){

    }
}

class Abstract2 {
    constructor(){
        this.a = 20;
        this.b = 60;
        this.c = 560;
        this.calc = new Abstract().calc.bind(this);
    }

    calcA(){
        return (this.a ** 6)
    }
}


class Icon{
    constructor(container, source){
        this.width = 50;
        this.height = 50;
        this.container = container;
        this.source = source;
        this.icon = document.createElement("img");
        this.render();
    }

    render(){
        this.icon.style.width = this.width + "px";
        this.icon.style.height = this.height + "px";
        this.icon.style.margin = "20px";
        this.icon.src = this.source;
        this.container.append(this.icon);
    }
}

class AnimatedIcon extends Icon{
    constructor(container, source, callback){
        super(container, source);
        this.initial();
        if(callback && typeof callback === 'function'){
            this.icon.addEventListener("click", callback.bind(null, this.icon));
        }
    }

    initial(){
        this.transformValue = 0;
        this.icon.style.transition = ".2s ease-in";
        this.icon.style.transform = this.transformY;
        this.icon.addEventListener("mouseenter", this.toTop.bind(this));
        this.icon.addEventListener("mouseleave", this.toNormal.bind(this));
    }

    toTop(){
        this.transformValue = -10;
        this.icon.style.transform = this.transformY;
        setTimeout(() => {
            this.icon.style.transform = `translate(10px, ${this.transformValue}px)`;
        }, 200);
    }

    toNormal(){
        this.transformValue = 0;
        this.icon.style.transform = this.transformY;
    }

    get transformY(){
        return `translate(0, ${this.transformValue}px)`;
    }
}

const container = document.querySelector("#container");
const icon1 = new Icon(container, "./icon.png");
const icon2 = new AnimatedIcon(container, "./icon.png", function(icon, event){
    icon.style.opacity = "0";
    setTimeout(() => {
        icon.src = "./icon2.png";
        icon.style.opacity = "1";
    }, 200)
});
const icon3 = new AnimatedIcon(container, "./icon2.png", (icon) => {
    icon.style.display = "none";
});





