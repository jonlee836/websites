<?php

function check_base64_image($img){

  if (base64_decode($img, true)) {return true;}    // You can't 100% check if it's an image, but you can at least check if it's a valid base64
  else                           {return false;}
}

function removeHeaderData($img){

  /*

    This removes the header data that causes it to be un-usable to angularJS.

    before 

    data:image/jpeg;base64,/9j/

    after

    ,/9j/

  */

  $pos = strpos($img, ",", 11);            //$pos is where the comma is after the 11th position in the string 
  $img = substr($img, $pos, strlen($img)); //remove and shift over so you remove trailing whitespaces or spaces in general

  return $img;
}
