function autocomplete(inp, arr) { //DOM element, autoCmpltArray
    var currentFocus;
    inp.addEventListener("input", function(e) { //onInput
        var a, b, i, val = this.value;
        closeAllLists(); //close opened
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a); //append autocomplete container
        for (i = 0; i < arr.length; i++) { //forEach element in array
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) { //if input.upper() = thatArray.substr(len).upper():
                b = document.createElement("DIV"); // for that matching element
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>"; //bold matches
                b.innerHTML += arr[i].substr(val.length); //remaining non-matches
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>"; //clickDetecting
                b.addEventListener("click", function(e) { //if user selects,
                    inp.value = this.getElementsByTagName("input")[0].value; //autocomplete for input field,
                    closeAllLists(); //then close suggestions container
                });
                a.appendChild(b); //add below input field
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) { //down
            currentFocus++; //increase currentFocus
            addActive(x);
        } else if (e.keyCode == 38) { //up
            currentFocus--; //reduce currentFocus
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault(); //prevent return key submitting form
            if (currentFocus > -1) {
                if (x) x[currentFocus].click(); //autosuggest by click simulation.
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        removeActive(x); //remove all first
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active"); //highlight
    }

    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active"); //remove highlight from all
        }
    }

    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items"); //remove every child from autosuggest
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}