var repos, repoTemplate, iframe;
var username = "quinkennedy";
var useCache = true;

var initialize = function(){
  iframe = $("#iframe");
	console.log("initialize");
  var getInfoURL = useCache ? "stale_github_info.json" : ("https://api.github.com/users/"+username+"/repos");
	$.ajax(getInfoURL, {
		complete:function(){console.log("complete repo request");},
		success:gotRepos,
		error:function(){console.error("error during repo request"); console.error(arguments);}
	});
	getTemplateAjax("repo_links.handlebars", gotRepoTemplate);
};

$(document).ready(initialize);

//sort by updated_at?
//also sort by fork
//link to custom pages if they have gh_pages branch
//  maybe try for some handlebars file to make things pretty
//  and default to iframe
//otherwise to some landing page.

var gotRepos = function(response){
	console.log("got repos");
	if (useCache && typeof(response) === "string"){
		response = JSON.parse(response);
	}
	repos = response;
	useRepoTemplate();
};

var gotRepoTemplate = function(template){
	repoTemplate = Handlebars.compile(template);
	useRepoTemplate();
};

var useRepoTemplate = function(){
	if (repoTemplate && repos){
		var htmlResult = repoTemplate({repositories:repos});
		$("#nav .content").html(htmlResult);
		$("#frame .nav .content").html(htmlResult);
	}
};

var repoHasPages = function(index){
	var curr = repos[index];
	if (curr.has_gh_pages == undefined){
		curr.has_gh_pages =
				($(curr.branches_info)
						.filter(function(i, e){return (e.name === "gh-pages");}).length > 0);
	}
	return curr.has_gh_pages;
};

var clickedRepo = function(index){
	if (repos[index].branches_info){
		if (repoHasPages(index)){
			iframe.css("display", "block");
			iframe.prop("src", "http://"+username+".github.com/"+repos[index].name+"/index.html");
		} else {
			iframe.css("display", "block");
			iframe.prop("src", "http://raw.github.com/"+username+"/"+repos[index].name+"/"+repos[index].default_branch+"/README.md");
			//TODO: get the markdown and then use api.github.com/markdown/raw to get the html and put it in a div
		}
		document.body.appendChild(frame);
	} else {
		//we need to fetch the info from G.H.
		//the callback is back to this function because the second time
		//  we should have branches_info populated
		//TODO: handle error...
		getBranches(index, repos[index], clickedRepo.bind(this, index));
	}
};

var outstandingResponses = 0;

var getBranches = function(index, element, callback){
	callback = callback || function(){};
	$.ajax(element.branches_url.substr(0, element.branches_url.length - "{/branch}".length),{
		success:function(response){
			repos[index].branches_info = response;
			callback();
		},
		error:function(){console.error("error during branch request"); console.error(arguments);}
	});
	outstandingResponses++;
};

/**
 * Load handlebars templates from external files
 */
getTemplateAjax = function(path, callback) {
    $.ajax({
        url: path,
        dataType: "html",
        cache: false,
        success: callback
    });
};