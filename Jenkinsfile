//jenkinsfile for config and pushing result to slack
def notifySlack(String buildStatus = 'STARTED') {
    // Build status of null means success.
    buildStatus = buildStatus ?: 'SUCCESS'
    def color
    if (buildStatus == 'STARTED') {
        color = '#D4DADF'
    } else if (buildStatus == 'SUCCESS') {
        color = '#BDFFC3'
    } else if (buildStatus == 'UNSTABLE') {
        color = '#FFFE89'
    } else {
        color = '#FF9FA1'
    }

def msg = "${buildStatus}: `${env.JOB_NAME}` #${env.BUILD_NUMBER}:\n${env.BUILD_URL}"
    slackSend(color: color, message: msg, channel: '#ci-automata', '#jenkinsslack')
}

node {
    try {
        notifySlack()
        // Existing build steps.
    } catch (e) {
        currentBuild.result = 'FAILURE'
        throw e
    } finally {
        notifySlack(currentBuild.result)
    }
}
/*
pipeline {
  agent any

  stages {
    stage('Install') {
      steps {
        bat 'npm install'
      }
    }

    stage('Lint') {
      steps {
        bat 'npm run lint'
      }
    }

    stage('Test') {
      steps {
        bat 'npm run coverage'
      }
    }

    stage('Build') {
      steps {
        bat 'npm run build'
      }
    }

    stage('Deploy') {
      when {
        branch 'master'
      }

      steps {
        bat 'npm run octopus'
      }
    }
  }

  post {
    always {
      step([$class: 'CoberturaPublisher', autoUpdateHealth: false, autoUpdateStability: false, coberturaReportFile: 'cobertura-coverage.xml', failUnhealthy: false, failUnstable: false, maxNumberOfBuilds: 0, onlyStable: false, sourceEncoding: 'ASCII', zoomCoverageChart: false])
    }

    success {
      slackSend (channel: '#backend', color: 'good', message: "SUCCESS: ${env.JOB_NAME} (<${env.BUILD_URL}|Open>)")
    }

    failure {
      slackSend (channel: '#backend', color: 'danger', message: "FAILED: ${env.JOB_NAME} (<${env.BUILD_URL}|Open>)")
    }
  }
}
*/

    // success {
    //   slackSend (channel: '#backend', color: 'good', message: "SUCCESS: ${env.JOB_NAME} (<${env.BUILD_URL}|Open>)")
    // } 

    // failure {
    //   slackSend (channel: '#backend', color: 'danger', message: "FAILED: ${env.JOB_NAME} (<${env.BUILD_URL}|Open>)")
    // }