from django.contrib import admin
from django.db import models
from .models import ProteinPowder, FoodProduct, PendingSubmission

@admin.register(PendingSubmission)
class PendingSubmissionAdmin(admin.ModelAdmin):
    list_display = ('submission_type', 'submitted_at')
    readonly_fields = ('submission_type', 'data', 'submitted_at')  # Make fields readonly

    formfield_overrides = {
        models.JSONField: {'widget': admin.widgets.AdminTextareaWidget(attrs={'readonly': 'readonly'})},
    }

    def save_model(self, request, obj, form, change):
        if 'approve' in request.POST:
            # Approve the submission
            if obj.submission_type == 'protein':
                ProteinPowder.objects.create(**obj.data)
            elif obj.submission_type == 'food':
                FoodProduct.objects.create(**obj.data)
            obj.delete()
        elif 'reject' in request.POST:
            # Reject the submission
            obj.delete()

    def change_view(self, request, object_id, form_url='', extra_context=None):
        extra_context = extra_context or {}
        extra_context['show_approve_button'] = True
        extra_context['show_reject_button'] = True
        return super().change_view(request, object_id, form_url, extra_context)

@admin.register(ProteinPowder)
class ProteinPowderAdmin(admin.ModelAdmin):
    list_display = ('brand', 'product_name', 'total_price', 'grams', 'affiliate_link')
    list_editable = ('affiliate_link',)