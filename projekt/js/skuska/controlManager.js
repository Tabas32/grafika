function addCargo() {
    var width = document.getElementById('cargoWidth').value;
    var height = document.getElementById('cargoHeight').value;

    createCargo(width, height);  
    unloadCargo();
}
