# Pull base image
FROM python:3.10.5-alpine3.15

# build-base is a meta-package that will install the GCC, libc-dev and binutils packages
RUN apk add build-base

# Set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /app/

# Install dependencies
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . /app/

EXPOSE ${SERVER_PORT}