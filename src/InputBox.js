class InputBox {
    constructor(layer, prompt, pos, callbackFn, defaultValue) {
        this.init(layer, prompt, pos, callbackFn, defaultValue);
    }

    init(layer, prompt, pos, callbackFn, defaultValue) {
        this.stageBox = layer.getStage().container().getBoundingClientRect();
        this.layer = layer;
        this.prompt = prompt;
        this.pos = pos;
        this.callbackFn = callbackFn;
        this.defaultValue = defaultValue;

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
        box.value = this.defaultValue ? this.defaultValue : "";
        formDiv.appendChild(box);
        box.focus();
        box.select();

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