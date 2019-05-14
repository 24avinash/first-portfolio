var peopleArray;
var selectedUser;
$.getJSON("people.json", function (json) {
    peopleArray = json.People;
    console.log(peopleArray);
    populateNamesInLeftNavigation(peopleArray);
});

function getSelectedUser(event) {
    console.log(event.target.firstChild);
    for (var i = 0; i < peopleArray.length; i++) {
        if (peopleArray[i].name === event.target.firstChild.textContent) {
            selectedUser = peopleArray[i];
            break;
        }
    }
}

function showArrowIcon(target) {
    var left_navigation_children = document.getElementById('left_navigation').children;
    for (var i = 0; i < left_navigation_children.length; i++) {
        left_navigation_children[i].children[0].style.display = 'none';
        left_navigation_children[i].style.backgroundColor = '#efefef';
    }
    target.children[0].style.display = 'block';
    target.style.backgroundColor = 'darkgrey';
}
function attachUserImage() {
    var imgElement = document.createElement("img");
    imgElement.src = selectedUser.img;
    var img_container = document.getElementById('user_phpto');
    img_container.replaceChild(imgElement, img_container.childNodes[0]);
}
function attachHeartIcon() {
    var heart_icon_container = document.getElementById('heart_icon');
    heart_icon_container.innerHTML = '';
    for (var count = 1; count <= selectedUser.rating; count++) {
        var imgElement = document.createElement("img");
        imgElement.src = 'images/red_heart.svg';
        heart_icon_container.appendChild(imgElement);
    }
}
function attachDescription() {
    document.getElementById('description_container').innerHTML = selectedUser.Description;
}
function attachTable() {
    var tbody = document.getElementById('table-body');
    tbody.innerHTML = '';
    for (var i = 0; i < Math.max(selectedUser.Likes.length, selectedUser.Dislikes.length); i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 2; j++) {
            var cell = document.createElement('td');
            if (j === 0) {
                var cellText = document.createTextNode(selectedUser.Likes[i] ? selectedUser.Likes[i] : '');
            } else {
                var cellText = document.createTextNode(selectedUser.Dislikes[i] ? selectedUser.Dislikes[i] : '');
            }
            cell.appendChild(cellText);
            tr.appendChild(cell);
        }
        tbody.appendChild(tr);
    }
}
function init(divElement) {
    divElement.click();
}

function generateDynamicDOM() {
    //Attach Image of selected user in DOM
    attachUserImage();
    //Attach Heart Icon of selected user in DOM
    attachHeartIcon();
    //Attach Description of selected user in DOM
    attachDescription();
    //Attach Table of selected user in DOM
    attachTable();
}

function populateNamesInLeftNavigation(peopleArray) {
    var divElement;
    for (var i = 0; i < peopleArray.length; i++) {
        divElement = document.createElement("div");
        divElement.innerHTML = peopleArray[i].name;
        var arrowSpan = document.createElement('span');
        arrowSpan.setAttribute('class', 'arrow');
        divElement.appendChild(arrowSpan);
        divElement.setAttribute("class", 'left-navigation-item');
        divElement.style.height = (90 / peopleArray.length) + 'vh';
        divElement.addEventListener('click', function (event) {
            getSelectedUser(event);
            //Show and Hide Arrow
            showArrowIcon(event.target);
            generateDynamicDOM();
        });
        document.getElementById('left_navigation').appendChild(divElement);
        if (i === 0) {
            init(divElement);
        }
    }
}

function search(e) {
    var searchValue = e.target.value;
    var searchedUser;
    console.log(document.getElementById('left_navigation'));
    console.log(searchValue);
    for (var i = 0; i < peopleArray.length; i++) {
        if (peopleArray[i].name.slice(0, searchValue.length).toLowerCase() === searchValue.toLowerCase()) {
            selectedUser = peopleArray[i];
            console.log(selectedUser);
            break;
        }
    }
    //Show and Hide Arrow
    for (var i = 0; i < peopleArray.length; i++) {
        if (document.getElementById('left_navigation').children[i].innerText === selectedUser.name) {
            showArrowIcon(document.getElementById('left_navigation').children[i]);
        }
    }
    generateDynamicDOM();
}


