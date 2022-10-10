import googleTransliterate from 'google-input-tool';

let clear = () => true;
async function TextConversion(text) {
    clear();

    return new Promise((r, t) => {
        const timeout = setTimeout(() => {
            googleTransliterate(new XMLHttpRequest(), text, 'ne-t-i0-und', 8)
                .then(response => {
                    console.log("TT: ", response);
                    r(response.map(c=>c[0]));
                })
                .catch(e => t(Error(e)));
        }, 1);

        clear = () => {
            clearTimeout(timeout);
        }
    }).catch(e => console.log(e));
}

export function TextConversionNoDelay(text) {
    return new Promise((r, t) => {
            googleTransliterate(new XMLHttpRequest(), text, 'ne-t-i0-und', 8)
                .then(response => {
                    console.log("TT: ", response);
                    r(response.map(c=>c[0]));
                })
                .catch(e => t(Error(e)));
    }).catch(e => console.log(e));
}

export default TextConversion;
