from rest_framework import serializers
from .models import ProteinPowder, FoodProduct, Vote, Comment, PendingSubmission

class ProteinPowderSerializer(serializers.ModelSerializer):
    price_per_protein = serializers.FloatField(read_only=True)
    calories_per_protein = serializers.FloatField(read_only=True)

    class Meta:
        model = ProteinPowder
        fields = '__all__'


class FoodProductSerializer(serializers.ModelSerializer):
    price_per_protein = serializers.FloatField(read_only=True)
    calories_per_protein = serializers.FloatField(read_only=True)

    class Meta:
        model = FoodProduct
        fields = '__all__'


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class PendingSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PendingSubmission
        fields = '__all__'