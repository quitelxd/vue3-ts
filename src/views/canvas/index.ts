import {fabric} from "fabric"

interface Config {
    color?: string,
    strokeWidth?: number,
}

class Canvas implements Config {
    canvas: any;
    id: string;
    color: string = "#000";
    fontSize: number = 14;
    offsetLeft: number = 0;
    offsetTop: number = 0;
    strokeWidth: number = 1;
    currentType: string = 'free';
    mouseFrom: any = {x: 0, y: 0};
    mouseTo: any = {x: 0, y: 0};
    idDrawing: boolean = false;
    drawingObject: object | null = null;
    isRedoing: boolean = false;
    stateArr: any[] = [];
    textObject: any | null;
    imgIcon: string = '';

    constructor(id: string, pId: string, config?: Config) {
        this.id = id;
        const target = document.getElementById(id);
        const pTarget = document.getElementById(pId);

        let width = 0;
        if (pTarget) {
            //获取父级宽度
            width = pTarget.clientWidth;
        }
        if (target) {
            //赋值给canvas
            target.setAttribute("width", width + 'px');
            /*
            * 划重点
            * */
            this.offsetLeft = target.getBoundingClientRect().left;
            this.offsetTop = target.getBoundingClientRect().top;
        }
        this.canvas = new fabric.Canvas(this.id);
        this.canvas.isDrawingMode = 1;
        if (config) {
            if (config.color) {
                this.color = config.color;
            }
            if (config.strokeWidth) {
                this.strokeWidth = config.strokeWidth;
            }
        }
        this.canvas.freeDrawingBrush.color = this.color;
        this.canvas.freeDrawingBrush.width = this.strokeWidth;
        this.canvas.renderAll();
        this.initEvent();
    }

    selectDraw() {
        this.removeTextObject();
        this.canvas.isDrawingMode = false;
        this.canvas.getObjects().map((item) => {
            item.set('selectable', true)
        })
        this.currentType = 'selectable'
    }

    removeTextObject() {
        this.currentType = '';
        if (this.textObject) {
            this.textObject.exitEditing();
            this.textObject = null
        }
    }

    initEvent() {
        const eventType = ['line', 'circle', 'rect', 'triangle', 'text', 'custom'];
        this.canvas.on('mouse:down', (options) => {
            if (eventType.indexOf(this.currentType) != -1) {
                this.mouseFrom.x = options.e.clientX - this.offsetLeft;
                this.mouseFrom.y = options.e.clientY - this.offsetTop;
                this.idDrawing = true;
                switch (this.currentType) {
                    case 'text':
                        this.initText();
                        break;
                    case 'custom':
                        this.initCustom();
                        break;
                    default:
                        break
                }
            }
        })
        this.canvas.on('mouse:move', (options) => {
            if (this.idDrawing && eventType.indexOf(this.currentType) != -1) {
                this.mouseTo.x = options.e.clientX - this.offsetLeft;
                this.mouseTo.y = options.e.clientY - this.offsetTop;
                switch (this.currentType) {
                    case 'line':
                        this.ininLine();
                        break;
                    case 'circle':
                        this.initCircle();
                        break;
                    case 'rect':
                        this.initRect();
                        break;
                    case 'triangle':
                        this.initTriangle();
                        break;

                    default:
                        break
                }
            }
        })
        this.canvas.on('mouse:up', (options) => {
            if (eventType.indexOf(this.currentType) != -1) {
                this.mouseTo.x = options.e.clientX
                this.mouseTo.y = options.e.clientY - 50
                this.drawingObject = null
                this.idDrawing = false
                this.resetMove()
            }
        })

        this.canvas.on('object:added', () => {
            if (this.isRedoing == false) {
                this.stateArr = []
            }
        })
    }

    initText() {
        this.canvas.isDrawingMode = false;
        this.canvas.selection = false;
        this.textObject = new fabric.Textbox('', {
            left: this.mouseFrom.x,
            top: this.mouseFrom.y,
            fontSize: this.fontSize,
            fill: this.color,
            hasControls: false,
        });
        this.canvas.add(this.textObject);
        this.textObject.enterEditing();
        this.textObject.hiddenTextarea.focus()
    }

    ininLine() {
        const canvasObject = new fabric.Line(
            [this.mouseFrom.x, this.mouseFrom.y, this.mouseTo.x, this.mouseTo.y],
            {
                fill: this.color,
                stroke: this.color,
                strokeWidth: this.strokeWidth,
            }
        )
        this.toggleDrawingObject(canvasObject)
    }

    initCircle() {
        const left = this.mouseFrom.x
        const top = this.mouseFrom.y
        const radius =
            Math.sqrt(
                (this.mouseTo.x - left) * (this.mouseTo.x - left) +
                (this.mouseTo.y - top) * (this.mouseTo.y - top)
            ) / 2
        const canvasObject = new fabric.Circle({
            left: left,
            top: top,
            stroke: this.color,
            fill: 'rgba(255, 255, 255, 0)',
            radius: radius,
            strokeWidth: this.strokeWidth,
        })
        this.toggleDrawingObject(canvasObject)
    }

    initRect() {
        const left = this.mouseFrom.x
        const top = this.mouseFrom.y
        const width = this.mouseTo.x - this.mouseFrom.x
        const height = this.mouseTo.y - this.mouseFrom.y

        const canvasObject = new fabric.Rect({
            left: left,
            top: top,
            width: Math.abs(width),
            height: Math.abs(height),
            stroke: this.color,
            fill: 'rgba(255, 255, 255, 0)',
            strokeWidth: this.strokeWidth,
        })
        this.toggleDrawingObject(canvasObject)
    }

    initTriangle() {
        const left = this.mouseFrom.x;
        const top = this.mouseFrom.y;
        const height = this.mouseTo.y - this.mouseFrom.y;
        const width = Math.sqrt(Math.pow(height, 2) + Math.pow(height / 2.0, 2));
        const canvasObject = new fabric.Triangle({
            left: left,
            top: top,
            width: width,
            height: height,
            stroke: this.color,
            fill: 'rgba(255, 255, 255, 0)',
            strokeWidth: this.strokeWidth,
        })
        this.toggleDrawingObject(canvasObject)
    }

    initCustom() {
        const image = new Image();
        image.src = 'data:image/jpeg;base64,' + this.imgIcon;
        const canvasObject = new fabric.Image(image, {
            left: this.mouseFrom.x - 16,
            top: this.mouseFrom.y - 16,
            width: 32,
            height: 32,
        })
    }

    toggleDrawingObject(canvasObject) {
        this.canvas.isDrawingMode = false;
        this.canvas.selection = false;
        canvasObject.selectable = false;
        if (this.drawingObject) {
            this.canvas.remove(this.drawingObject)
        }
        this.canvas.add(canvasObject);
        this.drawingObject = canvasObject;

        if (this.textObject) {
            this.textObject.exitEditing();
            this.textObject = null
        }
    }

    resetMove() {
        this.mouseFrom = {
            x: 0,
            y: 0
        };
        this.mouseTo = {
            x: 0,
            y: 0
        }
    }

    lineDraw() {
        this.currentType = 'line'
        this.ininLine()
    }

    circleDraw() {
        this.currentType = 'circle'
        this.initCircle()
    }

    rectDraw() {
        this.currentType = 'rect'
        this.initRect()
    }

    triangleDraw() {
        this.currentType = 'triangle'
        this.initTriangle()
    }

    textDraw() {
        this.currentType = 'text'
    }

    freeDraw() {
        this.canvas.isDrawingMode = true
        this.currentType = 'free'
    }

    clear() {
        this.canvas.clear();
        // setCanvasBg();
        this.resetMove();
        this.isRedoing = false;
        this.stateArr = []
    }

    unselectDraw() {
        this.removeTextObject()
        this.canvas.getObjects().map((item) => {
            item.set('selectable', false)
        })
        this.currentType = 'unselectable'
    }

    del() {
        /* 创建自定属性  对象
        *  let textbox = new fabric.Textbox(val.setout_org_name + value, {
                            left: 50,
                            top: 50,
                            width: 150,
                            fontSize: 20,
                            setout_org_id: val.setout_org_id,
                        })
                        this.canvas.add(textbox).setActiveObject(textbox)
                        *
                        * 处理业务逻辑，canvas对象中带有自定义属性
                        * this.canvas.getActiveObject().setout_org_id
        *
        * */
        this.canvas.remove(this.canvas.getActiveObject())
    }

    undoDraw() {
        if (this.canvas._objects.length > 0) {
            this.stateArr.push(this.canvas._objects.pop());
            this.canvas.renderAll();
        }
    }

    //导出canvas为png 或 jpeg
    exportCanvas() {
        const dataURL = this.canvas.toDataURL({
            width: this.canvas.width,
            height: this.canvas.height,
            left: 0,
            top: 0,
            format: 'png',
        });
        const link = document.createElement('a');
        link.download = 'canvas.png';
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
    }

    colorChange(color: string) {
        this.color = color;
        this.canvas.freeDrawingBrush.color = color
    }
}

export default Canvas;
