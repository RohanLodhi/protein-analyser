from django.core.management.base import BaseCommand
from django.db import connection

class Command(BaseCommand):
    help = 'Run custom SQL queries to update the FoodProduct table'

    def handle(self, *args, **kwargs):
        with connection.cursor() as cursor:
            # Update protein_source from "Diary" to "Dairy"
            cursor.execute("""
                UPDATE api_foodproduct
                SET protein_source = 'Dairy'
                WHERE protein_source = 'Diary'
            """)
            self.stdout.write(self.style.SUCCESS('Updated protein_source from "Diary" to "Dairy".'))

            # Update product_name from "Egg (4)" to "Egg"
            cursor.execute("""
                UPDATE api_foodproduct
                SET product_name = 'Egg'
                WHERE product_name = 'Egg (4)'
            """)
            self.stdout.write(self.style.SUCCESS('Updated product_name from "Egg (4)" to "Egg".'))