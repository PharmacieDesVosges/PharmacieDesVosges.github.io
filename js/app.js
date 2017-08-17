var ctrlr = angular.module('ctrlr',[
    'view_pro',
    'sliderMP',
    'sliderMM'
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
	templateUrl:'template/slideshow/mapharma.html'
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