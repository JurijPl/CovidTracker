var baza = 'JPlaskan';
var baseUrl = 'https://teaching.lavbic.net/api/OIS/baza/' + baza + '/podatki/';


/**
 * Generator podatkov za novega pacienta, ki bo uporabljal aplikacijo. Pri
 * generiranju podatkov je potrebno najprej kreirati novega pacienta z
 * določenimi osebnimi podatki (ime, priimek in datum rojstva) ter za njega
 * shraniti nekaj podatkov o vitalnih znakih.
 * @param stPacienta zaporedna številka pacienta (1, 2 ali 3)
 * @return ehrId generiranega pacienta
 */

//TO JE BILO UPORABLJENO ZGOLJ NA ZACETKU DA SEM DOBIL STATICNE EHRID-je
/*const ehr1 = genEhrID();
const ehr2 = genEhrID();
const ehr3 = genEhrID();*/
var pacient1={
  id: "82450e6d-fcbb-4460-95c0-8e8b34a64046",
  ime:"Tone",
  priimek:"Novak",
  starost: 69,
  kadilec: "Občasni kadilec",
  bolezni: "Sladkorna bolezen, Anemija",
  povpTemp: 37.7,
  simptomi: "Vročina, suh kašelj, bolečina v prsnem košu",
};
var pacient2={
  id: "141b0ead-08b3-4e7c-8acc-def01c2279ee",
  ime:"Tina",
  priimek:"Hrovat",
  starost:22,
  kadilec: "Ne kadi",
  bolezni: "Dermatitis",
  povpTemp: 36.5,
  simptomi: "Brez simptomov",
};
var pacient3={
  id: "d7cacfc0-1235-4b16-a143-906a8df2d0c9",
  ime: "Miki",
  priimek: "Milane",
  starost: 44,
  kadilec: "Redni kadilec",
  bolezni: "Brez predhodnih obolenj",
  povpTemp: 40.3,
  simptomi: "Težave pri dihanju, bolečina v prsnem košu, glavobol",
};

function generirajPodatke(stPacienta) {
  if(stPacienta==1){
    addPatient(pacient1);
  } else if(stPacienta==2){
    addPatient(pacient2);
  } else if(stPacienta==3){
    addPatient(pacient3);
  }

  //TODO dej pacienta v bazo
  if(stPacienta==1){
    return pacient1.id;
  } else if(stPacienta==2){
    return pacient2.id;
  } else if(stPacienta==3){
    return pacient3.id;
  }
}

var tabelaPacientov=[pacient1, pacient2, pacient3];
console.log(tabelaPacientov);
// TODO: Tukaj implementirate funkcionalnost, ki jo podpira vaša aplikacija
function vpisUporabnika(){
  if(document.getElementById("ime").value=="" || document.getElementById("priimek").value=="" || document.getElementById("starost").value < 14
    || document.getElementById("kadilec").value=="Ali kadite?" || document.getElementById("vrocina").value<34 || document.getElementById("vrocina").value>44){
      return;
  }
  document.getElementById("customStranka");
  var stranka={
    id: genEhrID(),
    ime: document.getElementById("ime").value,
    priimek: document.getElementById("priimek").value,
    starost: document.getElementById("starost").value,
    kadilec: document.getElementById("kadilec").value,
    bolezni: document.getElementById("bolezni").value=="" ? document.getElementById("bolezni").value="Nima predhodnih bolezni." : document.getElementById("bolezni").value,
    povpTemp: document.getElementById("vrocina").value,
    simptomi: document.getElementById("simptomi").value=="" ? document.getElementById("simptomi").value="Nima simptomov." : document.getElementById("simptomi").value
  }
  alert("Vaš EhrID je: "+stranka.id+" Prosimo, da si ga zapomnite, saj ga boste potrebovali za nadaljnje vpisovanje podatkov.");
  addPatient(stranka);
}

function genEhrID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function prikaziEHR(){
  document.getElementById("ehridpacientov").style.display='block';
}

function addPatient(pacient){
  $.ajax({
    url: "https://teaching.lavbic.net/api/OIS/baza/JPlaskan/podatki/azuriraj?kljuc="+pacient.id+"&elementTabele=false",
    type: "PUT",
    data: JSON.stringify(pacient),
    contentType: "application/json",
    success: function(){
      console.log("Pacient je bil uspešno dodan!");
    },
    error: function(){
      alert("Pacienta ni bilo mogoče dodati.");
    }
  })
}

var primer;

function getPatient(id){
  $.ajax({
    url: "https://teaching.lavbic.net/api/OIS/baza/JPlaskan/podatki/vrni/"+id,
    type: "GET",
    success: function(response){
      primer=response;
      console.log(primer);
      pridobiPodatke();
    },
    error: function(){
      console.log("Ne moremo pridobiti podatkov o pacientu.");
    }
  })
}

function pridobiEhr(){
  var ehr=document.getElementById("ehrpacienta").value;
  getPatient(ehr);
}

function pridobiPodatke(){
  var podatki=$("#vzorcniPacienti");
  document.getElementById("podatkiinvpis").style.display='block';
  var rend=`<strong>EhrID</strong>: ${primer.id} <br>\
            <strong>Ime</strong>: ${primer.ime} <br> \
            <strong>Priimek</strong>: ${primer.priimek} <br>\
            <strong>Starost</strong>: ${primer.starost} <br>\
            <strong>Kadilec</strong>: ${primer.kadilec} <br>\
            <strong>Predhodne bolezni</strong>: ${primer.bolezni} <br>\
            <strong>Dnevna temperatura</strong>: ${primer.povpTemp} <br>\
            <strong>Simptomi</strong>: ${primer.simptomi} <br>\
            <button type="submit" onclick="pridobiGraf()" class="gumbGraf">Nariši graf</button> <button type="submit" onclick="preglejEHR()">Posodobi podatke</button>
            </div>`;
  podatki.html(rend);
}

function preglejEHR(){
  if(primer.id==("82450e6d-fcbb-4460-95c0-8e8b34a64046" || "141b0ead-08b3-4e7c-8acc-def01c2279ee" || "d7cacfc0-1235-4b16-a143-906a8df2d0c9")){
    alert("Podatkov za tega pacienta se ne da spreminjati");
  }
  else{
    document.getElementById("updatePodatkov").style.display='block';
  }
}

function vpisiNovePodatke(){
  primer.povpTemp=document.getElementById("novaVrocina").value;
  if(document.getElementById("noviSimptomi").value==""){
    primer.simptomi="Nima simptomov";
  } else{
    primer.simptomi=document.getElementById("noviSimptomi").value;
  }
  addPatient(primer);
}

function izracunRizike(pacient){
  var rizika;
  if((pacient.kadilec=="Redni kadilec" || pacient.simptomi=="težave pri dihanju" || pacient.simptomi=="bolečine v prsnem košu" || pacient.simptomi=="izguba govora" || pacient.povpTemp>40)){
    rizika="Visok";
  }
  if(pacient.kadilec=="Občasni kadilec" || (pacient.simptomi=="vročina" || pacient.simptomi=="driska" || (pacient.povpTemp>38 && pacient.povpTemp<=40))){
    rizika="Srednji";
  }
  if(pacient.kadilec=="Ne kadi"){
    rizika="Nizek";
  }
  return rizika;
}

var table=[];
function pridobiGraf(){
  table=[];
  document.getElementById("chartContainer").style.display='block';
  //table.push({y: primer.id, x: izracunRizike(), label: "Vaša rizika:"});
  console.log(pacient1);
  console.log(pacient2);
  console.log(pacient3);
  console.log(primer);
  table.push({y: (izracunRizike(pacient1)=="Visok" ? 75 : (izracunRizike(pacient1)=="Srednji" ? 50 : 25)), x: 1, label: "Pacient 1"});
  table.push({y: (izracunRizike(pacient2)=="Visok" ? 75 : (izracunRizike(pacient2)=="Srednji" ? 50 : 25)), x: 2, label: "Pacient 2"});
  table.push({y: (izracunRizike(pacient3)=="Visok" ? 75 : (izracunRizike(pacient3)=="Srednji" ? 50 : 25)), x: 3, label: "Pacient 3"});
  table.push({y: (izracunRizike(primer)=="Visok" ? 75 : (izracunRizike(primer)=="Srednji" ? 50 : 25)), x: 4, label: "Izbrani pacient"});
  console.log(table);
  let chart = new CanvasJS.Chart("chartContainer", {
    title: {
      fontColor: "#000000",
      text: "Tveganje hujšega poteka bolezni:",
    },
    axisX: {
      valueFormatString: "YYYY",
      labelAngle: -50
    },
    axisY: {
      valueFormatString: "#,###"
    },
    subtitles: [
      {
        fontColor: "#009900",
        text: "Vaš nivo tveganja je: "+izracunRizike(primer),
      },
    ],
    data: [{
      type: "column",
      dataPoints: table
    }],
  });

  chart.options.data[0].dataPoints = table;
  chart.render();
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
        fontColor: "orange"
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