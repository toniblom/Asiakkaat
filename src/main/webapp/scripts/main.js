function serialize_form(form){
	return JSON.stringify(
	    Array.from(new FormData(form).entries())
	        .reduce((m, [ key, value ]) => Object.assign(m, { [key]: value }), {})
	        );	
}

//funktio tietojen hakemista varten. Kutsutaan backin GET metodia
function haeAsiakkaat() {
	let url = "asiakkaat?hakusana=" + document.getElementById("hakusana").value; // kutsutaan servletin endpointia
	let requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }       
    };    
    fetch(url, requestOptions)
    .then(response => response.json())//Muutetaan vastausteksti JSON-objektiksi 
   	.then(response => printItems(response)) 
   	.catch(errorText => console.error("Fetch failed: " + errorText));
}

//Kirjoitetaan tiedot taulukkoon JSON-objektilistasta
function printItems(respObjList){
	//console.log(respObjList);
	let htmlStr="";
	for(let item of respObjList){//yksi kokoelmalooppeista		
    	htmlStr+="<tr id='rivi_"+item.asiakas_id+"'>";
    	htmlStr+="<td>"+item.etunimi+"</td>";
    	htmlStr+="<td>"+item.sukunimi+"</td>";
    	htmlStr+="<td>"+item.puhelin+"</td>";
    	htmlStr+="<td>"+item.sposti+"</td>";
    	htmlStr+="<td><span class='poista' onclick=varmistaPoisto("+item.asiakas_id+",'"+encodeURI(item.etunimi)+"','"+encodeURI(item.sukunimi)+"')>Poista</span></td>";   	
    	htmlStr+="</tr>";
	}	
	document.getElementById("tbody").innerHTML = htmlStr;	
}

//Tutkitaan lisättävät tiedot ennen niiden lähettämistä backendiin
function tutkiJaLisaa(){
	if(tutkiTiedot()){
		lisaaTiedot();
	}
}

function tutkiTiedot(){
	let ilmo="";	
	let d = new Date();
	if(document.getElementById("etunimi").value.match(/\d/) || document.getElementById("etunimi").value.match(/[!"#¤%&/()="]/) || document.getElementById("etunimi").value.length<2){
		ilmo="Etunimi ei kelpaa!";	
		document.getElementById("etunimi").focus();	// vie kursorin takaisin rekno kenttään
	}else if(document.getElementById("sukunimi").value.match(/\d/) || document.getElementById("sukunimi").value.match(/[!"#¤%&/()="]/) || document.getElementById("sukunimi").value.length<2){
		ilmo="Sukunimi ei kelpaa!";
		document.getElementById("sukunimi").focus();			
	}else if(document.getElementById("puhelin").value.match(/[A-z]/) || document.getElementById("puhelin").value.length<1){
		ilmo="Puhelinnumero ei kelpaa!";	
		document.getElementById("puhelin").focus();	
	}else if(document.getElementById("sposti").value.search("@")<1 || document.getElementById("sposti").value.length<5){
		ilmo="Sähköposti ei kelpaa!";	
		document.getElementById("sposti").focus();	
	}
	
	if(ilmo!=""){
		document.getElementById("ilmo").innerHTML=ilmo;
		setTimeout(function(){ document.getElementById("ilmo").innerHTML=""; }, 3000); // 3 sekunnin refresh
		return false;
	}else{
		document.getElementById("etunimi").value=siivoa(document.getElementById("etunimi").value);
		document.getElementById("sukunimi").value=siivoa(document.getElementById("sukunimi").value);
		document.getElementById("puhelin").value=siivoa(document.getElementById("puhelin").value);
		document.getElementById("sposti").value=siivoa(document.getElementById("sposti").value);	
		return true;
	}
}

function siivoa(teksti){
	teksti=teksti.replace(/</g, "");//&lt;
	teksti=teksti.replace(/>/g, "");//&gt;	
	teksti=teksti.replace(/'/g, "''");//&apos;
	return teksti;
}

//funktio tietojen lisäämistä varten. Kutsutaan backin POST-metodia ja välitetään kutsun mukana auton tiedot json-stringinä.
function lisaaTiedot(){
	let formData = serialize_form(document.lomake); //Haetaan tiedot lomakkeelta ja muutetaan JSON-stringiksi
	//console.log(formData);
	let url = "asiakkaat";
    let requestOptions = {
        method: "POST", //Lisätään
        headers: { "Content-Type": "application/json" },  
    	body: formData
    };    
    fetch(url, requestOptions)
    .then(response => response.json())
   	.then(responseObj => {
   		//console.log(responseObj);
   		if(responseObj.response==0){
   			document.getElementById("ilmo").innerHTML = "Asiakkaan lisäys epäonnistui.";	
        }else if(responseObj.response==1){ 
        	document.getElementById("ilmo").innerHTML = "Asiakkaan lisäys onnistui.";
			document.lomake.reset(); //Tyhjennetään auton lisäämisen lomake		        	
		}
		setTimeout(function(){ document.getElementById("ilmo").innerHTML=""; }, 3000); // ilmo poistuu 3 s kuluttua
   	})
   	.catch(errorText => console.error("Fetch failed: " + errorText));
}


function varmistaPoisto(asiakas_id, etunimi, sukunimi){
	console.log("Toimii");
	if(confirm("Poista asiakas " + decodeURI(etunimi) + " " + decodeURI(sukunimi) +"?")){ //decodeURI() muutetaan enkoodatut merkit takaisin normaaliksi kirjoitukseksi
		poistaAsiakas(asiakas_id, etunimi, sukunimi);
	}
}

//Poistetaan auto kutsumalla backin DELETE-metodia ja välittämällä sille poistettavan auton id
function poistaAsiakas(asiakas_id, etunimi, sukunimi){
	let url = "asiakkaat?asiakas_id=" + asiakas_id;
    let requestOptions = {
        method: "DELETE"             
    };    
    fetch(url, requestOptions)
    .then(response => response.json())//Muutetaan vastausteksti JSON-objektiksi
   	.then(responseObj => {	
   		//console.log(responseObj);
   		if(responseObj.response==0){
			alert("Asiakkaan poisto epäonnistui.");	        	
        }else if(responseObj.response==1){ 
			document.getElementById("rivi_"+asiakas_id).style.backgroundColor="red";
			alert("Asiakkaan " + decodeURI(etunimi) + " " + decodeURI(sukunimi) +" poisto onnistui.");
			haeAsiakkaat();        	
		}
   	})
   	.catch(errorText => console.error("Fetch failed: " + errorText));
}


