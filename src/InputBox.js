class InputBox {
    constructor(layer, pos, items, callbackFn) {
        this.init(layer, pos, items, callbackFn);
    }

    init(layer, pos, items, callbackFn) {
        this.stageBox = layer.getStage().container().getBoundingClientRect();
        this.layer = layer;
        this.pos = pos;
        this.callbackFn = callbackFn;
        this.form = null;

        this.draw(items);
    }

    draw(items) {
        const areaPos = {
            x: this.stageBox.left + this.pos.x,
            y: this.stageBox.top + this.pos.y
        };

        this.form = this.createForm(areaPos, items);
    }

    createForm(areaPos, items) {
        const formDiv = document.createElement('div');
        formDiv.classList.add("input-box");
        formDiv.style.position = 'absolute';
        formDiv.style.top = areaPos.y + 'px';
        formDiv.style.left = areaPos.x + 'px';
        document.body.appendChild(formDiv);

        let box = null;
        items.forEach(el => {
            const txt = document.createElement('label');
            txt.innerHTML = el.label;
            txt.setAttribute('for', el.key);
            formDiv.appendChild(txt);
    
            box = document.createElement('input');
            box.type = 'text';
            box.value = el.default ? el.default : "";
            box.setAttribute('id', el.key);
            box.setAttribute('name', el.key);
            formDiv.appendChild(box);
        });
        box.focus();
        box.select();

        const ok = document.createElement('button');
        ok.classList.add('btn');
        ok.classList.add('btn-primary');
        ok.innerText = "OK";
        formDiv.appendChild(ok);

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

        ok.addEventListener('click', function() {
            const txt = box.value;
            document.body.removeChild(formDiv);
            callbackFn(txt);
        })

        return formDiv;
    }
}

export default InputBox;