class InputBox {
    constructor(layer, prompt, pos, callbackFn) {
        this.stageBox = layer.getStage().container().getBoundingClientRect();
        this.layer = layer;
        this.prompt = prompt;
        this.pos = pos;
        this.callbackFn = callbackFn;

        this.param = {
            fontSize: 16,
            borderWidth: '2px',
            borderColor: '#0af0c0',
            backgroundColor: '#E6FEF9',
            padding: '3px',
            gapBetweenFields: '10px',
            height: '50px',
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
        formDiv.style.width = 'fit-content';
        formDiv.style.height = this.param.height;
        formDiv.style.border = `${this.param.borderWidth} ${this.param.borderColor} solid`;
        formDiv.style.padding = this.param.padding;
        formDiv.style.backgroundColor = this.param.backgroundColor;
        formDiv.style.position = 'absolute';
        formDiv.style.top = areaPos.y + 'px';
        formDiv.style.left = areaPos.x + 'px';
        formDiv.style.display = "flex";
        formDiv.style.alignItems = "center";
        formDiv.style.gap = this.param.gapBetweenFields;
        document.body.appendChild(formDiv);
        
        const txt = document.createElement('label');
        txt.innerHTML = this.prompt;
        formDiv.appendChild(txt);

        const box = document.createElement('input');
        box.type = 'text';
        box.size = '16';
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