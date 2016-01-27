jQuery.gitUser = function (username, callback) {
        jQuery.getJSON('https://api.github.com/users/' + username + '/repos?per_page=100&callback=?', callback) //Change per_page according to your need.
    }

    jQuery.fn.loadRepositories = function (username) {
        this.html("<h2 style=\"color:#FFF;\">Hold on tight, digging out " + username + "'s repositories...</h2><br>");

        var target = this;
        $.gitUser(username, function (data) {
        var repos = data.data; // JSON Parsing
        //alert(repos.length); Only for checking how many items are returned.
        sortByForks(repos); //Sorting by forks. You can customize it according to your needs.
        var list = $('<dl/>');
        target.empty().append(list);
        $(repos).each(function () {
            checkfork = this.fork;
            if ((this.name != (username.toLowerCase() + '.github.io')) && (checkfork != true)) { //Check for username.github.com repo and for forked projects
                list.append('<dt><a style="font-size:20px;" href="' + (this.homepage ? this.homepage : this.html_url) + '">' + this.name + '</a><em> - ' + (this.language ? ('(' + this.language + ')') : '') + '</em><br>Forks: ' + this.forks + ' | Watchers: ' + this.watchers + '</dt>');
                //Similarly fetch everything else you need.
            }
        });
        });

        function sortByForks(repos) {
        repos.sort(function (a, b) {
            return b.forks - a.forks; //Descending order for number of forks based sorting.
        });
        }
    };

    function funcionPost() {
        /*
                         var xhttp = new XMLHttpRequest();
                        xhttp.open("POST", "php/testapi.php", true);
                        xhttp.send();
                        */

                       /* 
                var data = {'action': 'follow', 'userid': '11239528343'};
                $.post("testapi.php",
                    data,
                    function(response,status){
                    alert("Status : " + status);
                });
*/

        
        $.ajax({
            url: 'http://albertoed.github.io/testapi.php',
            type: 'POST',
            data: {'action': 'follow', 'userid': '11239528343'},
            success:function(result, status) {
                        if(result == "ok") {
                            console.log("Status : " + status);
                            console.log("Result : " + result);
                        }
                    },
            error: function(xhr, desc, err) {
                        console.log(xhr);
                        console.log("Details: " + desc + "\nError:" + err);
                    }
        }); // end ajax call   


    };

