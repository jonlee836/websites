<?php

$imgname = $_POST["FileName"];

$inputDir = "../../uploads/" . $imgname;
$outputDir = "../../processed/" . $imgname;

$MakeGray = "./makegray " . $inputDir . " " . $outputDir;
$runExec  = exec($MakeGray, $out);

$type = pathinfo($outputDir, PATHINFO_EXTENSION);

$data = file_get_contents($outputDir);
$base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);

echo "$base64";

?>