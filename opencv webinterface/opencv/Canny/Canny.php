<?php

$imgname = $_POST["FileName"];
$cannyThresh = $_POST["Thresh"];

$inputDir = "../../uploads/" . $imgname;
$outputDir = "../../processed/" . $imgname;

$Canny = "./Canny " . $inputDir . " " . $outputDir . " " . $cannyThresh;
$runExec = exec ($Canny, $out);

$type = pathinfo($outputDir, PATHINFO_EXTENSION);

$data = file_get_contents($outputDir);
$base64 = "data:image/" . $type . ";base64," . base64_encode($data);

echo "$base64";

?>