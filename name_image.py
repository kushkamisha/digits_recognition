import os
import uuid
# import boto3
# from boto.s3.key import Key
# from boto.s3.connection import S3Connection


class Model(object):
	def __init__(self):
		pass

	def save_image(self, drawn_digit, image):
		filename = 'digit' + str(drawn_digit) + '__' + str(uuid.uuid1()) + '.jpg'
		with open('static/img/' + filename, 'wb') as f:
			f.write(image)
			
		print('Image written')
		
		# REGION_HOST = 's3-external-1.amazonaws.com'
		# conn = S3Connection(os.environ['AWS_ACCESS_KEY_ID'], os.environ['AWS_SECRET_ACCESS_KEY'], host=REGION_HOST)
		# bucket = conn.get_bucket('testddr')
		
		# k = Key(bucket)
		# fn = 'static/img/' + filename
		# k.key = filename
		# k.set_contents_from_filename(fn)
		# print('Done')

		return ('Image saved successfully with the name {0}'.format(filename))