#!/usr/bin/python2.7

import webapp2

formsearch="""
<form action="https://www.google.com/search">
<input type="text" name="q">
<input type="submit">
</form>
"""

formradio="""
<form method="post" action="/testform">
<label>
One
<input type="radio" name="q" value="one">
</label>
<label>
Two
<input type="radio" name="q" value="two">
</label>
<label>
Three
<input type="radio" name="q" value="three">
</label>
<input type="submit">
</form>
"""

formdropdown="""
<form method="get" action="/testform">
<select name="q">
<option value="1">the number one</option>
<option>two</option>
<option>three</option>
</select>

<input type="submit">
</form>
"""

formbirthday="""
<form method="post">
What is your birthday?
<br>
<label> Month
<input type="text" name="month"
</label>
<label> Day
<input type="text" name="day"
</label>
<label> Year
<input type="text" name="year"
</label>

<br>
<input type="submit">
</form>
"""

# what the user sees on page load
class MainPage(webapp2.RequestHandler):
    def get(self):
        #self.response.headers['Content-Type'] = 'text/plain'
        self.response.write(formradio)
        self.response.write(formsearch)
        self.response.write(formdropdown)
        self.response.write(formbirthday)
        
    def post(self):
        self.response.out.write("foo")
        
# sends request, how the browser requests information
class TestHandler(webapp2.RequestHandler):
    def post(self):
        q = self.request.get("q")
        self.response.out.write(q)
        
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.out.write(self.request)        
        
app = webapp2.WSGIApplication([('/', MainPage),
                               ('/testform', TestHandler)],
                              debug=True)
