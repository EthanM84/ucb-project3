from pymongo import MongoClient
from pprint import pprint

mongo = MongoClient(port=27017)

# Define the Job_Automation database in Mongo
JobsDB = mongo['Job_Automation']

# View the collections
print(JobsDB.list_collection_names())





