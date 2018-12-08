<?php 
	define("ROOT", $_SERVER['DOCUMENT_ROOT']);
	

	function insert_db($DB, $phone, $msg){
		$keys = array("phone", "msg");
		  // $result = $DB->_insert("test",$keys, $arr);
		$sql =  "INSERT INTO test (phone, msg) VALUES ('$phone', '$msg')";
		$result = $DB->_query($sql);
        if ($result) {
            file_put_contents("log.txt", "ajillaj bna");
        } 
        else {
			file_put_contents("log.txt", "gg");
        }
	}
	function DB($file_path)
	{
		if(!file_exists($file_path))
			throw new Exception("FILE NOT FOUND", 1);
		include($file_path);
		if(!isset($db) OR count($db) == 0)
			throw new Exception("NO CONNECTION SETTINGS WERE FOUND IN THE DATABASE CONFIG FILE");
		require_once(ROOT.'/api/driver.php');
		$DB = new Driver($db);
		$conn = $DB->db_connect();
		if(!$conn){
			throw new Exception("UNABLE TO CONNECT TO THE DATABASE");
		}
		
		$log = file_get_contents("php://input");
		$trigger = json_decode($log);
		file_put_contents("outputfile.txt", json_encode($trigger->properties->phone->value));
		file_put_contents("outputfile2.txt", json_encode($trigger->properties->sms->value));
		$phone = $trigger->properties->phone->value;
		$msg = $trigger->properties->sms->value;
		$arr=array($phone, $msg);
		file_put_contents("outputfile1.txt", $log);
		echo $_SERVER['QUERY_STRING'];
		insert_db($DB, $phone, $msg);
	}
	try{
		DB(ROOT.'/config/database.php');
	}
	catch(Exception $e){
		echo "Caught exception: ", $e->getMessage(), "\n";
	}
?>