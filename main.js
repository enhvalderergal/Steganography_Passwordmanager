window.onload
{

    
    //We create the elemants that we need
    var inputs = document.getElementsByTagName('input');
    form = document.createElement("div");
    button = document.createElement("button");
    logo = document.createElement("img");
    menu = document.createElement("div");
    passwordImage = document.createElement("img");
    FileManager = document.createElement("input");
    FileManager.addEventListener("change", loadFile);

    PasswordField = ""

    for(var i = 0; i < inputs.length; i++) {
        //We find the password input on the site
        if(inputs[i].type.toLowerCase() == 'password') {
            console.log("Password field detected")
            //We make a variable that is the parent to the password input
            parrent = inputs[i].parentElement
            PasswordField = inputs[i];

            //We format our elements into a hierarki
            parrent.appendChild(form);
            form.appendChild(button);
            button.appendChild(logo);
            form.appendChild(menu);
            menu.appendChild(FileManager)
            menu.appendChild(passwordImage)
            
            
            //We call the funktion PasswordManager when the on site button is pressed
            button.onclick = function() { PasswordManager(); };

            //We set up the types, id and restrictions for our elements
            button.type ="button"
            FileManager.type = "file"
            FileManager.accept="image/*"

            passwordImage.id = "VisualImage"
            FileManager.id = "FileSystem"
            form.id = "Container"
            menu.id = "Menu"
            button.id = "Passwordbutton"
            logo.id = "buttonGFX"

            logo.src = chrome.runtime.getURL("logo.png")
            menu.style.visibility = "hidden"
        }
        }
}



function PasswordManager ()
{
    //We toggle the on site menu visible or hidden when the button is pressed
    if (Menu.style.visibility != "visible")
    {
        document.getElementById("Menu").style.visibility = "visible"
    }
    else
    {
        document.getElementById("Menu").style.visibility = "hidden"
    }
}
           
function loadFile ()
    {
        //We load in the given image and display the image
        var secretimage = document.getElementById('VisualImage');
        secretimage.src = URL.createObjectURL(event.target.files[0]);
        secretimage.onload = function(){
            console.log(this.width);
            Find(secretimage)
        }
    }


    function Find (img)
    {
        //Decodes hidden message from image URL
        console.log((img).width)
        code = steg.decode(img)
        console.log(code)
        PasswordField.value = code
    }
    
