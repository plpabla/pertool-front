class InputBox {
    constructor(layer, prompt, pos, callbackFn) {
        this.init(layer, prompt, pos, callbackFn);
    }

    init(layer, prompt, pos, callbackFn) {
        this.stageBox = layer.getStage().container().getBoundingClientRect();
        this.layer = layer;
        this.prompt = prompt;
        this.pos = pos;
        this.callbackFn = callbackFn;

        this.param = {
        }

        this.draw();
    }

    draw() {
        const areaPos = {
            x: this.stageBox.left + this.pos.x,
            y: this.stageBox.top + this.pos.y
        };

        const box = this.createForm(areaPos);
    }

    createForm(areaPos) {
        const formDiv = document.createElement('div');
        formDiv.classList.add("input-box");
        formDiv.style.position = 'absolute';
        formDiv.style.top = areaPos.y + 'px';
        formDiv.style.left = areaPos.x + 'px';
        document.body.appendChild(formDiv);
        

        const txt = document.createElement('label');
        txt.innerHTML = this.prompt;
        formDiv.appendChild(txt);

        const box = document.createElement('input');
        box.type = 'text';
        formDiv.appendChild(box);
        box.focus();

        const callbackFn = this.callbackFn;
        box.addEventListener('keydown', function (e) {
            if (e.key === "Enter") {
                const txt = box.value;
                document.body.removeChild(formDiv);
                callbackFn(txt);
            }
            if (e.key === "Escape") {
                document.body.removeChild(formDiv);
                callbackFn("");
            }
        });
    }
}

export default InputBox;