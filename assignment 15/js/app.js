// showing login screen if user already have account
var showLogin = document.getElementById("show-login-sc");
var showSignup = document.getElementById("show-signup-sc");
var loginScreen = document.getElementById("login-screen");
var signupScreen = document.getElementById("signup-screen");


showLogin.addEventListener("click", function () {
    signupScreen.style.display = "none";
    loginScreen.style.display = "block";
})

showSignup.addEventListener("click", function () {
    signupScreen.style.display = "block";
    loginScreen.style.display = "none";
})

// puuting loged in user in active user

var activeUser;

// making construction function to generate object of the registrating user

function UserObj(name, imgURL, email, password) {
    this.id = Math.random().toFixed(8).slice(2);
    this.name = name;
    this.imgURL = imgURL;
    this.email = email;
    this.password = password;
    this.friends = [];
    this.posts = [];

}

// registering user by getting data

var registerBtn = document.getElementById("register-btn");

registerBtn.addEventListener("click", function () {

    var savedUser = JSON.parse(localStorage.getItem("data"));

    if (savedUser == null) {
        savedUser = [];
    }

    //getting the value from registration form

    var name = document.getElementById("fullName");
    var imgURL = document.getElementById("imgURL");
    var userEmail = document.getElementById("userEmail");
    var userPsw = document.getElementById("userPsw");



    if(name.value != "" && imgURL.value != "" && userEmail.value != "" && userPsw.value != ""){


    var appUser = new UserObj(name.value, imgURL.value, userEmail.value, userPsw.value);


    // if user is first member direct add to array 


    if (savedUser.length == 0) {
        savedUser.push(appUser);
        localStorage.setItem("data", JSON.stringify(savedUser));


        //switching user to the login form after registration
        signupScreen.style.display = "none";
        loginScreen.style.display = "block";

    } else {


        for (var i = 0; i < savedUser.length; i++) {
            if (savedUser[i].email != appUser.email) {

                savedUser.push(appUser);
                localStorage.setItem("data", JSON.stringify(savedUser));
                //switching user to the login form after registration
                signupScreen.style.display = "none";
                loginScreen.style.display = "block";

                break;

            } else {
                alert("This Email is allready registered");
                
            }

        }

        

    }

    // removing value from the input fields

    name.value = "";
    imgURL.value = "";
    userEmail.value = "";
    userPsw.value = "";

}else{
    alert("Please Fill the Form ");
}

});


// login user by matching the email and password

var loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", function () {


    var localData = JSON.parse(localStorage.getItem("data"));
    var regisEmail = document.getElementById("regis-email");
    var regisPsw = document.getElementById("regis-psw");
    var userPanel = document.getElementById("user-panel");

    // checking login detail correct or not 


    var isFound = false;

    if(localData.length == 1){
        if (regisEmail.value == localData[0].email && regisPsw.value == localData[0].password) {
            userPanel.style.display = "block";
            signupScreen.style.display = "none";
            loginScreen.style.display = "none";
            isFound = true;
            activeUser = localData[0];
    }
    }else{
        for (var i = 0; i < localData.length; i++) {
            if (regisEmail.value == localData[i].email && regisPsw.value == localData[i].password) {
                    userPanel.style.display = "block";
                    signupScreen.style.display = "none";
                    loginScreen.style.display = "none";
                    isFound = true;
                    activeUser = localData[i];
                    break;
            }
        }
    }

    

    if(isFound == false){
        alert("Enter Correct Information OR Register First");
    }

    regisEmail.value = "";
    regisPsw.value = "";

    showLogedProfile();

    showTotalUsers();


});


// showing user profile on the user screen

function showLogedProfile(){
    var profileSec = document.getElementById("profile-sec");
    var profileSecHtml = ` <div class="col-lg-6 d-flex align-items-center">
                            <img src="${activeUser.imgURL}" alt="" class="img-fluid rounded-circle mr-2" width="100px" height="100px">
                            <h2>${activeUser.name}</h2>
                           </div>`;

    profileSec.innerHTML = profileSecHtml;

}


function showTotalUsers(){


    var totalUser = JSON.parse(localStorage.getItem("data"));
    var totalUserScreen = document.getElementById("totalUser");

    

    for(var i = 0; i < totalUser.length; i++){

        if(activeUser.email == totalUser[i].email){
            continue;
        }

        var totalUsersHtml = `<div class="card p-3 m-2">
                                <div class="myFriend-img d-flex align-items-center">
                                    <div class="friedImg mr-3">
                                        <img src="${totalUser[i].imgURL}" alt="" class="img-fluid rounded-circle" width="70px" height="70px">
                                    </div>
                                    <div class="myFrient-title">
                                        <h4>${totalUser[i].name}</h4>
                                        <button class="btn btn-dark" onclick="addFriend(e)">Add Friend</button>
                                    </div>
                                </div>
                            </div>`;

        totalUserScreen.innerHTML += totalUsersHtml;
        
    }
    

}


// Post Method

var post = document.getElementById("post");

function showPost(){
   var postBox = document.getElementById("post-box");
   var showPost = document.getElementById("showPost");
   postBox.style.display = "block";
   showPost.style.display = "none";
}

function Post(description, image){
    this.description = description
    this.image = image
}

function userPost(){
    if (localStorage.getItem('posts') == null) {
        localStorage.setItem('posts', '[]');
    }

    var description = document.getElementById("description").value;
    var image = document.getElementById("img").value

    var post = new Post(description, image);

    var userPosts = activeUser.posts;
    userPosts.push(post);


    // var mySpace = []
    // mySpace[0] = document.getElementsByTagName('textarea')[0].value
    // mySpace[1] =  document.getElementsByTagName('input')[0].value
    // localStorage.setItem('posts', JSON.stringify(mySpace));

}