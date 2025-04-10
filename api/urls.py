from django.urls import path
from . import views

urlpatterns = [
    # Protein Powders
    path('protein-powders/', views.ProteinPowderListCreateView.as_view()),
    path('protein-powders/<int:pk>/', views.ProteinPowderDetailView.as_view()),

    # Food Products
    path('food-products/', views.FoodProductListCreateView.as_view()),
    path('food-products/<int:pk>/', views.FoodProductDetailView.as_view()),

    # Voting & Comments
    path('protein-powders/<int:pk>/<str:action>/', views.vote_protein_powder),
    path('food-products/<int:pk>/<str:action>/', views.vote_food_product),

    path('submit/protein-powder/', views.submit_protein_powder),
    path('submit/food-product/', views.submit_food_product),
]
