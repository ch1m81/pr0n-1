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
    
		
		//$inputCsv = Reader::createFromPath('http://partners.xhamster.com/2export.php?ch=!.150.189.151.152.190.153.191.154.155.192.156.193.194.217.106.157.195.158.196.159.160.161.162.163.164.165.197.166.115.167.168.198.169.170.171.199.141.200.172.201.202.173.174.175.203.80.177.178.179.180.204.205.181.206.207.218.208.82.182.209.210.183.211.184.212.131.185.214.186.187.216.188&pr=2&tcnt=2&url=on&dlm=%7C&tl=on&vid=on&ttl=on&chs=on&sz=on');
		//$inputCsv = Reader::createFromPath('http://pornoesel.com/html/a.csv');
		//$reader = Reader::createFromString( 'http://partners.xhamster.com/2export.php?ch=!.150.189.151.152.190.153.191.154.155.192.156.193.194.217.106.157.195.158.196.159.160.161.162.163.164.165.197.166.115.167.168.198.169.170.171.199.141.200.172.201.202.173.174.175.203.80.177.178.179.180.204.205.181.206.207.218.208.82.182.209.210.183.211.184.212.131.185.214.186.187.216.188&pr=2&tcnt=2&url=on&dlm=%7C&tl=on&vid=on&ttl=on&chs=on&sz=on');
		
		
		/*$reader = Reader::createFromPath('http://partners.xhamster.com/2export.php?ch=!.150.189.151.152.190.153.191.154.155.192.156.193.194.217.106.157.195.158.196.159.160.161.162.163.164.165.197.166.115.167.168.198.169.170.171.199.141.200.172.201.202.173.174.175.203.80.177.178.179.180.204.205.181.206.207.218.208.82.182.209.210.183.211.184.212.131.185.214.186.187.216.188&pr=2&tcnt=2&url=on&dlm=%7C&tl=on&vid=on&ttl=on&chs=on&sz=on');
		$reader->setDelimiter('|');
		foreach ($reader as $index => $row) {
				//do something meaningful here with $row !!
				//$row is an array where each item represent a CSV data cell
				//$index is the CSV row index
				
				print_r($row);
		}*/
		
		//print_r($reader);
		
		//$row = $reader->fetchOne(1);
		
		/*$row = 1;
		if (($handle = fopen("http://partners.xhamster.com/2export.php?ch=!.150.189.151.152.190.153.191.154.155.192.156.193.194.217.106.157.195.158.196.159.160.161.162.163.164.165.197.166.115.167.168.198.169.170.171.199.141.200.172.201.202.173.174.175.203.80.177.178.179.180.204.205.181.206.207.218.208.82.182.209.210.183.211.184.212.131.185.214.186.187.216.188&pr=2&tcnt=2&url=on&dlm=%7C&tl=on&vid=on&ttl=on&chs=on&sz=on", "r")) !== FALSE) {
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
				
		*/
		//$inputCsv->setEncodingFrom('ISO-8859-15');
		//we limit the output to max. 10 rows
		//$inputCsv->setLimit(10);
		//$res = json_encode($inputCsv, JSON_PRETTY_PRINT|JSON_HEX_QUOT|JSON_HEX_TAG|JSON_HEX_AMP|JSON_HEX_APOS);
		
		Excel::load('http://partners.xhamster.com/2export.php?ch=!.150.189.151.152.190.153.191.154.155.192.156.193.194.217.106.157.195.158.196.159.160.161.162.163.164.165.197.166.115.167.168.198.169.170.171.199.141.200.172.201.202.173.174.175.203.80.177.178.179.180.204.205.181.206.207.218.208.82.182.209.210.183.211.184.212.131.185.214.186.187.216.188&tcnt=1&rt=2&url=on&dlm=%7C&tl=on&vid=on&tmbp=on&ttl=on&chs=on', function($reader) {

    // reader methods

		});
		
		
		
		
		//print_r($row);
});

Route::get('/', function () {
    return view('welcome');
});

// Log user in
Route::post('/login', 'UserController@logMeIn');// Log user in
