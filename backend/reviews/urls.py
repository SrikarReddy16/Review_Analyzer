from django.urls import path
from .views import analyze_review, summary

urlpatterns = [
    path('analyze/', analyze_review),
    path('summary/', summary),
]
