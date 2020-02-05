BUCKET_NAME?=

check-bucket:
	@ if [${BUCKET_NAME} = ""]; then echo "BUCKET_NAME not set"; exit 1; fi

deploy: check-bucket
	npm run build
	bucket_name=${BUCKET_NAME} sls deploy
