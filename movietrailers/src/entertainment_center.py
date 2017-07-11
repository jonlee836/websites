import media
import fresh_tomatoes


#Create instances of class Movie found in module media.py
toy_story = media.Movie("Toy Story",
                        "A story of a boy and his toys that come to life.",
                        "http://upload.wikimedia.org/wikipedia/en/1/13/Toy_Story.jpg",
                        "https://www.youtube.com/watch?v=vwyZH85NQC4")

avatar = media.Movie("Avatar",
                     "When plot armor prevails over a Terran expeditionary force on the planet of Pandora.",
                     "http://upload.wikimedia.org/wikipedia/id/b/b0/Avatar-Teaser-Poster.jpg",
                     "https://www.youtube.com/watch?v=5PSNL1qE6VY")

gits = media.Movie("Ghost in the Shell",
                   "Major Kusanagi of Public Security Section 9 must stop cyber terrorists "
                   "bent on digital armageddon.",
                   "http://cdn.collider.com/wp-content/uploads/2016/09/ghost-in-the-shell-movie-logo.png",
                   "https://www.youtube.com/watch?v=tRkb1X9ovI4")

stalingrad_1993 = media.Movie("Stalingrad (1993)",
                              "A German platoon once confident in a quick and easy victory, "
                              "learns the terrible cost of war as they fight in the Streets of Stalingrad. "
                              "Witness the true cost of war as the Red Army and the Wehrmacht fight to the bitter end.",
                              "https://images-na.ssl-images-amazon.com/images/M/MV5BMTk2NDA1ODExMV5BMl5BanBnXkFtZTcwNDc1NDMzMQ@@._V1_.jpg",
                              "https://www.youtube.com/watch?v=7QlK-l-vpZQ")

gattaca = media.Movie("Gattaca",
                      "Vincent Freeman is born with genetics viewed as inferior by a society that has achieved genetic perfection. "
                      "Undeterred, he challenge fate and assumes a second life in order to fullfill his lifelong dream of becoming "
                      "an astronaut at Gattaca.",
                      "https://images-na.ssl-images-amazon.com/images/M/MV5BNDQxOTc0MzMtZmRlOS00OWQ5LWI2ZDctOTAwNmMwOTYxYzlhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
                      "https://www.youtube.com/watch?v=BpzVFdDeWyo")

#create an array and fill it with instances of Class Movie
movies = [toy_story, avatar, gits, stalingrad_1993, gattaca]

#Pass array into module fresh_tomatoes.py and run function open_movies which accepts the array movies as an argument.

#NOTE : The function open_movies is expecting an array with objects that are of type Movie. Therefore anything else passed into it will result in an error, unless of course it has the same variable names for its member variables.

fresh_tomatoes.open_movies_page(movies)

#stalingrad_1993.show_trailer()

#print(gattaca.storyline)
#gattaca.show_trailer()

#print(ghost_in_the_shell.storyline)
#ghost_in_the_shell.show_trailer()

#print(avatar.storyline)
#avatar.show_trailer()
