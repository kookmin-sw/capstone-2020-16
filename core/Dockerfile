FROM ubuntu:18.04
MAINTAINER CMS0503 tyms0503@gmail.com

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update \
  && apt-get install -y python3-pip python3-dev \
  && cd /usr/local/bin \
  && ln -s /usr/bin/python3 python \
  && pip3 install --upgrade pip

RUN apt-get -y install gcc mono-mcs && \
    rm -rf /var/lib/apt/lists/

RUN apt-get -y install g++

RUN pip install requests
RUN pip install numpy

COPY . /

# CMD python3 match_game.py $data
# ENTRYPOINT python3 match_game.py