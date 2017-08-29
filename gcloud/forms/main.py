#!/usr/bin/python2.7

import webapp2
import checkMonthDayYear as mdy

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
<div style="color: red">%(error)s</div>
<br>
<input type="submit">
</form>
"""

# what the user sees on page load
class MainPage(webapp2.RequestHandler):

    # string substitution on error string
    def write_form(self, error=""):
        self.response.out.write(formbirthday % {"error": error})
        
    def get(self):
        
        self.response.write(formradio)
        self.response.write(formsearch)
        self.response.write(formdropdown)
        self.write_form()        
        #self.response.headers['Content-Type'] = 'text/plain'
        
    def post(self):
        
        user_month = mdy.valid_month(self.request.get('month'))
        user_day = mdy.valid_day(self.request.get('day'))
        user_year = mdy.valid_year(self.request.get('year'))

        # if any input is invalid resubmit form
        if not(user_month and user_day and user_year):
            #self.response.write(formbirthday)
            self.write_form("valid month / day/ year required")
        else:
            self.response.out.write("Valid")
        
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
