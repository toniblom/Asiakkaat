function serialize_form(form){
	return JSON.stringify(
	    Array.from(new FormData(form).entries())
	        .reduce((m, [ key, value ]) => Object.assign(m, { [key]: value }), {})
	        );	
}


//funktio arvon lukemiseen urlista avaimen perusteella
function requestURLParam(sParam){
    let sPageURL = window.location.search.substring(1);
    let sURLVariables = sPageURL.split("&");
    for (let i = 0; i < sURLVariables.length; i++){
        let sParameterName = sURLVariables[i].split("=");
        if(sParameterName[0] == sParam){
            return sParameterName[1];
        }
    }
}

//Tutkitaan lisättävät tiedot ennen niiden lähettämistä backendiin
function tutkiJaLisaa(){
	if(tutkiTiedot()){
		lisaaTiedot();
	}
}

//Tutkitaan päivitettävät tiedot ennen niiden lähettämistä backendiin
function tutkiJaPaivita(){
	if(tutkiTiedot()){
		paivitaTiedot();
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
	teksti=teksti.replace(/;/g, "");
	teksti=teksti.replace(/'/g, "''");//&apos;
	return teksti;
}
function varmistaPoisto(asiakas_id, etunimi, sukunimi){
	console.log("Toimii");
	if(confirm("Poista asiakas " + decodeURI(etunimi) + " " + decodeURI(sukunimi) +"?")){ //decodeURI() muutetaan enkoodatut merkit takaisin normaaliksi kirjoitukseksi
		poistaAsiakas(asiakas_id, etunimi, sukunimi);
	}
}

function asetaFocus(target){
	document.getElementById(target).focus();	
}

//Funktio Enter-nappiin. Kutsu bodyn onkeydown()-metodista.
function tutkiKey(event, target){	
	if(event.keyCode==13){//13=Enter
		if(target=="listaa"){
			haeAsiakkaat();
		}else if(target=="lisaa"){
			tutkiJaLisaa();
		}else if(target=="paivita"){
			tutkiJaPaivita();
		}
	}else if(event.keyCode==113){//F2
		document.location="listaaasiakkaat.jsp";
	}		
}


