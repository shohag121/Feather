import Feather from "./Feather";

declare global {
    interface Window { Feather: typeof Feather; }
}
window.Feather = Feather;
window.Feather.init();


