#!/bin/bash

openssl genrsa -out keys/private.key 4096
openssl rsa -in keys/private.key -pubout > keys/public.key

echo -e " The Keys have been generated!"
cd ..
