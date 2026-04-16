from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Review
from .utils import get_sentiment

@api_view(['POST'])
def analyze_review(request):
    text = request.data.get("text")
    sentiment = get_sentiment(text)
    Review.objects.create(text=text, sentiment=sentiment)
    return Response({"review": text, "sentiment": sentiment})

@api_view(['GET'])
def summary(request):
    data = {
        "Positive": Review.objects.filter(sentiment="Positive").count(),
        "Negative": Review.objects.filter(sentiment="Negative").count(),
        "Neutral": Review.objects.filter(sentiment="Neutral").count(),
    }
    return Response(data)
