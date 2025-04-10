from django.db import models

class ProteinPowder(models.Model):
    brand = models.CharField(max_length=100)
    product_name = models.CharField(max_length=200)
    total_price = models.FloatField()
    grams = models.IntegerField()
    total_calories = models.IntegerField()
    total_protein = models.FloatField()
    verified = models.BooleanField(default=False)
    trustified = models.CharField(max_length=50, blank=True, null=True)
    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)
    affiliate_link = models.URLField(max_length=500, blank=True, null=True)

    def price_per_protein(self):
        return round(self.total_price / self.total_protein, 2)

    def calories_per_protein(self):
        return round(self.total_calories / self.total_protein, 2)

    def __str__(self):
        return f"{self.brand} - {self.product_name}"


class FoodProduct(models.Model):
    product_name = models.CharField(max_length=200)
    total_price = models.FloatField()
    grams = models.IntegerField()
    total_calories = models.IntegerField()
    total_protein = models.FloatField()
    protein_source = models.CharField(max_length=50)
    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)

    def price_per_protein(self):
        return round(self.total_price / self.total_protein, 2)

    def calories_per_protein(self):
        return round(self.total_calories / self.total_protein, 2)

    def __str__(self):
        return self.product_name


class Vote(models.Model):
    product_type = models.CharField(max_length=10, choices=[('powder', 'ProteinPowder'), ('food', 'FoodProduct')])
    product_id = models.IntegerField()
    vote_type = models.CharField(max_length=4, choices=[('up', 'Upvote'), ('down', 'Downvote')])


class Comment(models.Model):
    product_type = models.CharField(max_length=10, choices=[('powder', 'ProteinPowder'), ('food', 'FoodProduct')])
    product_id = models.IntegerField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class PendingSubmission(models.Model):
    SUBMISSION_TYPE_CHOICES = [
        ('protein', 'Protein Powder'),
        ('food', 'Food Product'),
    ]

    submission_type = models.CharField(max_length=10, choices=SUBMISSION_TYPE_CHOICES)
    data = models.JSONField()  # Store the submission data as JSON
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.submission_type} submission at {self.submitted_at}"
