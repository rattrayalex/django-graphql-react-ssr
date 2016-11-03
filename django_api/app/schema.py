import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from .models import Company, Job


class DjangoPrimaryKey(graphene.Interface):
  pk = graphene.ID(description="Primary key")

  def resolve_pk(self, args, context, info):
    return self.pk


class CompanyNode(DjangoObjectType):
  class Meta:
    model = Company
    filter_fields = ['name', 'jobs']
    filter_order_by = ['name']
    interfaces = (relay.Node, DjangoPrimaryKey)


class JobNode(DjangoObjectType):
  class Meta:
    model = Job
    filter_fields = {
      'title': ['exact', 'icontains', 'istartswith'],
      'company': ['exact'],
      'company__name': ['exact'],
    }
    filter_order_by = ['title', 'company__name']
    interfaces = (relay.Node, DjangoPrimaryKey)


class Query(graphene.AbstractType):
  company = relay.Node.Field(CompanyNode)
  all_companies = DjangoFilterConnectionField(CompanyNode)

  job = relay.Node.Field(JobNode)
  all_jobs = DjangoFilterConnectionField(JobNode)
