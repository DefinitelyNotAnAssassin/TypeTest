from django.urls import path 
from TypingInterface import views 


urlpatterns = [
     path('', views.home, name='home'),
     path('get_words', views.get_words, name = "get words")
]
