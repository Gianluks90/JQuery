let visibleMethods = (function ($) {

    const SOURCE = "https://jsonplaceholder.typicode.com/users/";

    function LoadDoc(source, displayFunction) {
        $.get(source, function(data, status) {
            if(status == "success") {
                displayFunction(data);
            }
        })
    };

    function DisplayLink(users) {
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            let div = document.getElementById("Info");
            let paragraph = document.createElement("p");
            paragraph.setAttribute("data-paragraphId", user.id);
            let link = document.createElement("a");
            link.setAttribute("href", "");
            link.innerHTML = user.name;
            link.setAttribute("data-userId", user.id);
            link.appendChild(document.createElement('br'));
            paragraph.appendChild(link);
            div.appendChild(paragraph);
            div.addEventListener("click", LoadUser) // ritorna anche un event (evt) nascosto;
        }
    }

    function LoadUser(evt){
        let userId = evt.target.getAttribute("data-userId");
        let newSource = SOURCE + userId;
        LoadDoc(newSource, DisplayDetails);
        evt.preventDefault();
    }

    function DisplayDetails(user){
        let userId = user.id;
        let paragraph = document.querySelector("[data-paragraphId = '"+ userId +"']");
        let span1 = document.createElement('span');
        span1.innerHTML = "e-mail: " + user.email 
            + "<br>Phone: " + user.phone
            + "<br>Address: " + user.address.street + ", " + user.address.suite + ", " + user.address.city
            + "<br>Company: " + user.company.name;

        span1.appendChild(document.createElement('br'));
        paragraph.appendChild(span1);
    }

    function FirstLoad(){
        let div = document.getElementById("Info");
        $(div).empty();
        LoadDoc(SOURCE, DisplayLink);
    }

    return {
        firstLoad : FirstLoad
    }
})($);

let button = document.getElementById("getButton");
button.onclick = visibleMethods.firstLoad;