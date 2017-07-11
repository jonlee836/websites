<?php

ini_set("upload_max_filesize", "10M"); // to avoid anyone can send a largee file
ini_set("post_max_size", "11M");

define("MAX_IMGSIZE", 10000000);
define("UPLOAD_DIR", (realpath("../uploads")).DIRECTORY_SEPARATOR);

require_once("base64_check.php");

$errors = [];
if(!empty($_POST["img"]) && !empty($_POST["imgsize"]) && !empty($_POST["imgname"]) && !empty($_POST["filter"])){
  // or extract($_POST);  
  $img = $_POST["img"];
  $imgsize = intval($_POST["imgsize"]);
  $imgname = htmlentities(trim($_POST["imgname"]));

  $filter  = htmlentities($_POST["filter"]);

  $img = removeHeaderData($img); // Gets rid of the extra quotes around the base64 string.

  if(strlen($imgname) == 0)         {$errors[] = ["Error 54", "Image filename is empty"];}         // Check if name empty
  else if(check_base64_image($img)) {$errors[] = "Uploaded image is not valid!";}                  // Check if Base64 so no malicious input from user
  else if($imgsize >= MAX_IMGSIZE)  {$errors[] = sprintf("Uploaded image is too large! Maximum wieght is : %s Kb", MAX_IMGSIZE/1000);} // size check
  else if(is_dir(UPLOAD_DIR))       {file_put_contents(UPLOAD_DIR . "${imgname}" , base64_decode($img));} // original name + time
  
  else{$errors[] = ["Error 42", "Upload dir does not exists"];}
}
else {$errors[] = "Filter and Image are required, please complete the form!";}

// 	    __________  ____  ____  ____  _____
// 	   / ____/ __ \/ __ \/ __ \/ __ \/ ___/
// 	  / __/ / /_/ / /_/ / / / / /_/ /\__ \ 
// 	 / /___/ _, _/ _, _/ /_/ / _, _/___/ / 
// 	/_____/_/ |_/_/ |_|\____/_/ |_|/____/  
// 	                                       

if(count($errors)) // check first system error, and shift them
  {
    foreach($errors as $ie => $e)
      {
	if(is_array($e)) // system error, do not show in front for security
	  {
	    error_log($e[0]);
	    unset($errors[$ie]);
	  }
      }

    if(count($errors)) // if staying errors, inform the user
      exit(json_encode($errors));
  }
?>
