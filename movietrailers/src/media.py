import webbrowser

"""

An instance of this class contains a movie title, a brief summary of the movie, a URL containing an image of the movie poster, and a URL link to its trailer.

All arguments accepted by this class are strings

EXAMPLE :

toy_story = media.Movie("Toy Story",
                        "A story of a boy and his toys that come to life.",
                        "http://upload.wikimedia.org/wikipedia/en/1/13/Toy_Story.jpg",
                        "https://www.youtube.com/watch?v=vwyZH85NQC4"

"""

class Movie():
    def __init__(self, movie_title, movie_storyline, movie_posterURL, movie_youtubeURL):
        self.title = movie_title
        self.storyline = movie_storyline
        self.poster_image_url = movie_posterURL
        self.trailer_youtube_url = movie_youtubeURL

    def show_trailer(self):
        webbrowser.open(self.youtubeTrailerURL)
