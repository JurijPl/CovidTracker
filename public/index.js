function changeForm(){
    document.getElementById("registracijaStranke").style.display="block";
    document.getElementById("prijavaStranke").style.display="none";
}
function changeForm2(){
    document.getElementById("registracijaStranke").style.display="none";
    document.getElementById("prijavaStranke").style.display="block";
}

var dataPoints=[];
function dodajTocke(stTock, podatki) {
  dataPoints=[];
  var valX; 
  var valY;
  for(var i = 0; i < stTock; i++) {
    valX = new Date(podatki[i].year + "-" + podatki[i].month + "-" + podatki[i].day);
    valY = podatki[i].confirmed;
    dataPoints.push({x: valX,y: valY});
  }
  var apigraf = new CanvasJS.Chart("chart2", {
    theme: "light1",
    animationEnabled: true,
    zoomEnabled: true,
    title: {
        text: "Covid-19 sledilnik",
        fontColor: "lightgreen"
    },
    subtitles:[
        {
            fontColor: "black",
            text: "Potrjenih primerov na teden",
        },
    ],
    axisX:{
        valueFormatString: "YYYY-MM" ,
        labelAngle: -50
    },
    axisY: {
        valueFormatString: "###",
        title: "Potrjenih okuženih",
        titleFontColor: "black"
    },
    data: [{
        type: "area",
        lineColor:"blue",
        dataPoints: dataPoints
    }],
  });
  apigraf.render();
}

window.addEventListener('load', function(){
  $.ajax({
    url: "https://api.sledilnik.org/api/stats-weekly",
    type: "GET",
    contentType: "application/json",
    success: function(odgovor){
        var podatki = odgovor;
        console.log(odgovor);
        dodajTocke(podatki.length, podatki);
    },
    error: function(napaka){
        console.log(napaka);
    }
  })
});



/*const btn = document.getElementById('regBtn');
btn.addEventListener('click', function(e){
    e.preventDefault();
    var email=document.getElementById('email').value;
    console.log(email);
    var passwd=document.getElementById('password').value;
    var ime=document.getElementById('ime').value
    var priimek=document.getElementById('priimek').value;
    var starost=document.getElementById('starost').value;
    //if(!validEmail(email)|| !validPasswd(passwd)||starost<14|| ime==""|| priimek=="") return;

    var stranka={
        id: genEhrID(),
        email: email,
        passwd: passwd,
        ime: ime,
        priimek: priimek,
        starost: starost
    }
    console.log(stranka);

    fetch('/', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(stranka)
    }).then(response => console.log(response.status));
});*/