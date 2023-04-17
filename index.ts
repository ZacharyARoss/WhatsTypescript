// Import stylesheets
//import './style.css';
import type { DictionaryResponse } from "./types";


const form: HTMLFormElement | null = document.querySelector('#defineform'); //"#"means grabbing id and "." means grabbing by class
const list = document.querySelector<HTMLUListElement>(".list-unstyled"); //grabbing list class from line 71 of HTML file so we can replace contents

//aysnc await (.then) -> fetch is a tool that makes api calls
async function getDefinition(word: string): Promise<DictionaryResponse>{ //using imported type and will return DictionaryResponse object
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  const json = await response.json();
  return json;
}

if (form){
form.onsubmit = () => {
  const formData = new FormData(form);
  const text = formData.get('defineword') as string;
  getDefinition(text).then((json) => {
    if (list) {
      // innerHTML is a built in ts feature that says replace whatever is in "list" with whatever string i give you.
      list.innerHTML = json[0].meanings[0].definitions[0].definition;
    }
  }); // running getDefinition function on "text"
  return false; // prevent reload
}
};