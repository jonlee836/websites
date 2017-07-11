How to setup and work on the Opencv Web Interface.

REQUIREMENTS

Webserver - apache2

Front end - angularJS 1.4.7+ (but before 2.0), angular-route.js

Back end - php5+, Opencv 3.0.0

Once these have all been installed, simply drop the contents inside the /var/www/html folder of the jetson tk1.

Overall tree of the web interface

/var/www/html
├── css
│   ├── bootstrap.min.css
│   └── opencv_css.css
├── index.html
├── js
│   ├── angular.js
│   ├── angular-route.js
│   ├── app.js
│   ├── index.js
│   ├── jQuery.js
│   └── ui-bootstrap-tpls-0.14.3.min.js
├── opencv
│   ├── Canny
│   │   ├── Canny
│   │   ├── Canny.cpp
│   │   ├── Canny.html
│   │   ├── Canny.js
│   │   └── Canny.php
│   └── MakeGray
│       ├── makegray
│       ├── makegray.cpp
│       ├── MakeGray.html
│       ├── MakeGray.js
│       └── MakeGray.php
├── php
│   ├── base64_check.php
│   └── upload.php
├── processed
├── README.txt
└── uploads

----------------------------------------------------------------------------------------------------------------------------------------

		The Opencv Web Interface is an SPA that is designed to allow users to do image processing without the need
 	to setup opencv on their machine. The modular design of this web api allows any opencv filter to be added to the interface.
	For instance, you could delete the entire opencv folder and you could still write images to the server. You could also simply 
	delete the MakeGray filter and the Canny filter would not be affected. Whatever is not answered in the guide will most likely be found
	inside the comments of the js,php, or html. If worse comes to worse then simply email jonlee836@gmail.com for questions!
		
	---------Overview of how the opencv filters work and how to make them---------------------------------------------------------------------------------

	As you can see in the opencv folder, there are currently 2 folders. If you wanted to add a new opencv filter, you would need 
	to add the 5 different files as shown in both folders, inside your new filter. 

	1. the html markup.

	This is where you would put your html elements that are buttons or trackbars, bind them to angularJS, and injected into the indexl.html
	page. The aesthics of the website are generated with bootstrap and a custom opencv.css file. This allows the developer to add whatever
	style of button, trackbar, etc... into the html markup of their opencv filter.
	    	
	NOTE : All of the html markup is injected into line 69 of index.html; <div ng-include='template.url'></div> is where the user gui will be
	presented. Any changes in spacing between buttons or positioning of items can be addressed inside the html markup, instead of the index.html file.

	2. angularJS

	When the user accesses an opencv filter, there is an angularJS file that corresponds to it. The angularJS file for the corresponding
	filter is very straight forward as it is there to send post data to the php file. This php file will correspond to the opencv method. This data
	can be sent depending on whatever condition the developer feels appropriate. Currently, the Canny filter's angularJS file sends the current
	position of the trackbar to the php file, after the user hits the Canny button. However, this can be changed so the angularJS file sends its 
	data after the user releases the left mouse button once the trackbar value has been modified.

	NOTE: The location of the uploaded image that will be used as an input image is saved within the app.js file. Each opencv filter's angularJS
	file is given the input image path by the app.js file as needed. This is how you are able to process an image using one filter, then switch to 
	another filter without re-uploading the image for the newly selected filter.

	3. php
	
	The php will now take the post data and search the $_POST data for the image and n number of corresponding variables related to the filter.
	Afterwards the opencv executable is called using the exec command in php. The executable is run with a minimum of 2 arguments, the location
	of the input image and where to write the output image. In the case of canny we use 3 arguments, the third one being the canny threshold.
	Once the processed image has been written to the server, it is then formatted to be usable by the angularJS, encoded in base64, and sent
	back to the user.

	4. opencv source code (the ones currently in the interface were compiled with c++ using the g++11 compiler)

	The opencv executable is setup to receive a minimum of 2+n number of arguments. It will mirror the php script that is calling it
	in terms of variables passed/received. First and second arguments are the input image location and the output image location. 
	I made it this way originally because it makes saving the ouput images to another folder far quicker (vs recompiling the source code with 
	the new hardcoded output dir path). After that, things like canny threshold, color space type, etc... can be added as the developer wants.
	
	5. opencv executable

	The only thing to do once the source code has been compiled is to grant it permissions to write to server.
	
	6. modifying app.js to call your filter

	The easiest way to understand this is to read app.js, the syntax and methods used to run the opencv filter should quickly become evident.	
	Once this is all finished you will be able to start using your new opencv filter! The processed image will appear on the right hand side of the website!

	------------------------------------------------------------------------------------------------------------------------------------------------------
	
	-----------How to add more functionality--------------------------------------------------------------------------------------------------------------

	The app.js file is what controls the web server and additional functions can be declared and defined this file, or declared then defined externally. An
	example of this is each opencv angularJS file that controls a specific opencv filter. All of them are ultimately called from the app.js file. Currently
	in Canny filter you can only process one image at a time. However this can be easily changed to mass upload, processing, and results given back to user
	inside a zip file. The implmentation would really be up to the developer at this point. However, angularJS lets a developer
	declare his solution inside the app.js file and then define it elsewhere. An example of this is the angularJS files themselves which are within their
	own folder, but are called by code inside the app.js file.	
	
	NOTE : No matter what the opencv filter is, I highly recommend you follow the general guidelines as already listed. It took me a while to realize I was
	having difficulty figuring out what was where and what did what; without reading the source code of my js or php. Keep it as modularized as possible,
	this way even if you have 100 opencv filters, you'll still have an easy time navigating your files.

	------------------------------------------------------------------------------------------------------------------------------------------------------

	-----------How to diagnose problems-------------------------------------------------------------------------------------------------------------------

	Download and install firebug in firefox. This will quickly tell you where the errors are happening and display them in the console.
	It will sometimes say the error is within one of the libraries referenced, but most of the time it will still tell you the name of the function that 
	it is happening	in.
	
	-------------------------------------------------------------------------------------------------------------------------------------------------------
