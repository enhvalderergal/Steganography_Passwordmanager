window.onload
{
    //We make our arrays to manage allowed characters and generate the password
    const tegn = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m","Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M", "!", "#", "%", "&", "/", "(", ")", "=", "?", "+", "@", "{", "[", "]", "}", "|", "~", "^", ",", ".", ";", ":", "-", "*", "'"];
    const kode = [] 

    //We set up what functions should run when the UI is interacted with
    document.getElementById("Decode").addEventListener("click", Find);
    document.getElementById("Encode").addEventListener("click", Gem);
    document.getElementById("img").addEventListener("change", loadFile);
    document.getElementById("Generate").addEventListener("click", Generate);

    //We hide the unassigned image
    document.getElementById("VisualImage").style.visibility = "hidden"
    

    function Find ()
    {
 
        //Decodes hidden message from image URL
        code = steg.decode(document.getElementById("VisualImage"))
        console.log(code)
        //We print the generated password on the encode input
        document.getElementById("Message").value = code
    }
    function Gem ()
    {
        //Saves a hidden message in a new image URL
        hiddenmessage = document.getElementById("Message").value
        document.getElementById("VisualImage").src = steg.encode(hiddenmessage,document.getElementById("VisualImage").src)
    }

    function loadFile ()
    {
        //We load in the given image and display the image
        document.getElementById("VisualImage").style.visibility = "visible"
        var image = document.getElementById('VisualImage');
        image.src = URL.createObjectURL(event.target.files[0]);
    }

    function Generate()
    {
        //We find how long the password should be
        passwordlenght = document.getElementById("passwordlenght").value
        length =  tegn.length;
        //We use our "tegn" array of allowed characters to make a random sequence that is then saved in out "kode" array
        index = Math.floor(Math.random() * length) 
        digit = tegn[index]
        kode.push(digit);
        //We run the Generate function untill the "kode" array is as long as the given password length
        if (kode.length < 1){
            Generate()
        }
        if (kode.length < passwordlenght){
            console.log(kode.length)
            Generate()
        }
        console.log(kode.join("").toString())
        //We print the generated password on the encode input
        document.getElementById("Message").value = kode.join("").toString()
    }

};

