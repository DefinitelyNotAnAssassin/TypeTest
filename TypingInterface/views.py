from django.shortcuts import render, redirect
from django.http import JsonResponse
import random
import json  
import nltk 
from nltk.corpus import words

nltk.download('words')



def home(request):

    return render(request, 'TypingInterface/home.html')


def get_words(request): 
    word_set = [] 
    four_letter_words = [ word for word in words.words() if len(word) == 4 ]
    for i in range(60):
        word_set.append(random.choice(four_letter_words))
       
    return JsonResponse(json.dumps(word_set), safe = False)