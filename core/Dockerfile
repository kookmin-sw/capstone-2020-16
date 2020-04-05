FROM        ubuntu:18.04
MAINTAINER  tyms0503@gmail.com

RUN         apt-get update && \
            apt-get install -y software-properties-common && \
            add-apt-repository ppa:jonathonf/python-3.6
RUN         apt-get update

# install python3.6
RUN         apt-get install -y build-essential python3.6 python3.6-dev python3-pip python3.6-venv

# update pip
RUN python3.6 -m pip install pip --upgrade
RUN python3.6 -m pip install wheel

# install requests
RUN pip install requests
RUN pip install git+git://github.com/broadinstitute/cromwell-tools.git@v0.3.1
ENTRYPOINT [ "python" ]

ADD . /