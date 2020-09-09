var firebaseConfig = {
    apiKey: "AIzaSyA9F6zriCDRHGeu-LwJ83CplHUKkQVCr0M",
    authDomain: "corona-9e261.firebaseapp.com",
    databaseURL: "https://corona-9e261.firebaseio.com",
    projectId: "corona-9e261",
    storageBucket: "corona-9e261.appspot.com",
    messagingSenderId: "694830677499",
    appId: "1:694830677499:web:b9382e363351f4b3701f5e"
  };
  firebase.initializeApp(firebaseConfig);
  
  var UserInputsRef=firebase.database().ref('UserInputs')
  document.getElementById('testForm').addEventListener('submit',submitForm);
  function submitForm(e){
    e.preventDefault();
    var name =getInputVal('name');
    var mobile =getInputVal('mobile');
    var age =getInputVal('age');
    var state =getInputVal('state');
    state=state.toLowerCase();
    readState(state);
    var email =getInputVal('email');
    var profession =getInputVal('profession');
    var dateofbirth =getInputVal('dateofbirth');
    var volunteer = getInputVal('volunteer');
    var travel = getInputVal('travel');
    var symptomsList =getSelectedCheckboxValues('symptoms');
    saveMessages(name,mobile,age,email,profession,dateofbirth,volunteer,state,travel,symptomsList);
}

function readState(state){
    var centers;
    var ref = firebase.database().ref(state);
    ref.on('value', (data) => {
     centers = data.val();
     document.getElementById("result").innerHTML ="<br>"+centers.toUpperCase();
})

}
function getInputVal(id){
    return document.getElementById(id).value;
}

function saveMessages(name,mobile,age,email,profession,dateofbirth,volunteer,state,travel,symptomsList){
    var newuserInputsRef = UserInputsRef.push();
    newuserInputsRef.set({
        name:name,
        mobile:mobile,
        age:age,
        email:email,
        profession:profession,
        dateofbirth:dateofbirth,
        volunteer:volunteer,
        state:state,
        travel:travel,
        symptomsList:symptomsList
    })
}

function getSelectedCheckboxValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    let values = [];
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });
    return values;
}