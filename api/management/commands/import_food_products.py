import csv
from django.core.management.base import BaseCommand
from api.models import FoodProduct

class Command(BaseCommand):
    help = 'Import food products from CSV'

    def handle(self, *args, **kwargs):
        with open('api/management/food_products.csv', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                FoodProduct.objects.create(
                    product_name=row['Product'],
                    total_price=float(row['Price (₹)']),
                    grams=int(row['Weight (g)']),
                    total_calories=int(row['Calories']),
                    total_protein=float(row['Protein (g)']),
                    protein_source=row['Protein Source'].strip()
                )
        self.stdout.write(self.style.SUCCESS('Food product data imported!'))