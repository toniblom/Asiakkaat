<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<script src="scripts/main.js"></script>
<script src="scripts/io.js"></script>
<link rel="stylesheet" type="text/css" href="css/main.css">
<title>Asiakkaan tietojen muutos</title>
</head>
<body onload="asetaFocus('etunimi')" onkeydown="tutkiKey(event, 'paivita')">
	<form name="lomake">
		<table>
			<thead>
				<tr>
					<th colspan="5" class="oikealle"><a id="linkki" href="listaaasiakkaat.jsp">Takaisin listaukseen</a></th>
				</tr>
				<tr>
					<th>Etunimi</th>
					<th>Sukunimi</th>
					<th>Puhelin</th>
					<th>Sposti</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr>
				<td><input type="text" name="etunimi" id="etunimi" /></td>
				<!-- pid� name ja id samoina kuin tietokannassa-->
				<td><input type="text" name="sukunimi" id="sukunimi" /></td>
				<td><input type="text" name="puhelin" id="puhelin" /></td>
				<td><input type="text" name="sposti" id="sposti" /></td> 
				<td><input type="button" id="tallenna" value="Hyv�ksy" onclick="tutkiJaPaivita()"></td>
			</tr>
			</tbody>
		</table>
		<input type="hidden" name="asiakas_id" id="asiakas_id">
	</form>
	<span id="ilmo"></span>
</body>
<script>
haeAsiakas();
</script>
</html>