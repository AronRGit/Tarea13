let app = angular.module('facturaApp', [])
  app.controller('facturaCtrl', function($scope) {
    $scope.tarifaBase = 250;
    $scope.tarifaPorKmExtra = 30;
    $scope.tarifaPorKmExtra1000 = 20;
    $scope.limiteParaTarifaBase = 300;
    $scope.limiteParaTarifaExtra1000 = 1000;
    $scope.limiteParaDescuento = 500;
    $scope.porcentajeDescuento = 0.1;

    $scope.importeAPagar = function() {
      
      let distanciaRecorrida = $scope.distanciaRecorrida || 0;

      if (distanciaRecorrida <= $scope.limiteParaTarifaBase) {
        return $scope.tarifaBase;
      } else if (distanciaRecorrida <= $scope.limiteParaTarifaExtra1000) {
        return $scope.tarifaBase + ($scope.tarifaPorKmExtra * (distanciaRecorrida - $scope.limiteParaTarifaBase));
      } else {
        return $scope.tarifaBase + ($scope.tarifaPorKmExtra * ($scope.limiteParaTarifaExtra1000 - $scope.limiteParaTarifaBase)) + ($scope.tarifaPorKmExtra1000 * (distanciaRecorrida - $scope.limiteParaTarifaExtra1000));
      }
    };

    $scope.descuento = function() {
      let importeAPagar = $scope.importeAPagar();
      if (importeAPagar > $scope.limiteParaDescuento) {
        return importeAPagar * $scope.porcentajeDescuento;
      } else {
        return 0;
      }
    };

    $scope.totalAPagar = function() {
      return $scope.importeAPagar() - $scope.descuento();
    };
  });
