var ctrlr = angular.module('ctrlr',[
    'view_pro',
    'sliderMP',
    'sliderMM',
    'dtApp'
]);

var view_pro = angular.module('view_pro', ['ngRoute']);

view_pro.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/MaPharmacie', {
                templateUrl: 'template/mapharmacie.html'
            })
            .when('/Equipe', {
                templateUrl: 'template/equipe.html'
            })
            .when('/ServicesetCompetences', {
                templateUrl: 'template/servicescompetences.html'
            })
            .when('/Plan', {
                templateUrl: 'template/plan.html'
            })
            .when('/Accueil', {
                templateUrl: 'template/accueil.html'
            })
            .when('/SamediOuvert',{
                templateUrl: 'template/calendrier.html'
            })
            .when('/MaterielMedical',{
                templateUrl: 'template/materielmedical.html'
            })        
            .otherwise({
                redirectTo: '/Accueil'
            });
}]);

var sliderMP = angular.module('sliderMP',['ngAnimate']);

sliderMP.controller('SliderControllerMP', function($scope) {
    $scope.images=[{src:'ext01.jpg',
                    title:'Pic 1'},
                   {src:'ext02.jpg',
                    title:'Pic 2'},
                   {src:'ext03.jpg',
                    title:'Pic 3'},
                   {src:'int01.jpg',
                    title:'Pic 4'},
                   {src:'int02.jpg',
                    title:'Pic 5'}]; 
});
 
sliderMP.directive('slider', function ($timeout) {
  return {
    restrict: 'AE',
	replace: true,
	scope:{
		images: '='
	},
    link: function (scope, elem, attrs) {
	
		scope.currentIndex=0;

		scope.next=function(){
			scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
		};
		
		scope.prev=function(){
			scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
		};
		
		scope.$watch('currentIndex',function(){
			scope.images.forEach(function(image){
				image.visible=false;
			});
			scope.images[scope.currentIndex].visible=true;
		});
		
		/* Start: For Automatic slideshow*/
		
		var timer;
		
		var sliderFunc=function(){
			timer=$timeout(function(){
				scope.next();
				timer=$timeout(sliderFunc,2500);
			},2500);
		};
		
		sliderFunc();
		
		scope.$on('$destroy',function(){
			$timeout.cancel(timer);
		});
		
		/* End : For Automatic slideshow*/
		
    },
	templateUrl:'template/slideshow/slide_acc.html'
  }
});

var sliderMM = angular.module('sliderMM',['ngAnimate']);

sliderMM.controller('SliderControllerMM', function($scope) {
    $scope.images=[{src:'mat01.jpg',
                    title:'Pic 1'},
                   {src:'mat02.jpg',
                    title:'Pic 2'},
                   {src:'mat03.jpg',
                    title:'Pic 3'}]; 
});
 
sliderMM.directive('slidermat', function ($timeout) {
  return {
    restrict: 'AE',
	replace: true,
	scope:{
		images: '='
	},
    link: function (scope, elem, attrs) {
	
		scope.currentIndex=0;

		scope.next=function(){
			scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
		};
		
		scope.prev=function(){
			scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
		};
		
		scope.$watch('currentIndex',function(){
			scope.images.forEach(function(image){
				image.visible=false;
			});
			scope.images[scope.currentIndex].visible=true;
		});
		
		/* Start: For Automatic slideshow*/
		
		var timer;
		
		var sliderFunc=function(){
			timer=$timeout(function(){
				scope.next();
				timer=$timeout(sliderFunc,2500);
			},2500);
		};
		
		sliderFunc();
		
		scope.$on('$destroy',function(){
			$timeout.cancel(timer);
		});
		
		/* End : For Automatic slideshow*/
		
    },
	templateUrl:'template/slideshow/materiel.html'
  }
});

var dtApp = angular.module('dtApp', []);

dtApp.controller('dateController', function ($scope, $filter) {
        var str_year = $filter('date')(new Date(),'yyyy');
        var str_month = $filter('date')(new Date(),'M');
        var str_day = $filter('date')(new Date(),'d');
        var name_day = $filter('date')(new Date(),'EEEE');
        var year = parseInt(str_year);
        var month = parseInt(str_month)-1;
        var day = parseInt(str_day);
        if(year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
            // Leap year
            var feb = 29;
        }
        else {
            // Not a leap year
            var feb = 28;
        }
        var aggregateMonths = [0, // January
                               31, // February
                               31 + feb, // March
                               31 + feb + 31, // April
                               31 + feb + 31 + 30, // May
                               31 + feb + 31 + 30 + 31, // June
                               31 + feb + 31 + 30 + 31 + 30, // July
                               31 + feb + 31 + 30 + 31 + 30 + 31, // August
                               31 + feb + 31 + 30 + 31 + 30 + 31 + 31, // September
                               31 + feb + 31 + 30 + 31 + 30 + 31 + 31 + 30, // October
                               31 + feb + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31, // November
                               31 + feb + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30, // December
                              ];
        var ntd = aggregateMonths[month]+day;
        var c_day = 1;
        if (name_day=='Friday' || name_day=='Saturday' || name_day=='Sunday' ){var nb_week = 0;}
        else {var nb_week = 1;}
        while(c_day < ntd){
            var c_name_day = $filter('date')(new Date(new Date().getFullYear(),0,c_day),'EEEE');
            if (c_name_day == 'Thursday'){
                nb_week = nb_week+1;
            }
            c_day = c_day+1;
        }
        //calcule samedi de la semaine
        if (name_day=='Saturday'){
            ntd = -1;    
        }
        else{
            if (name_day == 'Sunday'){
                ntd = ntd + 6;
            }
            if (name_day == 'Monday'){
                ntd = ntd + 5;
            }
            if (name_day == 'Tuesday'){
                ntd = ntd + 4;
            }
            if (name_day == 'Wednesday'){
                ntd = ntd + 3;
            }
            if (name_day == 'Thursday'){
                ntd = ntd + 2;
            }
            if (name_day == 'Friday'){
                ntd = ntd + 1;
            }
        }
        if(ntd>0){
            var date_samedi = "le "+$filter('date')(new Date(new Date().getFullYear(),0,ntd),'d/M/y');
        }
        else{
            var date_samedi = "aujourd'hui"
        }
        if (nb_week % 2 == 0){
            $scope.result = "Ouverte";
        }
        else{
            $scope.result = "Fermée";
        }
        $scope.sam_date = date_samedi;

    });