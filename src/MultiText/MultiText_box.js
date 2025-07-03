import putText from "../common/putText";


export default class MultiText {
    constructor({ box }) {
        this.box = box;
        this.container = box.container;
        this.draw({ box })
        console.log(box);


    }

    draw({ box }) {
        // همه چیز را توی کانتینر باکس آبجکت رسم کن
        const { container, elements, width, height } = box

        elements?.forEach(element => {
            const { name, value, x, y, style } = element;

            switch (element.type) {
                case 'label':
                    // const { value, x, y, style } = element
                    putText({ container, value, x, y, style })
                    break;
                case 'input':
                    putText({ container, x, y, style, name });

                    break;
                default:
                    break;
            }

        });

    }

}
