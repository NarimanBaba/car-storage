let cars = [];
let carBrands = [];
let selectBrands = $("#brands");
let selectCar = $("#cars");
let findBtn = $("#find");

  
let car = function(Brand, Model, Price, Path) {
      (this.brand = Brand),
      (this.model = Model),
      (this.price = Price),
      (this.path = Path);
  };


let addBrands = brd => {
    let isExist = false;
    for (let i = 0; i <= carBrands.length; i++) {
      if (carBrands[i] === brd) {
        isExist = true;
        break;
      }
    }
    if (!isExist) {
      carBrands.push(brd);
    }
    return carBrands;
  };


let addValuesToOptions = (selectorName,value,appendArea) => {
   let isExist = false;
   $(selectorName).each(function(){
    if($(this).val() === value){
        isExist=true;
        return;
    }
   })
    if(!isExist){
        appendArea.append("<option value="+value+">"+value+"</option>");
    }
    return appendArea;
   }


   let validateTextInputs = (textInputs) => {
     let yesError = false;
       for(let textInput of textInputs){
        if(textInput.val().split(' ').join('').length < 2){
         
          textInput.next().text("Inputs length must be minimum two character!!");
         
          yesError = true;
        }
        else{
          textInput.next().text("");
          
          yesError = false;
        }
      }
      return yesError;
    }


   let validateNumberInput = (priceInput) => {
     let yesError = false;
    if(isNaN(priceInput.val()) || priceInput.val()<0 || priceInput.val().length < 1){
      priceInput.next().text("Type must be number and number must be greater than 0!! ");
     
      
      yesError = true;

    }
    else{
      yesError = false;
      priceInput.next().text("");
     

    }
    return yesError;
   }


   let validateFileInput = (fileInput) => {
     let yesError = false;
      if(fileInput.val() == ""){
        fileInput.next().text("Type must be number and number must be greater than 0!! ");
        
        fileInput.next().css("color","red");
        yesError = true;
      }
      else{
        yesError = false;
        fileInput.next().text("");
        
  
      }
      return yesError;
   }



$(document).ready(function(){
  
    let form = $("#form");
    form.submit(function(e){
        e.preventDefault();

        let carBrand = $("#brandInput");
        let carModel = $("#modelInput");
        let carPrice = $("#priceInput");
        let carImagePath = $("#imageInput");


        validateTextInputs([carBrand,carModel]);
        validateNumberInput(carPrice);
        validateFileInput(carImagePath);


        if((validateTextInputs([carBrand,carModel])||validateNumberInput(carPrice)||validateFileInput(carImagePath)) === true){
          
        }
        else{
          
          let carObj = new car(carBrand.val(),carModel.val(),carPrice.val(),carImagePath.val());
          cars.push(carObj);
          for(let car of cars){
              addBrands((car.brand));
          }
          for(let brand of carBrands){
           addValuesToOptions(".brands option",brand,selectBrands);
          }
   
   
           selectBrands.change(function(){
           selectCar.empty();
           selectCar.append('<option value="Alls">Select car</option>');
           let selectedBrand = cars.filter(car => car.brand === $(this).val());
           for(selected of selectedBrand){
               addValuesToOptions(".cars option",selected.model,selectCar);
          }
           })
          
        }
            
       
    })

       findBtn.click(function(e){
           e.preventDefault();
        $('#card-area').empty();
           let selectedModel = cars.filter(car => car.model === selectCar.val());
           for(let model of selectedModel){
                let column = $("<div class='col-lg-3'></div>")
                var mainDiv = $("<div class='card' style='max-width: 100%;'></div>")
                var img = $('<img src="img/'+model.path.slice(12)+'" class="card-img-top" alt="image">');
                var secDiv = $("<div class='card-body'></div>");
                var h5 = $('<h5 class="card-title">' + model.model + '</h5>');
                var p = $('<p class="card-text">' + model.price+"AZN" + '</p>');
               

                secDiv.append(h5);
                secDiv.append(p);
                

                mainDiv.append(img);
                mainDiv.append(secDiv);

                column.append(mainDiv);

                $('#card-area').append(column);
           }
       })
       
    })