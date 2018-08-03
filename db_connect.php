<?php
	$db_hostname = "hostname";
	$db_database = "database";
	$db_username = "username";
	$db_password = "password";

	try
	{
		$connection = new PDO("mysql:host=$db_hostname; dbname=$db_database", $db_username, $db_password);
		$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
	catch (PDOException $e)
	{
		echo "Connection Failed: " . $e->getMessage();
	}
?>