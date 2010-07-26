
   

function GetQuerystringParam(name, url) {
     name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
     var regexS = "[\\?&amp;]" + name + "=([^&amp;#]*)";
     var regex = new RegExp(regexS);
    if (typeof (url) == 'undefined') url = window.location.href;
    var results = regex.exec(url);
     if (results == null)
         return "";

     else
         return results[1];

	}
						   
						   
						 
						 

	
	function StoreGifLocation(oldstoreword){
		          //alert('gere');
		storeword=oldstoreword.toUpperCase();
				  
		var giflocation=null;
		if (storeword.indexOf('KROGER') >=0)  	{giflocation='kroger.gif';	return giflocation}
		if (storeword.indexOf('SCHNUCK') >=0)  	{giflocation='schnucks.gif';	return giflocation}
		if (storeword.indexOf('WALMART') >=0)  	{giflocation='walmart.gif';	return giflocation}
		if (storeword.indexOf('SAFEWAY') >=0)  	{giflocation='safeway.gif';	return giflocation}
		if (storeword.indexOf('ALBERTSONS') >=0)  	{giflocation='albertsons.gif';	return giflocation}
		if (storeword.indexOf('AHOLD') >=0)  	{giflocation='ahold.gif';	return giflocation}
		if (storeword.indexOf('INGLES') >=0)  	{giflocation='ingles.gif';	return giflocation}
		if (storeword.indexOf('TEETER') >=0)  	{giflocation='harristeeter.gif';	return giflocation}
			
		 if (giflocation==null)	giflocation='avatar.gif';

		return giflocation;
	}
			
			
	function AjaxFailedShipAddress(){
	 alert('Failed to locate shipping address.');
	}
	
	function getContactDetailStart(){
	 //onWinLoad();					   
	var qid=GetQuerystringParam("qid");
	LoadContactDetail(qid);
	 //onActivityBtn();
	}
	
	
	function getAddress(){

	try{
		//alert('initializeiPhone');
	
		var qid=GetQuerystringParam("qid");
          //alert(qid);
          var odata="{'QuoteFileID':" + qid + "}";
           //alert(odata);
          //Call the webservice
          $.ajax({
                 type: "POST",
                 url: "http://pit-cs-m901.ingerrand.com/IR2/Service1.asmx/GetShipAddressForQuote",
                 data: odata,
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function(msg) {
                     LoadShipAddressSucceeded(msg);
                 },
                 error:AjaxFailedShipAddress

             }); 	
	}
	
	catch(b){
			alert('Error in initializeiPhone ' + b);
		}
  
	}

	
	//Get the ShipAddress from the JSON returned from the WebService
function LoadShipAddressSucceeded(result){
  try{
  	//alert('LoadShipAddressSucceeded' + result.d);
	var qid=GetQuerystringParam("qid");
	var userid=GetQuerystringParam("userid");
	var dbaddress=result.d;
	var cleanaddress=TidyJSONString(dbaddress);
	$("#qaddress").val(cleanaddress);
	$('#shipmaplink').attr('href','shipmap.html?address=' +cleanaddress+'&qid='+qid+'&userid='+userid);
	$('#btnLink').attr('href','shipmap.html?address=' +cleanaddress+'&qid='+qid+'&userid='+userid);
	var newtag='Shipping Address :  ' + cleanaddress;
	$('#shipspan').html(newtag)
	}
	
	catch(b){
		alert('Error in LoadShipAddressSucceeded ' + b);
	}
  }


//Use this function to tidy up the address returned from JSON web service
  function TidyJSONString(stringval){
	var newtext="";
	for (var i=0;i< stringval.length;i++){
		var c=stringval.charCodeAt(i);
		var d=stringval.charAt(i);
		if	(	(c !=91) && 		
				(c !=93) &&		
				(c !=34) &&		
				(c !=32)	
			) {newtext+=d;		//Check for [,],"" and blankspace and ignore these
				}
			
	
	}	
	return newtext;
  }
	function getQuoteMenuStart(){

	//Hide the textbox the is populated with the address
	$('#qaddress').hide();
	$('#btnShip').hide();
	
	//alert('getQuoteMenuStart');
	
	var qid=GetQuerystringParam("qid");
	var userid=GetQuerystringParam("userid");
	
	getAddress();
	
	$('#shipmaplink').attr('href','shipmap.html?qid=' + qid);
	$('#backbutton').attr('href','quotedetail.html?qid=' + qid +'&userid=' + userid);
	$('#contactdeatillink').attr('href','contactdetail.html?qid=' + qid);
	 //onActivityBtn();
	}
	
	
	function getQuoteDetailStart(){
	// onWinLoad();					   
	var qid=GetQuerystringParam("qid");
	LoadQuoteDetailForthisQuote(qid);
	 //onActivityBtn();
	}
	
	
	function getQuotesStart(){
	// onWinLoad();
	var jobid=GetQuerystringParam("jobid");
	LoadQuotesForthisJob(jobid);
	// onActivityBtn();
	}
	
	
	//sets any values for the Menu
	//you could set the userID in the onclick event here for example
	function getMenuStart(){
						  //  onWinLoad();
	var userID=GetQuerystringParam("userid");
	$("#textm").val(userID );
	$('#jobslink').attr('href','jobs.html?userid=' + userID);
	 //onActivityBtn();
	}

	
	function getJobsStart(){
						  // onWinLoad();
	var userID=GetQuerystringParam("userid");
	//alert('The userID is ' + userID + ' call the read rows...');
	$('#backbutton').attr('href','index.html');
	readuserrows(userID);
						  // onActivityBtn();
	}
	
	
	
            function login3js(){
				readuserrows(1066);
			}
						   
						   
						   
        	function login2js(){
			     
			try{  
						  
						   
				 $('#loginbutton').val('Logging in...Please wait');
				 //onActivityBtn();
				 //alert('Starting d call to DB');
				 var uname=$("#username").val();
				 var pwd=$("#password").val();
				 //alert(uname + pwd);
				 var odata="{'username':'" + uname + "','password':'" + pwd + "'}";
				 $.ajax({
					 type: "POST",
					 url: "http://pit-cs-m901.ingerrand.com/IR2/Service1.asmx/UserLogin",
					 data: odata,
					 contentType: "application/json; charset=utf-8",
					 dataType: "json",
					 success: function(msg) {
						 AjaxSucceeded(msg);
					 },
					 error:AjaxFailed

				 });
				 }
				 catch(b){
					alert('Error login2js ' + b);
				 }
				 
			
			}
		
	 
	 
	 
          function AjaxSucceeded(result) {
            //alert("Worked");
             // alert(result.d);
			 var txt=result.d;
             var userID=result.d;
			 $("#textm").val(userID );
             $("#Box1").val(userID);
			 //$('#menulink').attr('href','menu.html?userid=' + userID); Just go straight to jobs.html
			 $('#menulink').attr('href','jobs.html?userid=' + userID);
			 $('#menulinkdiv').toggle();
			 
			 $('#loginbutton').toggle();	//Hide the login button
			 
             //readrows();
			 //readuserrows(userID);
       
          }
         
          function AjaxFailed(result) {
              alert("AjaxFailed - Failed " + result.status + ' ' + result.statusText);
          }

			//Modified reasuserrows to call the JSON webservice now
         function readuserrows(userid)
		 {
		 //alert ('here');
		 var odata="{'UserID':" + userid + "}";
		  //Call the webservice
          $.ajax({
                 type: "POST",
                 url: "http://pit-cs-m901.ingerrand.com/IR2/Service1.asmx/GetJobFileListJSON",
                 data: odata,
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function(msg) {
                     LoadJobSucceeded(msg);
                 },
                 error:AjaxFailed

             });
		 
		 
		 }
		 
           //Loads the Jobs for this userID
          function readrows(){
         
          var uid=$("#Box1").val();
          //alert(uid);
          var odata="{'UserID':" + uid + "}";
           //alert(odata);
          //Call the webservice
          $.ajax({
                 type: "POST",
                 url: "http://pit-cs-m901.ingerrand.com/IR2/Service1.asmx/GetJobFileListJSON",
                 data: odata,
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function(msg) {
                     LoadJobSucceeded(msg);
                 },
                 error:AjaxFailed

             });
             }
			 
			
             
             function LoadQuoteDetailForthisQuote(qid)
			 {
				//alert('This quoteflie: ' + qid);
				var odata="{'QuoteFileID':" + qid + "}";
				//alert(odata);
				//Call the webservice
		  $.ajax({
                 type: "POST",
                 url: "http://pit-cs-m901.ingerrand.com/IR2/Service1.asmx/GetQuoteDetails",
                 data: odata,
                 contentType: "application/json; charset=utf-8",
				 dataType: "json",
                 success: function(msg) {
					//alert('Detail succ. Calling func.');
                     LoadQuoteDetailSucceeded(msg);
                 },
                 error:AjaxFailed

             });
			}
			
			 
			 
             function LoadQuotesForthisJob(jfileid){
				
                //var linkTo=obj.href;
                //return confirm('Whats the story' + quote);
				var odata="{'JobFileID':" + jfileid + "}";
				
				//alert(odata);
				//Call the webservice
		  $.ajax({
                 type: "POST",
                 url: "http://pit-cs-m901.ingerrand.com/IR2/Service1.asmx/GetQuoteFilesFromJobJSON",
                 data: odata,
                 contentType: "application/json; charset=utf-8",
				 dataType: "json",
                 success: function(msg) {
					//alert('heresucc');
                     LoadQuotesSucceeded(msg);
                 },
                 error:AjaxFailed

             });
			}
			
			
			function LoadContactDetail(qid){
				
				var odata="{'QuoteFileID':" + qid + "}";
			
			$.ajax({
                 type: "POST",
                 url: "http://pit-cs-m901.ingerrand.com/IR2/Service1.asmx/GetContactDetails",
                 data: odata,
                 contentType: "application/json; charset=utf-8",
				 dataType: "json",
                 success: function(msg) {
					//alert('heresucc');
                     LoadContactSucceeded(msg);
                 },
                 error:AjaxFailed

             });
			
			}
			
			
			function LoadContactSucceeded(result){
				var c=eval(result.d);
				var qid=GetQuerystringParam("qid");
				var telnumberlink='<a href="tel:' + c[0][0] + '">' + c[0][0] + '</a>'
				
				//$('#ContactNumber').html(c[0][0]);
				$('#ContactNumber').html(telnumberlink);
				$('#Address1').html(c[0][1]);
				$('#nav').html('<' + ' QuoteFiles [' + c[0][6] + ']');
				$('#navback').attr('href','quotemenu.html?qid=' + qid);
				
			}
			
             //Loads the data into the Detail screen
             function LoadQuoteDetailSucceeded(result)
				{
				//alert('In LoadQuoteDetailsSucceeded');
				var qid=GetQuerystringParam("qid");
				var userid=GetQuerystringParam("userid");
				var c=eval(result.d);
				//alert('Quotedetail' + c[0][3]);
				//$('#QuoteStatus').val(c[0][0]);  //Note we must specify [0] also
					//Might need to add .text selector to the above now that we've changed the elements
				//$('#smallid').html('Testing');  //Note we must specify [0] also
				
				$('#smallid').html(c[0][0]);  //Note we must specify [0] also  this replcaes the innerHTML value, rather than .val
				$('#RefNum').html(c[0][1]);  //Note we must specify [0] also
				$('#JobType').html(c[0][2]);  //Note we must specify [0] also
				$('#Comments').html(c[0][3]);  //Note we must specify [0] also
				$('#IsTemplate').html(c[0][4]);  //Note we must specify [0] also
				
				$('#quotemenulink').attr('href','quotemenu.html?qid=' + qid + '&userid='+userid);
				
				$('#nav').html('< ' + ' QuoteFiles [' + c[0][6] + ']');
				$('#navback').attr('href','quotes.html?jobid=' + c[0][5]+'&userid='+userid);
				
			}	
             
              function LoadQuotesSucceeded(result){
			  
				//alert(result.d);
				$("#textq").val(result.d);
				//alert(result.d);
				//alert(result.d);
				//var userid=0;
				var userid=GetQuerystringParam("userid");
				
				var c=eval(result.d);
				for (var i in c)
					{
						//alert(i);
						//var row=myJsonObject.rows.item(i);
						var newEntryRow=$('#quoteTemplate').clone();
						
						//newEntryRow.removeAttr('id');
						newEntryRow.removeAttr('style');
						 newEntryRow.attr('Id', c[i][0]);   //The QuoteFileID
						
						newEntryRow.appendTo('#quotes ul');
						newEntryRow.find('.QName').text(c[i][1]);
						newEntryRow.find('.CreatedDate').text(c[i][2]);
						newEntryRow.find('#q').attr('href','quotedetail.html?qid=' + c[i][0]+'&userid='+userid);
						//newEntryRow.find('38428').text(c[i][1]);
						$('#eventslist li:nth-child(odd)').addClass('alternate');
						//userid=c[i][3];   What is this line for???
						
					}
				var userid=GetQuerystringParam("userid");
				$('#backbutton').attr('href','jobs.html?userid='+userid);	
			
			}
			
			
			
			function LoadJobSucceeded(result){
			  //alert('LoadJobSucceeded');
				//alert(result.d);
				var txt=result.d;
				var customername=null;
				var customeravatar=null;
				$("#texta").val(result.d);
				
				var userid=GetQuerystringParam("userid");
				var c=eval(result.d);
				for (var i in c)
					{
					//alert('JobFileName' + c[i][0]);
					var newEntryRow=$('#entryTemplate').clone();
					   
						//newEntryRow.removeAttr('id');
						newEntryRow.removeAttr('style');
						newEntryRow.attr('Id', c[i][1]);  //JobFileID is the link for the <LI>
					   
						newEntryRow.appendTo('#jobs ul');
						newEntryRow.find('.CustomerName').text(c[i][2]);
						newEntryRow.find('.JobFileName').text(c[i][0]);
						//newEntryRow.find('38428').text(c[i][1]);
						//This sets the href attribute on the <a> 
						newEntryRow.find('#q').attr('href','quotes.html?jobid=' + c[i][1] + '&userid='+userid);
						customername=c[i][2];
						customeravatar=StoreGifLocation('kroger');
						customeravatar=StoreGifLocation(customername);
						
						//alert(customeravatar);
						newEntryRow.find('#avatarimg').attr('src','themes/jqt/img/' + customeravatar);
						//$(newEntryRow).attr('onclick','loadquote(1234)');
							
					   //$('#q').attr('href', 'loadquote(' + c[i][1] + ');');
					   
						//$('#quotefile').attr('href', 'loadquote(' + c[i][1] + ');');
						//var clickstring='meloadquote(' +c[i][1] + ')';
						
						//$('#q').attr('onclick', 'loadquote(' + c[i][1] + ');');
					}
					//Now set all their od rows to the alternate class
				$('#eventslist li:nth-child(odd)').addClass('alternate');
			}
               
