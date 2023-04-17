var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector('#defineform'); //"#"means grabbing id and "." means grabbing by class
const list = document.querySelector(".list-unstyled"); //grabbing list class from line 71 of HTML file so we can replace contents
//aysnc await (.then) -> fetch is a tool that makes api calls
function getDefinition(word) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const json = yield response.json();
        return json;
    });
}
if (form) {
    form.onsubmit = () => {
        const formData = new FormData(form);
        const text = formData.get('defineword');
        getDefinition(text).then((json) => {
            if (list) {
                // innerHTML is a built in ts feature that says replace whatever is in "list" with whatever string i give you.
                list.innerHTML = json[0].meanings[0].definitions[0].definition;
            }
        }); // running getDefinition function on "text"
        return false; // prevent reload
    };
}
;
export {};
