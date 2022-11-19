<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<script src="scripts/main.js"></script>
<title>Insert title here</title>
<style>

table, th, td {
	border: 1px solid grey;
}

table {
	border-collapse: collapse;
	font-family: sans-serif;
}

thead {
	background-color: green;
}

th {
	color: white;
	text-align: left;
}

th, td {
	padding: 5px;
}

#kentta1 {
	text-align: right;
}

tr:nth-child(even) {
	background-color: #f2f2f2;
}

#tokarivi {
	background-color: green;
}

</style>
</head>
<body>
<table id="listaus">
	<thead>	
		<tr>
			<th colspan="2" id="kentta1">Hakusana:</th>
			<th><input type="text" id="hakusana"></th>
			<th><input type="button" value="Hae" id="hakunappi" onclick="haeAsiakkaat()"></th>
		</tr>		
		<tr id="tokarivi">
			<th>Etunimi</th>
			<th>Sukunimi</th>
			<th>Puhelin</th>
			<th>Sposti</th>
		</tr>
	</thead>
	<tbody id="tbody">
	</tbody>
</table>
<span id="ilmo"></span>
<script>
haeAsiakkaat();
</script>
</body>
</html>