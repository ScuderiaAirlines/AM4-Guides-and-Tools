


function spybasedata() {
  var allname = document.getElementById('aname').value;
  //console.log(allname);
  var allnameP = allname;
  sessionStorage.setItem("getallname", allnameP);

  var request = new XMLHttpRequest()
  request.open('GET', "https://cors-anywhere.herokuapp.com/https://www.airline4.net/api/?access_token=JKJHkjhkSDHFGKSFDHKWerHGsbv.783KJhSLSKsdjfhskejfhskjjjhHHHllkihgHJKlSBmBNMVvxGAgdgh&search="+allname, true)
    request.onload = function() {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response)
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      document.getElementById("rank").innerHTML = data.alliance[0].rank;
      document.getElementById("val").innerHTML = '$'+data.alliance[0].value;
      document.getElementById("mem").innerHTML = data.alliance[0].members+'/60';
      
      //document.getElementById("fleet").innerHTML = data.fleet.length;
      //console.log(data.members[0].contributed);
      

      let arrayCont = data.members.map(a => a.contributed);
      var sum = arrayCont.reduce((a, b) => a + b);
      var avgCont = sum/60;

      document.getElementById("sum").innerHTML = formatter.format(sum);
      document.getElementById("avg").innerHTML = formatter.format(avgCont);

      //console.log(data.alliance[0].rank);

    
      //function fleet() {
          //for (var i=0; i<data.fleet.length; i++) {
              //var fleet = document.getElementById("fleet").createElement("p");
              //var ac = data.fleet[j].aircraft;
              //fleet.appendChild(ac);
        //}
      //}
    
      
    }
    
    request.send()
    
}

function spytop10() {
  var allnameP = sessionStorage.getItem("getallname");
  //console.log(allnameP);
  //var allname2 = allname;
  //console.log(allname);
  var request = new XMLHttpRequest()
  request.open('GET', "https://cors-anywhere.herokuapp.com/https://www.airline4.net/api/?access_token=JKJHkjhkSDHFGKSFDHKWerHGsbv.783KJhSLSKsdjfhskejfhskjjjhHHHllkihgHJKlSBmBNMVvxGAgdgh&search="+allnameP, true)
    request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    
    var timeStamp_value = [data.members[0].joined, data.members[1].joined, data.members[2].joined, data.members[3].joined, data.members[4].joined, data.members[5].joined, data.members[6].joined, data.members[7].joined, data.members[8].joined, data.members[9].joined];
    var timerec = timeStamp_value.map(x => x*1000);
    var theDate0 = new Date(timerec[0]);
    var theDate1 = new Date(timerec[1]);
    var theDate2 = new Date(timerec[2]);
    var theDate3 = new Date(timerec[3]);
    var theDate4 = new Date(timerec[4]);
    var theDate5 = new Date(timerec[5]);
    var theDate6 = new Date(timerec[6]);
    var theDate7 = new Date(timerec[7]);
    var theDate8 = new Date(timerec[8]);
    var theDate9 = new Date(timerec[9]);
    var fdate = [theDate0, theDate1, theDate2, theDate3, theDate4, theDate5, theDate6, theDate7, theDate8, theDate9];
    //var dateString = fdate.toGMTString();
    //console.log(fdate);



    document.getElementById("name0").innerHTML = data.members[0].company;
    document.getElementById("sv0").innerHTML = formatter.format(data.members[0].shareValue);
    document.getElementById("flights0").innerHTML = data.members[0].flights;
    document.getElementById("cont0").innerHTML = formatter.format(data.members[0].contributed);
    document.getElementById("join0").innerHTML = fdate[0]; 
    document.getElementById("cpf0").innerHTML = formatter.format(data.members[0].contributed/data.members[0].flights); 

    document.getElementById("name1").innerHTML = data.members[1].company;
    document.getElementById("sv1").innerHTML = formatter.format(data.members[1].shareValue);
    document.getElementById("flights1").innerHTML = data.members[1].flights;
    document.getElementById("cont1").innerHTML = formatter.format(data.members[1].contributed);
    document.getElementById("join1").innerHTML = fdate[1]; 
    document.getElementById("cpf1").innerHTML = formatter.format(data.members[1].contributed/data.members[1].flights); 

    document.getElementById("name2").innerHTML = data.members[2].company;
    document.getElementById("sv2").innerHTML = formatter.format(data.members[2].shareValue);
    document.getElementById("flights2").innerHTML = data.members[2].flights;
    document.getElementById("cont2").innerHTML = formatter.format(data.members[2].contributed);
    document.getElementById("join2").innerHTML = fdate[2]; 
    document.getElementById("cpf2").innerHTML = formatter.format(data.members[2].contributed/data.members[2].flights); 
    
    document.getElementById("name3").innerHTML = data.members[3].company;
    document.getElementById("sv3").innerHTML = formatter.format(data.members[3].shareValue);
    document.getElementById("flights3").innerHTML = data.members[3].flights;
    document.getElementById("cont3").innerHTML = formatter.format(data.members[3].contributed);
    document.getElementById("join3").innerHTML = fdate[3];
    document.getElementById("cpf3").innerHTML = formatter.format(data.members[3].contributed/data.members[3].flights); 
    
    document.getElementById("name4").innerHTML = data.members[4].company;
    document.getElementById("sv4").innerHTML = formatter.format(data.members[4].shareValue);
    document.getElementById("flights4").innerHTML = data.members[4].flights;
    document.getElementById("cont4").innerHTML = formatter.format(data.members[4].contributed);
    document.getElementById("join4").innerHTML = fdate[4]; 
    document.getElementById("cpf4").innerHTML = formatter.format(data.members[4].contributed/data.members[4].flights); 

    document.getElementById("name5").innerHTML = data.members[5].company;
    document.getElementById("sv5").innerHTML = formatter.format(data.members[5].shareValue);
    document.getElementById("flights5").innerHTML = data.members[5].flights;
    document.getElementById("cont5").innerHTML = formatter.format(data.members[5].contributed);
    document.getElementById("join5").innerHTML = fdate[5]; 
    document.getElementById("cpf5").innerHTML = formatter.format(data.members[5].contributed/data.members[5].flights); 

    document.getElementById("name6").innerHTML = data.members[6].company;
    document.getElementById("sv6").innerHTML = formatter.format(data.members[6].shareValue);
    document.getElementById("flights6").innerHTML = data.members[6].flights;
    document.getElementById("cont6").innerHTML = formatter.format(data.members[6].contributed);
    document.getElementById("join6").innerHTML = fdate[6]; 
    document.getElementById("cpf6").innerHTML = formatter.format(data.members[6].contributed/data.members[6].flights); 

    document.getElementById("name7").innerHTML = data.members[7].company;
    document.getElementById("sv7").innerHTML = formatter.format(data.members[7].shareValue);
    document.getElementById("flights7").innerHTML = data.members[7].flights;
    document.getElementById("cont7").innerHTML = formatter.format(data.members[7].contributed);
    document.getElementById("join7").innerHTML = fdate[7]; 
    document.getElementById("cpf7").innerHTML = formatter.format(data.members[7].contributed/data.members[7].flights); 
    
    document.getElementById("name8").innerHTML = data.members[8].company;
    document.getElementById("sv8").innerHTML = formatter.format(data.members[8].shareValue);
    document.getElementById("flights8").innerHTML = data.members[8].flights;
    document.getElementById("cont8").innerHTML = formatter.format(data.members[8].contributed);
    document.getElementById("join8").innerHTML = fdate[8];
    document.getElementById("cpf8").innerHTML = formatter.format(data.members[8].contributed/data.members[8].flights); 
    
    document.getElementById("name9").innerHTML = data.members[9].company;
    document.getElementById("sv9").innerHTML = formatter.format(data.members[9].shareValue);
    document.getElementById("flights9").innerHTML = data.members[9].flights;
    document.getElementById("cont9").innerHTML = formatter.format(data.members[9].contributed);
    document.getElementById("join9").innerHTML = fdate[9]; 
    document.getElementById("cpf9").innerHTML = formatter.format(data.members[9].contributed/data.members[9].flights); 
  } 
  request.send() 
}

function spybot10() {
  var allnameP = sessionStorage.getItem("getallname");
  //console.log(allname);
  var request = new XMLHttpRequest()
  request.open('GET', "https://cors-anywhere.herokuapp.com/https://www.airline4.net/api/?access_token=JKJHkjhkSDHFGKSFDHKWerHGsbv.783KJhSLSKsdjfhskejfhskjjjhHHHllkihgHJKlSBmBNMVvxGAgdgh&search="+allnameP, true)
  request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  var ln = (data.members.length)-1;

  var timeStamp_value = [data.members[ln].joined, data.members[ln-1].joined, data.members[ln-2].joined, data.members[ln-3].joined, data.members[ln-4].joined, data.members[ln-5].joined, data.members[ln-6].joined, data.members[ln-7].joined, data.members[ln-8].joined, data.members[ln-9].joined];
  var timerec = timeStamp_value.map(x => x*1000);
  var theDate0 = new Date(timerec[0]);
  var theDate1 = new Date(timerec[1]);
  var theDate2 = new Date(timerec[2]);
  var theDate3 = new Date(timerec[3]);
  var theDate4 = new Date(timerec[4]);
  var theDate5 = new Date(timerec[5]);
  var theDate6 = new Date(timerec[6]);
  var theDate7 = new Date(timerec[7]);
  var theDate8 = new Date(timerec[8]);
  var theDate9 = new Date(timerec[9]);
  var fdate = [theDate0, theDate1, theDate2, theDate3, theDate4, theDate5, theDate6, theDate7, theDate8, theDate9];
  //var dateString = fdate.toGMTString();




  document.getElementById("name0").innerHTML = data.members[ln].company;
  document.getElementById("sv0").innerHTML = formatter.format(data.members[ln].shareValue);
  document.getElementById("flights0").innerHTML = data.members[ln].flights;
  document.getElementById("cont0").innerHTML = formatter.format(data.members[ln].contributed);
  document.getElementById("join0").innerHTML = fdate[0]; 
  document.getElementById("cpf0").innerHTML = formatter.format(data.members[ln].contributed/data.members[ln].flights); 

  document.getElementById("name1").innerHTML = data.members[ln-1].company;
  document.getElementById("sv1").innerHTML = formatter.format(data.members[ln-1].shareValue);
  document.getElementById("flights1").innerHTML = data.members[ln-1].flights;
  document.getElementById("cont1").innerHTML = formatter.format(data.members[ln-1].contributed);
  document.getElementById("join1").innerHTML = fdate[1]; 
  document.getElementById("cpf1").innerHTML = formatter.format(data.members[ln-1].contributed/data.members[ln-1].flights); 

  document.getElementById("name2").innerHTML = data.members[ln-2].company;
  document.getElementById("sv2").innerHTML = formatter.format(data.members[ln-2].shareValue);
  document.getElementById("flights2").innerHTML = data.members[ln-2].flights;
  document.getElementById("cont2").innerHTML = formatter.format(data.members[ln-2].contributed);
  document.getElementById("join2").innerHTML = fdate[2]; 
  document.getElementById("cpf2").innerHTML = formatter.format(data.members[ln-2].contributed/data.members[ln-2].flights); 
  
  document.getElementById("name3").innerHTML = data.members[ln-3].company;
  document.getElementById("sv3").innerHTML = formatter.format(data.members[ln-3].shareValue);
  document.getElementById("flights3").innerHTML = data.members[ln-3].flights;
  document.getElementById("cont3").innerHTML = formatter.format(data.members[ln-3].contributed);
  document.getElementById("join3").innerHTML = fdate[3];
  document.getElementById("cpf3").innerHTML = formatter.format(data.members[ln-3].contributed/data.members[ln-3].flights); 
  
  document.getElementById("name4").innerHTML = data.members[ln-4].company;
  document.getElementById("sv4").innerHTML = formatter.format(data.members[ln-4].shareValue);
  document.getElementById("flights4").innerHTML = data.members[ln-4].flights;
  document.getElementById("cont4").innerHTML = formatter.format(data.members[ln-4].contributed);
  document.getElementById("join4").innerHTML = fdate[4]; 
  document.getElementById("cpf4").innerHTML = formatter.format(data.members[ln-4].contributed/data.members[ln-4].flights); 

  document.getElementById("name5").innerHTML = data.members[ln-5].company;
  document.getElementById("sv5").innerHTML = formatter.format(data.members[ln-5].shareValue);
  document.getElementById("flights5").innerHTML = data.members[ln-5].flights;
  document.getElementById("cont5").innerHTML = formatter.format(data.members[ln-5].contributed);
  document.getElementById("join5").innerHTML = fdate[5]; 
  document.getElementById("cpf5").innerHTML = formatter.format(data.members[ln-5].contributed/data.members[ln-5].flights); 

  document.getElementById("name6").innerHTML = data.members[ln-6].company;
  document.getElementById("sv6").innerHTML = formatter.format(data.members[ln-6].shareValue);
  document.getElementById("flights6").innerHTML = data.members[ln-6].flights;
  document.getElementById("cont6").innerHTML = formatter.format(data.members[ln-6].contributed);
  document.getElementById("join6").innerHTML = fdate[6]; 
  document.getElementById("cpf6").innerHTML = formatter.format(data.members[ln-6].contributed/data.members[ln-6].flights); 

  document.getElementById("name7").innerHTML = data.members[ln-7].company;
  document.getElementById("sv7").innerHTML = formatter.format(data.members[ln-7].shareValue);
  document.getElementById("flights7").innerHTML = data.members[7].flights;
  document.getElementById("cont7").innerHTML = formatter.format(data.members[ln-7].contributed);
  document.getElementById("join7").innerHTML = fdate[7]; 
  document.getElementById("cpf7").innerHTML = formatter.format(data.members[ln-7].contributed/data.members[ln-7].flights); 
  
  document.getElementById("name8").innerHTML = data.members[ln-8].company;
  document.getElementById("sv8").innerHTML = formatter.format(data.members[ln-8].shareValue);
  document.getElementById("flights8").innerHTML = data.members[ln-8].flights;
  document.getElementById("cont8").innerHTML = formatter.format(data.members[ln-8].contributed);
  document.getElementById("join8").innerHTML = fdate[8];
  document.getElementById("cpf8").innerHTML = formatter.format(data.members[ln-8].contributed/data.members[ln-8].flights); 
  
  document.getElementById("name9").innerHTML = data.members[ln-9].company;
  document.getElementById("sv9").innerHTML = formatter.format(data.members[ln-9].shareValue);
  document.getElementById("flights9").innerHTML = data.members[ln-9].flights;
  document.getElementById("cont9").innerHTML = formatter.format(data.members[ln-9].contributed);
  document.getElementById("join9").innerHTML = fdate[9]; 
  document.getElementById("cpf9").innerHTML = formatter.format(data.members[ln-9].contributed/data.members[ln-9].flights); 
} 
request.send() 
}

