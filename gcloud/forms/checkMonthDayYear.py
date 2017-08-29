months = ['January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December']

def valid_month(month):
    for foo in months:
        if foo.lower() == month.lower():
            return month.title()
        
    return None

def valid_day(day):
    if(day.isdigit()):
        dayInt = int(day)
        if 1 <= dayInt <= 31:
            return dayInt
        return None

def valid_year(year):
    if year.isdigit():
        yearInt = int(year)
        if 1900 <= yearInt <= 2020:
            return yearInt
    return None
