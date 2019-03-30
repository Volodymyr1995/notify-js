// 1. Сделаем сам класс Notify
// 2. Будем добавлять уведомления в "стек"
// 3. Сделаем авто скрытие через 10с
// 4. При наведении пауза автоскрытия
// 5. ...

const container = document.querySelector("#attention-container");

const TYPES = {
    info: "#00f",
    error: "#f00",
    success: "#0f0",
    warning: "#ff0"
}

class Notify{
    constructor(content, type){
        this.lifeTime = 10000;
        this.content = content;
        this.type = type in TYPES ? type : "info";
        this.render();
    }

    createClose(){
        this.close = document.createElement("img");
        this.close.src = "./close.svg";
        this.close.classList.add("close-icon");
        this.close.addEventListener("click", this.hideNotify.bind(this));
        return this.close;
    }

    createLine(){
        this.line = document.createElement("div");
        this.line.classList.add("line");
        return this.line;
    }

    pauseInterval(){
        clearInterval(this.interval);
    }
    continueInterval(){
        this.lifeInterval();
    }

    lifeInterval(){
        this.interval = setInterval(() => {
            const currentWidth = this.line.offsetWidth; // 340 // 336.6
            const percent = (this.width / 50);
            if(currentWidth - percent < 0){
                this.hideNotify();
                return;
            }
            this.line.style.width = `${currentWidth - percent}px`; // 336.6 - (3.4)
            // this.line.style.width = currentWidth - (width / 100) + "px"; // 336.6 - (3.4)
        }, 200);
    }

    hideNotify(){
        this.notify.classList.add("hide-right");
        setTimeout(() => {
            this.notify.remove();
        }, 300);
    }

    render(){
        this.notify = document.createElement("div");
        this.notify.classList.add("notify");
        this.notify.classList.add(this.type);
        this.notify.innerHTML = this.content;
        this.notify.classList.add("slide-right");
        this.notify.append(this.createClose());
        this.notify.append(this.createLine());
        container.append(this.notify);
        this.notify.addEventListener("mouseenter", this.pauseInterval.bind(this));
        this.notify.addEventListener("mouseleave", this.continueInterval.bind(this));
        this.width = this.line.offsetWidth; // 340
        this.lifeInterval();
    }
}

const i = new Notify("Test", "info");
setTimeout(() => {
    new Notify("Test 2 &#x1F631", "success");
    new Notify("Test 3 &#x1F335", "warning");
    new Notify("Test 4", "error");
}, 2000);
