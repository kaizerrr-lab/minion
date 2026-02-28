const dictionary = [
    { minion: "komayokay", english: "are you okay", filipino: "ok ka lang ba" },
    { minion: "como ta", english: "how are you", filipino: "kumusta ka" },
    { minion: "como te llama", english: "what is your name", filipino: "anong pangalan mo" },
    { minion: "bello bon jorno", english: "good morning", filipino: "magandang umaga" },
    { minion: "bon nuit", english: "good night", filipino: "magandang gabi" },
    { minion: "poka tu do", english: "what are you doing", filipino: "anong ginagawa mo" },
    { minion: "me eepie", english: "i am tired", filipino: "pagod na ako" },
    { minion: "me miss tu", english: "i miss you", filipino: "namimiss kita" },
    { minion: "poka we", english: "where are we", filipino: "nasaan tayo" },
    { minion: "traba jale", english: "this is fun", filipino: "masaya ito" },
    { minion: "me banyunoo", english: "i am bored", filipino: "nababagot ako" },
    { minion: "tulaliloo", english: "lets go", filipino: "tara na" },
    { minion: "bana-na-na", english: "lets party", filipino: "mag party tayo" },
    { minion: "matoka", english: "look at that", filipino: "tingnan mo yun" },
    { minion: "be do be do be do", english: "emergency", filipino: "saklolo" },
    { minion: "muak muak muak", english: "i love you", filipino: "mahal kita" },
    { minion: "poka", english: "what", filipino: "ano" },
    { minion: "me want banana", english: "i am hungry", filipino: "nagugutom ako" },
    { minion: "we ti amo", english: "we love you", filipino: "mahal ka namin" },
    { minion: "oh que paso", english: "what happened", filipino: "anong nangyari" },
    { minion: "bello", english: "hello", filipino: "kumusta" },
    { minion: "poopaye", english: "goodbye", filipino: "paalam" },
    { minion: "tank yu", english: "thank you", filipino: "salamat" },
    { minion: "para tu", english: "for you", filipino: "para sa iyo" },
    { minion: "banana", english: "banana", filipino: "saging" },
    { minion: "bapple", english: "apple", filipino: "mansanas" },
    { minion: "gelato", english: "ice cream", filipino: "sorbetes" },
    { minion: "poulet", english: "chicken", filipino: "manok" },
    { minion: "bi do", english: "i am sorry", filipino: "patawad" },
    { minion: "kampai", english: "cheers", filipino: "tagay" },
    { minion: "baboi", english: "toy", filipino: "laruan" },
    { minion: "sa la ka", english: "how dare you", filipino: "ang kapal mo" },
    { minion: "underwear", english: "i swear", filipino: "pangako" },
    { minion: "pado", english: "fart", filipino: "utot" },
    { minion: "hana", english: "one", filipino: "isa" },
    { minion: "dul", english: "two", filipino: "dalawa" },
    { minion: "sae", english: "three", filipino: "tatlo" },
    { minion: "chasy", english: "chair", filipino: "upuan" },
    { minion: "stupa", english: "stop", filipino: "tigil" },
    { minion: "si", english: "yes", filipino: "oo" },
    { minion: "no", english: "no", filipino: "hindi" }
];

function translateText() {
    const sourceLang = document.getElementById('sourceLang').value;
    const targetLang = document.getElementById('targetLang').value;
    let text = document.getElementById('inputText').value.toLowerCase().trim();

    text = text.replace(/[^\w\s-]/gi, '');

    if (!text) {
        document.getElementById('outputText').value = "";
        return;
    }

    const sortedDict = [...dictionary].sort((a, b) => b[sourceLang].length - a[sourceLang].length);

    sortedDict.forEach(entry => {
        let sourceWord = entry[sourceLang];
        let targetWord = entry[targetLang];
        
        if (sourceWord && targetWord) {
            const regex = new RegExp("\\b" + sourceWord + "\\b", "gi");
            text = text.replace(regex, targetWord);
        }
    });

    document.getElementById('outputText').value = text;
}

function speakText() {
    const textToSpeak = document.getElementById('outputText').value;
    if (!textToSpeak) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    utterance.pitch = 2.0;
    utterance.rate = 1.3;
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        utterance.voice = voices.find(v => v.name.includes("Google") || v.name.includes("Female")) || voices[0];
    }

    window.speechSynthesis.speak(utterance);
}

window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
};
