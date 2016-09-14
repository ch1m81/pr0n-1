<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\Article;

class ArticleController extends Controller
{
	public function getAll() {
		return Article::paginate(10);
	}
}
