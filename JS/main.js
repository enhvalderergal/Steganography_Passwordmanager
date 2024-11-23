//Stored elements
passwordfield = null
wrapper = null;
bagground = null;
select_password = null;
password_tekst = null;
img_tekst = null;


//stored variables
currentPassword = "";
passwordlength = 32
const tegn = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m","Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M", "!", "#", "%", "&", "/", "(", ")", "=", "?", "+", "@", "{", "[", "]", "}", "|", "~", "^", ",", ".", ";", ":", "-", "*", "'"];
kode = [] 
password = ""
displayPassword = true;
window.onload
{
    if (passwordfield == 1)
    {
    bagground = document.createElement("div")
    more_options = document.createElement("button")
    fileInput = document.createElement("input");
    passwordImage = document.createElement("img");

    //menu
        menu = document.createElement("div");
        bagground.appendChild(menu); menu.id = "menu"; menu.style.visibility = "hidden"

        //Inputs
            buttonLayout = document.createElement("div");
            inputFieldLayout = document.createElement("div");
            encodeButton = document.createElement("button");
            decodeButton = document.createElement("button");
            generateButton = document.createElement("button");
            showPasswordButton = document.createElement("button");
            passwordInputField = document.createElement("input")
           

        menu.appendChild(buttonLayout); buttonLayout.id = "buttonlayout"
        buttonLayout.appendChild(encodeButton); encodeButton.onclick = function() { encode(); }; encodeButton.type = "button";  encodeButton.classList.add("Setting");  encodeButton.innerHTML = "Encode";
        buttonLayout.appendChild(decodeButton); decodeButton.onclick = function() { decode(); }; decodeButton.type = "button";  decodeButton.classList.add("Setting");  decodeButton.innerHTML = "Decode";
        buttonLayout.appendChild(generateButton); generateButton.onclick = function() { generate_password(); }; generateButton.type = "button";  generateButton.classList.add("Setting");  generateButton.innerHTML = "Generate"
        menu.appendChild(inputFieldLayout); inputFieldLayout.id = "inputFieldlayout"
        inputFieldLayout.appendChild(passwordInputField); passwordInputField.classList.add("Setting");
        inputFieldLayout.appendChild(showPasswordButton); showPasswordButton.id = "showPassword"; showPasswordButton.classList.add("Setting"); showPasswordButton.type = "button"; showPasswordButton.onclick = function() { showPassword(); };

        //Elements
        wrapper.appendChild(bagground); bagground.id = "bagground"; bagground.style.visibility = "hidden"
        bagground.appendChild(fileInput); fileInput.type = "file"; fileInput.accept="image/*"; fileInput.id = "FileSystem" 
        bagground.appendChild(passwordImage); passwordImage.id = "passwordImage"
        bagground.appendChild(more_options); more_options.onclick = function() { Menu(); }; more_options.type = "button"; more_options.id ="Exspand";
        fileInput.addEventListener("change", loadFile);

        
    }
   
    Scraper()
    if (passwordfield !== null)
    {
        Icon()
        CreateDropDown()
    }
    
}



function Scraper()
{
    //Gets the nessesary elements from the document
    passwordfield = document.querySelector('input[type="password"]');
}



function Icon()
{
        // Create the wrapper
    wrapper = document.createElement('div'); 


    // Get computed styles of the original password field
    const computedStyle = getComputedStyle(passwordfield);
    const rect = passwordfield.getBoundingClientRect();
    const passwordFieldHeight = rect.height;
    const passwordFieldWidth = rect.width;

        // Set wrapper styles to match the password field’s borders, margin, and padding
        wrapper.style.cssText = `
        position: absolute;
        display: inline-block;
        width: ${passwordFieldWidth}px;
        height: ${passwordFieldHeight}px;
        border: ${computedStyle.border};
        margin: 0; /* Remove margin to avoid misalignment */
        padding: ${computedStyle.padding};
        box-sizing: ${computedStyle.boxSizing};
        background-color: transparent;
        background-color: transparent;
        border: none;
        pointer-events: none; /* Makes the div transparent to input interactions */
    `;

    // Insert the wrapper in the DOM
    passwordfield.parentNode.insertBefore(wrapper, passwordfield);


    // Create the shadow root
    const shadowRoot = wrapper.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
        <style>
        :host {
            display: inline-block;
            position: relative;
            height: 100%; /* Take full height relative to wrapper */
        }
        .password-icon {
            position: absolute;
            right: 10px;
            top: 53%;
            transform: translateY(-50%);
            height: 20px; /* Fit the logo */
            cursor: pointer;
        }
        input {
            box-sizing: border-box;
            width: 100%;
            padding-right: 40px; /* Padding for the icon */
        }
        </style>
        <slot></slot> 
        <img src="${chrome.runtime.getURL('logo.png')}" class="password-icon"/>
    `;

        // When input gains focus
        passwordfield.addEventListener('click', () => {
            bagground.style.display = 'flex';
        });
    
        // Keep the container open while typing or interacting
        passwordfield.addEventListener('input', () => {
            bagground.style.display = 'flex';
        });
    
        document.addEventListener('click', (event) => {
            // If the click happens outside the input field and the menu
            if (!passwordfield.contains(event.target) && !bagground.contains(event.target)) {
                bagground.style.display = 'none'; // Hide the menu
            }
        })

} //Stll need to remove css from this script its ugly

function CreateDropDown()
{
    //The creation of the element
    bagground = document.createElement('div'); 
    wrapper.appendChild(bagground); bagground.id = "DropDownMenu"

    //The styleing and positionoing of the bagground
    bagground.style.width = passwordfield.getBoundingClientRect().width+"px";

    //The other divs inside the dropdown
    topper = document.createElement('div'); topper.id = "topper"
    linebreak = document.createElement('div'); linebreak.id = "linebreak"

    bagground.appendChild(topper); bagground.appendChild(linebreak);

    //The topper and the image selection
    password_image = document.createElement('img'); password_image.id = "icon"
    password_image.src = chrome.runtime.getURL('logo.png')
    topper.appendChild(password_image);

    //The info about the content
    info = document.createElement('div'); info.id = "info"
    //Tekst
    img_tekst = document.createElement('p');
    password_tekst = document.createElement('p');

    topper.appendChild(info);
    info.appendChild(img_tekst); img_tekst.id = "img_tekst"; img_tekst.textContent = 'No file selected';
    info.appendChild(password_tekst); password_tekst.id = "password_tekst"; password_tekst.textContent = '________________';

    
    //All of this because of the stupid file not chosen AAAAAAAAAAAA thanks chat gpt
        // Create a hidden file input
    select_password = document.createElement('input');
    select_password.type = 'file';
    select_password.id = 'File_selection';
    select_password.accept = '.png, .jpg, .jpeg';
    select_password.style.display = 'none'; // Hide the default file input

    // Create a custom button
    const customButton = document.createElement('button');
    customButton.textContent = '₪';
    customButton.id = 'SelectFile';

    // Add event listener to trigger the file input click
    customButton.addEventListener('click', () => select_password.click());
        // Add event listener for when a file is chosen
    select_password.addEventListener('change', () => loadFile());


    // Append elements to the parent container
    topper.appendChild(customButton);
    topper.appendChild(select_password);
    //BTW this is the end of the removal of the stupid file not chosen tekst :/



    CreateOptions()
}



function CreateOptions()
{
    options_menu = document.createElement('div');
    more_options = document.createElement('button'); more_options.textContent = "More options...."; more_options.id = "OptionsButton"
    bagground.appendChild(options_menu);
    options_menu.appendChild(more_options)

    // Create the actual menu
    menu_bagground = document.createElement('div'); 
    options_menu.appendChild(menu_bagground); menu_bagground.id = "OptionsMenu"

    //The styleing and positionoing of the bagground
    options_menu.style.width = passwordfield.getBoundingClientRect().width+"px";
}

function PasswordManager ()
{
    console.log("clicked")
    //We toggle our passwordManager to visible or hidden when the button is pressed
    if (bagground.style.visibility != "visible")
    {
        bagground.style.visibility = "visible"
    }
    else
    {
        bagground.style.visibility = "hidden"
        menu.style.visibility = "hidden"
    }
}



function Menu ()
{
    //We toggle the on site menu visible or hidden when the button is pressed
    if (bagground.style.visibility != "visible")
        {
            bagground.style.visibility = "visible"
            bagground.style.borderRadius = "0px 10px 10px 0px" 
        }
        else
        {
            bagground.style.borderRadius = "10px" 
            bagground.style.visibility = "hidden"
        }
}




function showPassword()
{
   
    if (displayPassword == true)
    {
        displayPassword = false
    }
    else
    {
        displayPassword = true
    }
    update_passwordfield()
}


function loadFile ()
    {

        if (select_password.files.length > 0) {
            const selectedFile = select_password.files[0]; // Get the first file
            img_tekst.textContent = selectedFile.name
            password_image.src = URL.createObjectURL(select_password.files[0]);
            password_image.onload = function(){
                decode()
            }
        } else {
            console.log('No file selected');
        }

        
    }

function decode ()
{
    console.log("decodeing")
    //Decodes hidden message from image URL
    if (password_image != null)
    {
        code = steg.decode(password_image)
        if (code.length == 0)
        {
            passwordfield.value = "No encoded message found";
        }
        update_passwordfield()
        
    }else
    {
        passwordfield.value = "No image loaded";
    }
 
}
    

function update_passwordfield ()
{
    passwordfield.value = ""
    if (displayPassword == true)
        {
            passwordfield.value = password
        }else
        {
            let dots = '';
            for (let i = 0; i < code.length; i++) {
                dots += '.';
            }
            passwordfield.value = dots;
        }
        passwordfield.value = code
    currentPassword = code
}

function encode ()
{
    secretimage = document.getElementById('passwordImage');
    if (secretimage.src != null)
    {
        secretimage.src = steg.encode(passwordInputField.value,secretimage)
    }else
    {
        passwordInputField.value = "No image loaded";
    }

}

function generate_password()
{
     //We find how long the password should be
     length =  tegn.length;
     //We use our "tegn" array of allowed characters to make a random sequence that is then saved in out "kode" array
     index = Math.floor(Math.random() * length) 
     digit = tegn[index]
     kode.push(digit);
     //We run the Generate function untill the "kode" array is as long as the given password length
     if (kode.length < 1){
        generate_password()
     }
     if (kode.length < passwordlength){
         console.log(kode.length)
         generate_password()
     }

     if (kode.length >= passwordlength){
         //We print the generated password on the encode input
         password = kode.join("").toString()
         passwordInputField.value = password;
         kode = [] 
     }

}