pipeline {
	agent none
	options { skipDefaultCheckout(false) }
	stages {
		stage('git pull') {
			agent any
			steps {
				checkout scm
			}
		}
		stage('Docker server build') {
			agent any
			steps {
				sh 'docker build -t server:latest /var/jenkins_home/workspace/agaein/agaein_server'
			}
		}
		stage('Docker server run') {
			agent any
			steps {
				sh 'docker ps -f name=server -q \
				| xargs --no-run-if-empty docker container stop'

				sh 'docker container ls -a -f name=server -q \
        		| xargs -r docker container rm'

				sh 'docker run -d --name server \
				-v /etc/localtime:/etc/localtime:ro \
				-v /root/assets/image:/var/jenkins_home/workspace/agaein/agaein_server/build/image \
				--network agaeinnet server:latest'
			}
		}
		stage('Docker web build') {
			agent any
			steps {
				sh 'docker build -t web:latest /var/jenkins_home/workspace/agaein/agaein_web'
			}
		}
		stage('Docker web run') {
			agent any
			steps {
				sh 'docker ps -f name=web -q \
        		| xargs --no-run-if-empty docker container stop'

				sh 'docker container ls -a -f name=web -q \
        		| xargs -r docker container rm'

				sh 'docker images -f dangling=true && \
				docker rmi $(docker images -f dangling=true -q)'

				sh 'docker run -d --name web \
				-p 80:80 \
				-p 443:443 \
				-v /home/ubuntu/sslkey/:/var/jenkins_home/workspace/agaein/sslkey/ \
				-v /etc/localtime:/etc/localtime:ro \
				--network agaeinnet \
				web:latest'
			}
		}
	}
}