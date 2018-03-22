<?php
 header("Cache-Control: no-cache, must-revalidate");
 header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
 header('Content-Type: text/html; charset=UTF-8');
 header("HTTP/1.1 200 OK");
 
 $result=array();
 
 $query=file_get_contents('php://input'); if (!$query) { $query=$HTTP_RAW_POST_DATA; }
 
 if ($vars = json_decode($query))
 {
  if ($vars->login && $vars->passw)
  {
   if ($vars->login == 'demo' && $vars->passw == 'demo')
   {
    $result=array('status'=>'Ok', 'token'=>md5($vars->login.'/'.$vars->passw));
   } else { $result['status']='Incorrect'; }
  } else { $result['status']='Empty'; }
 } else { $result['status']='Err'; }
 
 
 print json_encode($result,true); 
 exit;
?>