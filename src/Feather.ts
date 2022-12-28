const Feather = {
    directives : {
        'x-text' : (el: HTMLElement, value: string) => {
            el.innerText = value;
        },

        'x-show' : (el: HTMLElement, value: any) => {
            el.style.display = value ? 'block' : 'none';
        }
    },

    init() {
        this.root = document.querySelector( '[x-data]' ) as HTMLElement;
        this.dataString = this.root.getAttribute('x-data');
        this.rawData = this.getInitialData();
        this.data = this.observe(this.rawData);
        this.registerListeners();
        this.refreshDom();
        return this;
    },

    registerListeners() {
        this.walkDom(this.root, (element: HTMLElement ) => {
            Array.from( element.attributes ).forEach( attribute => {
                if (!attribute.name.startsWith('@')) {
                    return;
                }

                let eventName = attribute.name.replace('@', '');

                element.addEventListener(eventName, () => {
                    eval(`with (this.data) {(${attribute.value})}`);
                });
            });
        });
    },

    observe(data: any) {
        const self = this;
        return new Proxy( data, {
            set(target, key, value) {
                target[key] = value;
                self.refreshDom();

                return true;
            }
        });
    },

    refreshDom(){
        this.walkDom(this.root, (element: HTMLElement) => {
            Array.from( element.attributes ).forEach( attribute => {
                if ( ! Object.keys( this.directives ).includes( attribute.name) ) {
                    return;
                }

                this.directives[attribute.name]( element, eval( `with (this.data) {(${attribute.value})}`))

            });
        });

    },

    walkDom(element: Element, callback : ( element: Element ) => void ) {
        callback(element);

        element = element.firstElementChild;

        while ( element ) {
            this.walkDom( element, callback );
            element = element.nextElementSibling;
        }
    },

    getInitialData() {
        return eval( `(${this.dataString})`);
    },
};
export default Feather;
