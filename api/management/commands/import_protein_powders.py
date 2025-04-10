import csv
from django.core.management.base import BaseCommand
from api.models import ProteinPowder

class Command(BaseCommand):
    help = 'Import protein powders from CSV'

    def handle(self, *args, **kwargs):
        with open('api/management/protein_powders.csv', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                ProteinPowder.objects.create(
                    brand=row['Brand'],
                    product_name=row['Product'],
                    total_price=float(row['Total price']),
                    grams=int(row['Grams']),
                    total_calories=int(row['Total Calories']),
                    total_protein=float(row['Total Protein']),
                    verified=row['Trustified'].strip().lower() == 'pass',
                    trustified=row['Trustified']
                )
        self.stdout.write(self.style.SUCCESS('Protein powder data imported!'))