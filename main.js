'use strict';

var myApp = angular.module("AngTest", [
 'AngTest.controllers', 'ngCookies'
]);


angular.module('AngTest.controllers',[]).controller('LogForm',['$scope','$http','$cookies','$cookieStore',function($scope,$http,$cookies,$cookieStore) {
 $scope.formLogin={};

 $scope.token=$cookieStore.get('auth');
 
 $scope.logout = function()
 {
  $scope.warningmessage='Досвидания. Разлогинились';
  $scope.token='';
  $cookieStore.put('auth','');
 }
 
 $scope.isEven = function(msg)
 {
  if (msg) { return true; }
  else { return false; }
 }
 
 $scope.saveData = function() 
 {
  if ($scope.formLogin.login && $scope.formLogin.passw) {

  $scope.loading=1;
   $http({method: 'POST', url: './login.php', data: $scope.formLogin}).then(function(response) {
    $scope.loading='';
    if (response.data['status'] == 'Ok')
    {
     $scope.warningmessage='Авторизация успешно пройдена!';
     $scope.token=response.data['token'];
     $cookieStore.put('auth',response.data['token']);
    }

    if (response.data['status'] == 'Incorrect') { $scope.warningmessage='Укажите demo/demo для входа'; }
    if (response.data['status'] == 'Empty') { $scope.warningmessage='Пустые данные'; }
    if (response.data['status'] == 'Err') { $scope.warningmessage='Не переданны данные'; }
  
   }, function(error) {
    $scope.loading='';
    $scope.formLogin.warning_message='Не переданны данные';
   });
   
   
  }


 };

}]);
