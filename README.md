Why ?

It's a little tool to parse a CSV into HTML files
Used for promotions in a Electronic Shop 


-------------------------------ATTENTION----------------------------- 
MAKE SURE YOUR CSV IS CORRECTLY FORMATED => data1,data2,data3,etc..
If you have more than 4 columns you have to adapt app.js
---------------------------------------------------------------------

You can adapt HTML => Template + In app.js

How that's work ?

Run app.js (node app.js)
    => Will generate html files with csv datas

Then 
Run screen.js (node screen.js)
    => Will launch and screen every html file
    It's using puppeteer so you can adapt and change size of screen and positionning
    ⚠️ Puppeteer is no longer supported so run into local device ⚠️
    This step take several minutes (depends html file size)!
    Be patient
