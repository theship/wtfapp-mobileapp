/**
 * Created by Rony on 14/02/2015.
 */


wtf.controller('rulistctrl', ['$scope', 'rulistservice', function($scope, rulistservice) {

    $scope.data = {};
    $scope.data.showSearch = true;

    $scope.clearSearch = function() {
        $scope.data.searchQuery = '';
    };

    $scope.clearSearch = function() {
        $scope.data.searchQuery = '';
    };
	
	$scope.clickRU = function(ruID){
		console.log(ruID); //TODO Load the detailed view
    }

	$scope.fbLogin = function() {
		openFB.login(
        function(response) {
            if (response.status === 'connected') {
                console.log('Login Facebook reussie !');
				openFB.api({path: '/me/friends',
					success: function(nb) {
						console.log(nb);
					},
					error: function() {alert('Impossible de r�cup�rer la liste d\'amis');}});
                $scope.closeLogin();
            } else {
                alert('Login Facebook impossible...');
            }
        },
        {scope: 'email,user_friends'});
	}

    rulistservice.getrulist().then(function(result){
        console.log(result);
        $scope.rulist = result.data;
        rulistservice.getPosition().then(function(coord){
            console.log(coord);
            rulistservice.getrulist(coord.latitude,coord.longitude).then(function(result){
                var data2 =  result.data.map(function(val){
                    console.log(val);
                    val.distance = Math.round(val.distance * 6378.137);
                    return val ;
                });
                $scope.rulist = data2;
                $scope.msg = "Voici les RUs près de vous";
            });
        });
    },function(e){
        $scope.msg = "Impossible de se connecter pour récupérer la liste des restaurants";
        $scope.rulist = []
        
    });

}]);