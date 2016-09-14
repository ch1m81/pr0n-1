<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/user/{id}','UserController@show')->middleware(['jwt.auth', 'jwt.refresh']);

Route::get('/articles','ArticleController@getAll')->middleware(['jwt.auth']);

Route::get('/test', function () {
    
		
		$row = 1;
		if (($handle = fopen("http://partners.xhamster.com/2export.php?ch=!.150.189.151.152.190.153.191.154.155.192.156.193.194.217.106.157.195.158.196.159.160.161.162.163.164.165.197.166.115.167.168.198.169.170.171.199.141.200.172.201.202.173.174.175.203.80.177.178.179.180.204.205.181.206.207.218.208.82.182.209.210.183.211.184.212.131.185.214.186.187.216.188&pr=1&tcnt=1&url=off&em=1&dlm=%7C&vid=on&ttl=on&chs=on", "r")) !== FALSE) {
			while (($data = fgetcsv($handle, 1000, "|")) !== FALSE) {
				$num = count($data);
				echo "<p> $num fields in line $row: <br /></p>\n";
				$row++;
				for ($c=0; $c < $num; $c++) {
						echo $data[$c] . ";";
				}
				
				echo "<br />\n";
			}
			fclose($handle);
		}
				
		
		
		
		return "aaaaa";
});

Route::get('/', function () {
    return view('welcome');
});

// Log user in
Route::post('/login', 'UserController@logMeIn');// Log user in
