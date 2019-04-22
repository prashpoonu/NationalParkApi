$(function(){
    $('#num-results').val("10");
});


$('#state-selection-form').submit(function(evt){
    evt.preventDefault();
    let ddSelect = [];
        ddSelect = $('.state-select').val();
        let maxCnt = $('#num-results').val();
        CallAPi(maxCnt,ddSelect.toString());
    });
    
    // a function to call the API with the query parameters
        // promise
    
function CallAPi(maxCount, selectedStates) {
    let url = 'https://developer.nps.gov/api/v1/parks';
    let queryParam = {
     stateCode:selectedStates,
     limit:Number(maxCount) - 1,
     fields:"Addresses",
     api_key :'9EZ1RXLQdWm5d8nymt3rXc6PTiyPUAvT5Ft60NgR'
    }
    let queryString = BuildQueryString(queryParam);
    url = url + '?' + queryString;
    fetch(url)
    .then(response=>response.json())
    .then(jsonData=>DisplayResult(jsonData))
    .catch(err=>{
        $('#finalResult').html(`Error Occurred : ${err.message}`);  
    });
    
}

function BuildQueryString(parameters)
 {
     //Build a query string from the parameters data
     let keys = Object.keys(parameters);
    let queryItems= keys.map(k=>`${k}=${parameters[k]}`);
     return queryItems.join('&');
 } 
 
 function DisplayResult(jsonResult)
 {
     console.log(jsonResult.data.length);
     let dataAppend = 
    $('.finalResult').html('')
     let finalResult = `<table id="tblResult">
     <tr>
     <th>Full Name </th>
     <th>Description </th>
     <th>Wesite URL</th>
     <th>Addresses</th>
     </tr>
     </table>`;
     $('.finalResult').html(finalResult);
     
     for(let i = 0 ; i< jsonResult.data.length ; i++)
     {
        $('#tblResult').append(`<tr><td>${jsonResult.data[i].fullName}</td>
        <td>${jsonResult.data[i].description}</td>
        <td>${jsonResult.data[i].url}</td>
        <td>${BuildAddressList(jsonResult.data[i].addresses)}</td>
        </tr>`);
     }
    
  
     
     
 }

function BuildAddressList(addressData) {
    let addrList = `<ul>`;
    for (let k = 0; k < addressData.length; k++) 
    {
      addrList+=`<li>${addressData[k].line1} ${addressData[k].city}, ${addressData[k].stateCode} ${addressData[k].postalCode}</li>`;

    }
    addrList +=`</ul>`;
    return addrList;
}
    
    
    
    
    
    // a function to validate or ignore duplicate state entries
    
    // a function to create an array of the state entries
    
    // a function to create the headers we send to the API
    
    // a function (or some attributes to the form) to block the     max results entry from submitting the form 
    
    // a function that maps each result 'key' from the responseJson into an array