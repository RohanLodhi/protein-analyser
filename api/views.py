from rest_framework import generics
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.throttling import AnonRateThrottle
from rest_framework.response import Response
from rest_framework import status
from .models import ProteinPowder, FoodProduct, Vote, Comment, PendingSubmission
from .serializers import (
    ProteinPowderSerializer, FoodProductSerializer,
    VoteSerializer, CommentSerializer, PendingSubmissionSerializer
)
from .throttles import IPBasedThrottle

@api_view(['POST'])
def vote_protein_powder(request, pk, action):
    product = ProteinPowder.objects.get(id=pk)
    if action == 'upvote':
        product.upvotes += 1
    elif action == 'downvote':
        product.downvotes += 1
    product.save()
    return Response({'upvotes': product.upvotes, 'downvotes': product.downvotes})

@api_view(['POST'])
def vote_food_product(request, pk, action):
    product = FoodProduct.objects.get(id=pk)
    if action == 'upvote':
        product.upvotes += 1
    elif action == 'downvote':
        product.downvotes += 1
    product.save()
    return Response({'upvotes': product.upvotes, 'downvotes': product.downvotes})

@api_view(['POST'])
@throttle_classes([IPBasedThrottle])
def submit_protein_powder(request):
    data = request.data.copy()
    pending_submission = PendingSubmission.objects.create(
        submission_type='protein',
        data=data
    )
    return Response({'message': 'Submission sent for admin approval!'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@throttle_classes([IPBasedThrottle])
def submit_food_product(request):
    data = request.data.copy()
    pending_submission = PendingSubmission.objects.create(
        submission_type='food',
        data=data
    )
    return Response({'message': 'Submission sent for admin approval!'}, status=status.HTTP_201_CREATED)


# Protein Powders
class ProteinPowderListCreateView(generics.ListCreateAPIView):
    queryset = ProteinPowder.objects.all()
    serializer_class = ProteinPowderSerializer


class ProteinPowderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProteinPowder.objects.all()
    serializer_class = ProteinPowderSerializer


# Food Products
class FoodProductListCreateView(generics.ListCreateAPIView):
    queryset = FoodProduct.objects.all()
    serializer_class = FoodProductSerializer


class FoodProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FoodProduct.objects.all()
    serializer_class = FoodProductSerializer


# Votes
class VoteCreateView(generics.CreateAPIView):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer


# Comments
class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
