//YOUR FIREBASE LINKS
//ADD YOUR FIREBASE LINKS HERE
// Your web app's Firebase configuration
var firebaseConfig = {
      apiKey: "AIzaSyA68HhGFMa2_fw2cXSG--1Fgk08OncQQEw",
      authDomain: "kwitter-6566c.firebaseapp.com",
      databaseURL: "https://kwitter-6566c-default-rtdb.firebaseio.com",
      projectId: "kwitter-6566c",
      storageBucket: "kwitter-6566c.appspot.com",
      messagingSenderId: "859214444143",
      appId: "1:859214444143:web:34dc9726e89dd85decbf9a"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


user_name=localStorage.getItem("user_name");
room_name=localStorage.getItem("room_name");


function send(){
      msg=document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
message:msg,
like:0
      });
      document.getElementById("msg").innerHTML="";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name=message_data["name"];
message=message_data["message"];
like=message_data["like"];
namewithTag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
messagewithTag="<h4 class='message_h4'>"+message+"</h4>";
likeButton="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
spanWithTag="<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>";
row=namewithTag+messagewithTag+likeButton+spanWithTag;
document.getElementById("output").innerHTML+=row;
//End code
      } });  }); }
getData();
function updateLike(message_id){
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      updatedLikes=Number(likes)+1;
      console.log(updatedLikes);
      firebase.database().ref(room_name).child(message_id).update({
            like:updatedLikes
      });
}
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}
